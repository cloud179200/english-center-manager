import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CustomModal from "../../../components/custom-modal/CustomModal";
import { NAME_TRANS_VN } from "../../../config/constant";
import "../../../assets/scss/_custom-calendar.scss";
import _ from "underscore";
import CustomBox from "./../../../components/custom-box/CustomBox";
import {
  IconClockHour3,
  IconChecklist,
  IconChecks,
  IconBan,
  IconHourglass,
  IconChevronLeft,
  IconChevronRight,
  IconBookmark,
  IconCalendar,
} from "@tabler/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getStageByClassIdAction,
  getScheduleByClassIdAction,
  getAttendanceByStudentIdAction,
} from "../../../redux/class/operators";
import CustomTable from "../../../components/custom-table/CustomTable";
import moment from "moment";
import LoadingComponent from "../../../utils/component/Loading";
import { Calendar } from "react-calendar";

const ClassManageByStudentModal = ({ open, handleClose, classObject }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const calendarView = useSelector((state) => state.customization.calendarView);
  const userDetail = useSelector((state) => state.user.userDetail);
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [stages, setStages] = useState([]);
  const [selectedStage, setSelectedStage] = useState(null);
  const [attendanceTableData, setAttendanceTableData] = useState({});
  const [scheduleDates, setScheduleDates] = useState([]);
  const handleChangeTab = (event, newValue) => {
    if (loading) {
      return;
    }
    setTab(newValue);
  };

  const AttendanceStatus = useCallback(
    ({ item }) => {
      if (item?.attendance_Status === 1) {
        return (
          <Tooltip title="Có Mặt">
            <IconButton
              color="secondary"
              size="large"
              sx={{ padding: matchDownSM ? 0 : theme.spacing(1) }}
            >
              <IconChecks strokeWidth={2} size="2rem" />
            </IconButton>
          </Tooltip>
        );
      }

      if (item?.attendance_Status === 2) {
        return (
          <Tooltip title="Muộn">
            <IconButton
              color="warning"
              size="large"
              sx={{ padding: matchDownSM ? 0 : theme.spacing(1) }}
            >
              <IconClockHour3 strokeWidth={2} size="2rem" />
            </IconButton>
          </Tooltip>
        );
      }

      if (item?.attendance_Status === 3) {
        return (
          <Tooltip title="Vắng">
            <IconButton
              color="error"
              size="large"
              sx={{ padding: matchDownSM ? 0 : theme.spacing(1) }}
            >
              <IconBan strokeWidth={2} size="2rem" />
            </IconButton>
          </Tooltip>
        );
      }

      return (
        <Tooltip title="Chưa Điểm Danh">
          <IconButton
            size="large"
            sx={{ padding: matchDownSM ? 0 : theme.spacing(1) }}
          >
            <IconHourglass strokeWidth={2} size="2rem" />
          </IconButton>
        </Tooltip>
      );
    },
    [matchDownSM]
  );

  const PreviewStage = useCallback(
    ({ date }) => {
      const momentDate = moment(_.clone(date)).format("MM/DD/YYYY");
      const dateScheduleObject = scheduleDates.find(
        (item) => item.schedule_Date === momentDate
      );
      if (dateScheduleObject) {
        return (
          <Tooltip
            title={`Ngày Này Có Buổi Học: ${dateScheduleObject?.stage_Name} - ${dateScheduleObject?.stage_Id}`}
          >
            <IconButton
              color="primary"
              sx={{ padding: matchDownSM ? 0 : theme.spacing(1) }}
            >
              <IconBookmark strokeWidth={2} size="2rem" />
            </IconButton>
          </Tooltip>
        );
      }
      return null;
    },
    [scheduleDates]
  );

  const getStageData = () => {
    setLoading(true);
    dispatch(
      getStageByClassIdAction(classObject?.class_Id, (res, err) => {
        setLoading(false);
        if (err) return;
        setStages(res);
      })
    );
  };

  const getAttendanceDataByStage = (stage_Id) => {
    setLoading(true);
    dispatch(
      getAttendanceByStudentIdAction(userDetail?.reference_Id, (res, err) => {
        setLoading(false);
        if (err) {
          return
        }
        const newAttendanceTableData = _.clone(attendanceTableData);
        newAttendanceTableData[stage_Id] = _.clone(res).filter(item => (item.stage_Id === stage_Id && item.class_Id === classObject?.class_Id)).map((item) => ({
          student_Id: item.student_Id,
          student_Name: userDetail.first_Name + ' ' + userDetail.last_Name,
          schedule_Date: moment(item.schedule_Date).format("MM/DD/YYYY"),
          attendance_Date: moment(item.attendance_Date).toJSON(),
          utility: <AttendanceStatus item={item} />,
        }));
        setAttendanceTableData(newAttendanceTableData);
        if (err) return;
      })
    );
  };

  const getScheduleData = () => {
    setLoading(true);
    dispatch(
      getScheduleByClassIdAction(classObject?.class_Id, (res, err) => {
        setLoading(false);
        if (err) {
          return;
        }
        const newData = (res?.schedules || []).map((item) => ({
          stage_Id: item.stage_Id,
          stage_Name: item.stage_Name,
          schedule_Date: moment(item.schedule_Date).format("MM/DD/YYYY"),
        }));
        setScheduleDates(_.clone(newData));
      })
    );
  };


  useEffect(() => {
    if (!selectedStage?.stage_Id) {
      return;
    }
    getAttendanceDataByStage(selectedStage.stage_Id);
  }, [selectedStage]);

  useEffect(() => {
    if (!open) {
      return
    }
    setSelectedStage(null)
    getStageData();
    getScheduleData();
  }, [open])

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title={`${NAME_TRANS_VN.CLASS_NAME}: ${classObject?.class_Name}`}
    >
      <Grid container p={2}>
        <Grid item xs={12} sx={{ padding: theme.spacing(1) }}>
          <Tabs value={tab} onChange={handleChangeTab}>
            <Tab
              disabled={loading}
              icon={<IconCalendar strokeWidth={2} size="1.5rem" />}
            />
            <Tab
              disabled={loading}
              icon={<IconChecklist strokeWidth={2} size="1.5rem" />}
            />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          <CustomBox
            sx={{
              maxHeight: "60vh",
              overflow: "auto",
            }}
          >
            {tab === 0 && (
              <>
                <Grid container rowSpacing={2}>
                  <Grid item xs={12}>
                    {loading ? (
                      <LoadingComponent isModal />
                    ) : (
                      <Calendar
                        view={calendarView}
                        value={null}
                        tileContent={({ date }) => <PreviewStage date={date} />}
                      />
                    )}
                  </Grid>
                </Grid>
              </>
            )}
            {tab === 1 && (
              <>
                <Grid container rowSpacing={2}>
                  {!selectedStage &&
                    stages.map((item, stageIndex) => (
                      <Grid item xs={12} key={item.stage_Id + "-" + stageIndex}>
                        <Button
                          fullWidth
                          variant="contained"
                          color="secondary"
                          sx={{ padding: matchDownSM ? 0 : theme.spacing(1) }}
                          onClick={() => setSelectedStage(_.clone(item))}
                          endIcon={
                            <IconChevronRight strokeWidth={2} size="2rem" />
                          }
                        >
                          {item.stage_Name}
                        </Button>
                      </Grid>
                    ))}
                  {selectedStage && (
                    <>
                      <Grid item xs={12}>
                          <IconButton
                            color="secondary"
                            sx={{
                              padding: matchDownSM ? 0 : theme.spacing(1),
                            }}
                            onClick={() => setSelectedStage(null)}
                          >
                            <IconChevronLeft strokeWidth={2} size="2rem" />
                          </IconButton>
                      </Grid>
                      <Grid item xs={12}>
                        {loading ? (
                          <LoadingComponent isModal />
                        ) : (
                          <CustomTable
                            headers={[
                              "Id",
                              "Tên Học Viên",
                              "Thời Gian Diễn Ra Buổi Học",
                              "Ngày Cập Nhật",
                              "#",
                            ]}
                            data={attendanceTableData[selectedStage?.stage_Id]}
                            title={`Buổi Học: ${selectedStage?.stage_Name}`}
                          />
                        )}
                      </Grid>
                    </>
                  )}
                </Grid>
              </>
            )}
          </CustomBox>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default ClassManageByStudentModal;
