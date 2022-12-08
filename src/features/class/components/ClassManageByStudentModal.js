import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CustomModal from "../../../components/custom-modal/CustomModal";
import { NAME_TRANS_VN } from "../../../config/constant";
import "../../../assets/scss/_custom-calendar.scss";
import _ from "lodash";
import CustomBox from "./../../../components/custom-box/CustomBox";
import {
  IconCurrencyDong,
  IconCash,
  IconClockHour3,
  IconChecklist,
  IconChecks,
  IconBan,
  IconHourglass,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons";
import { useDispatch, useSelector } from "react-redux";
import { studentPaymentClassFeeAction } from "../../../redux/student/operators";
import {
  getAttendanceByClassIdAction,
  getStageByClassIdAction,
} from "../../../redux/class/operators";
import CustomTable from "../../../components/custom-table/CustomTable";
import attendanceStudentsMockData from "../../../config/data/attendance-student-mock-data.json";
import moment from "moment";
import LoadingComponent from "../../../utils/component/Loading";
import AnimateButton from "../../../components/extended/AnimateButton";

const ClassManageByStudentModal = ({
  open,
  handleClose,
  classObject,
  reloadClassData,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.user.userDetail);
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [stageList, setStageList] = useState([]);
  const [selectedStage, setSelectedStage] = useState(null);
  const [attendanceTableData, setAttendanceTableData] = useState({});
  const handleChangeTab = (event, newValue) => {
    if (loading) {
      return;
    }
    setTab(newValue);
  };

  const handlePaymentClassFee = () => {
    setLoading(true);
    dispatch(
      studentPaymentClassFeeAction(
        userDetail?.reference_Id,
        classObject.class_Id,
        (res, err) => {
          setLoading(false);
          if (err) {
            return;
          }
          reloadClassData();
        }
      )
    );
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

  const getStageData = () => {
    setLoading(true);
    dispatch(
      getStageByClassIdAction(classObject?.class_Id, (res, err) => {
        setLoading(false);
        if (err) return;
        setStageList(res);
      })
    );
  };

  const getAttendanceDataByStage = (stage_Id) => {
    setLoading(true);
    dispatch(
      getAttendanceByClassIdAction(classObject?.class_Id, (res, err) => {
        //TODO: binding data here
        setLoading(false);
        const newAttendanceTableData = _.cloneDeep(attendanceTableData);
        newAttendanceTableData[stage_Id] = _.cloneDeep(
          attendanceStudentsMockData
        ).map((item) => ({
          student_Id: item.student_Id,
          student_Name: item.student_Name,
          stage_Date: moment(item.stage_Date).toJSON(),
          last_Update: moment(item.last_Update).toJSON(),
          utility: <AttendanceStatus item={item} />,
        }));
        setAttendanceTableData(newAttendanceTableData);
        if (err) return;
      })
    );
  };

  useEffect(() => {
    if (!open) {
      return;
    }
    getStageData();
  }, [open]);

  useEffect(() => {
    if (!selectedStage?.stage_Id) {
      return;
    }
    getAttendanceDataByStage(selectedStage.stage_Id);
  }, [selectedStage]);

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title={`${NAME_TRANS_VN.CLASS_NAME}: ${classObject?.class_Name}`}
    >
      <Grid container p={2}>
        <Grid item xs={12} sx={{ padding: theme.spacing(1) }}>
          <Tabs value={tab} onChange={handleChangeTab}>
            <Tab icon={<IconChecklist strokeWidth={2} size="1.5rem" />} />
            <Tab icon={<IconCash strokeWidth={2} size="1.5rem" />} />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          <CustomBox
            sx={{
              maxHeight: "80vh",
              overflow: "auto",
            }}
          >
            {tab === 0 && (
              <>
                <Grid container rowSpacing={2}>
                  {!selectedStage &&
                    stageList.map((item, stageIndex) => (
                      <Grid item xs={12} key={item.stage_Id + "-" + stageIndex}>
                        <Button
                          fullWidth
                          variant="contained"
                          color="secondary"
                          sx={{ padding: matchDownSM ? 0 : theme.spacing(1) }}
                          onClick={() => setSelectedStage(_.cloneDeep(item))}
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
                        <AnimateButton type="slide">
                          <IconButton
                            color="secondary"
                            sx={{
                              padding: matchDownSM ? 0 : theme.spacing(1),
                            }}
                            onClick={() => setSelectedStage(null)}
                          >
                            <IconChevronLeft strokeWidth={2} size="2rem" />
                          </IconButton>
                        </AnimateButton>
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
            {tab === 1 && (
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    {`Bằng cách nhấn vào ${NAME_TRANS_VN.PAYMENT} bạn đồng ý thanh toán tiền học phí ${classObject?.class_Fee}`}{" "}
                    <IconCurrencyDong
                      strokeWidth={2}
                      size="1.5rem"
                      style={{
                        marginTop: "auto",
                        marginBottom: "auto",
                        position: "relative",
                        top: theme.spacing(1),
                      }}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    disabled={loading}
                    color="secondary"
                    variant="contained"
                    onClick={handlePaymentClassFee}
                    fullWidth
                    endIcon={
                      loading ? (
                        <CircularProgress color="secondary" size={20} />
                      ) : null
                    }
                  >
                    {NAME_TRANS_VN.PAYMENT}
                  </Button>
                </Grid>
              </Grid>
            )}
          </CustomBox>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default ClassManageByStudentModal;
