import {
  Button,
  Fade,
  Grid,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  IconBan,
  IconChecks,
  IconChevronLeft,
  IconClick,
  IconClockHour3,
} from "@tabler/icons";
import moment from "moment";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Calendar } from "react-calendar";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  getAttendanceByClassIdAction,
  setAttendanceAction,
} from "../../../redux/class/operators";
import LoadingComponent from "../../../utils/component/Loading";
import CustomTable from "../../../components/custom-table/CustomTable";
import { NAME_TRANS_VN } from "../../../config/constant";
import { sortStudentFunc } from "../../../utils";
import Animate from "../../../components/extended/Animate";
const Attendance = (props) => {
  const { classObject, dateScheduleList } = props;
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const userDetail = useSelector((state) => state.user.userDetail);
  const calendarView = useSelector((state) => state.customization.calendarView);

  const momentDateNow = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [attendanceStudentList, setAttendanceStudentsList] = useState([]);
  const [defaultAttendanceStudentList, setDefaultAttendanceStudentList] =
    useState([]);

  const SelectDateButton = useCallback(
    ({ date }) => {
      const momentDate = moment(_.cloneDeep(date)).format("YYYY-MM-DD");
      const targetDateScheduleObject = _.cloneDeep(dateScheduleList).find(
        (item) => item.schedule_Date === momentDate
      );
      if (targetDateScheduleObject?.stage_Id) {
        return (
          <Fade in={true} style={{ transitionDelay: `100ms` }}>
            <Tooltip
              title={`Ngày Này Có Buổi Học: ${targetDateScheduleObject?.stage_Name} - ${targetDateScheduleObject?.stage_Id}`}
            >
              <IconButton
                disabled={
                  userDetail?.user_Type === 3 && momentDate !== momentDateNow
                }
                onClick={() =>
                  setSelectedDate(_.cloneDeep(targetDateScheduleObject))
                }
                color="primary"
                sx={{ padding: matchDownSM ? 0 : theme.spacing(1) }}
              >
                <IconClick strokeWidth={2} size="2rem" />
              </IconButton>
            </Tooltip>
          </Fade>
        );
      }
      return null;
    },
    [dateScheduleList]
  );

  const handleSetAttendanceList = (students) => {
    setLoading(true);
    dispatch(
      setAttendanceAction(
        classObject?.class_Id,
        selectedDate?.stage_Id,
        students,
        (res, err) => {
          setLoading(false);
          if (err) {
            return;
          }
        }
      )
    );
  };

  const getAttendanceData = () => {
    setLoading(true);
    dispatch(
      getAttendanceByClassIdAction(classObject.class_Id, (res, err) => {
        setLoading(false);
        if (err) {
          return;
        }

        const newAttendanceList = _.cloneDeep(res.students).map((item) => ({
          student_Id: item.student_Id,
          attendance_Status: item.attendance_Status,
        }));

        setAttendanceStudentsList(_.cloneDeep(newAttendanceList));
        setDefaultAttendanceStudentList(_.cloneDeep(newAttendanceList));
      })
    );
  };

  const handleChangeAttendanceStatus = useCallback(
    (student_Id, attendance_Status) => {
      let newAttendanceList = _.cloneDeep(attendanceStudentList);
      const isHaveAttendanceData = newAttendanceList.some(
        (item) => item.student_Id === student_Id
      );

      if (isHaveAttendanceData) {
        newAttendanceList = newAttendanceList.map((item) => ({
          ...item,
          attendance_Status:
            item.student_Id === student_Id
              ? attendance_Status
              : item.attendance_Status,
        }));
      } else {
        newAttendanceList.push({
          student_Id,
          attendance_Status,
        });
      }
      setAttendanceStudentsList(newAttendanceList);
    },
    [attendanceStudentList]
  );

  const Utility = useCallback(
    ({ item }) => {
      console.log("[Utility Attendance Item]", item);
      const attendanceStatus = _.cloneDeep(attendanceStudentList).find(
        (attendanceItem) => attendanceItem.student_Id === item.student_Id
      )?.attendance_Status;
      return (
        <Grid
          container
          justifyContent="flex-end"
          flexWrap="nowrap"
          columnGap={2}
        >
          <Grid item>
            <Tooltip title={`Có mặt`}>
              <IconButton
                disabled={loading || attendanceStatus === 1}
                color="secondary"
                onClick={() => handleChangeAttendanceStatus(item.student_Id, 1)}
              >
                <IconChecks strokeWidth={2} size="2rem" />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title={`Muộn`}>
              <IconButton
                disabled={loading || attendanceStatus === 2}
                color="warning"
                onClick={() => handleChangeAttendanceStatus(item.student_Id, 2)}
              >
                <IconClockHour3 strokeWidth={2} size="2rem" />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title={`Vắng`}>
              <IconButton
                disabled={loading || attendanceStatus === 3}
                color="error"
                onClick={() => handleChangeAttendanceStatus(item.student_Id, 3)}
              >
                <IconBan strokeWidth={2} size="2rem" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      );
    },
    [loading, attendanceStudentList]
  );

  const attendanceTableData = useMemo(() => {
    if (!classObject?.list_Student) {
      return [];
    }

    return _.cloneDeep(classObject.list_Student)
      .sort(sortStudentFunc)
      .map((item) => ({
        student_Id: item.student_Id,
        student_Name: item.student_Name,
        utility: <Utility item={item} />,
      }));
  }, [classObject?.list_Student, loading, attendanceStudentList]);

  useEffect(() => {
    if (!selectedDate) {
      return;
    }
    getAttendanceData();
  }, [selectedDate]);

  return (
    <>
      {selectedDate ? (
        <Grid container justifyContent="flex-end" rowSpacing={2}>
          <Grid item xs={12} md={6}>
            <Animate>
              <IconButton
                color="secondary"
                sx={{ padding: matchDownSM ? 0 : theme.spacing(1) }}
                onClick={() => setSelectedDate(null)}
              >
                <IconChevronLeft strokeWidth={2} size="2rem" />
              </IconButton>
            </Animate>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              disabled={
                _.isEqual(
                  defaultAttendanceStudentList,
                  attendanceStudentList
                ) || loading
              }
              onClick={() => handleSetAttendanceList(attendanceStudentList)}
            >
              {NAME_TRANS_VN.SAVE}
            </Button>
          </Grid>
          {loading ? (
            <LoadingComponent isModal />
          ) : (
            <Grid item xs={12}>
              <CustomTable
                headers={["Id", "Tên Học Viên", "#"]}
                data={attendanceTableData}
                title={`Danh Sách Điểm Danh Ngày "${selectedDate?.schedule_Date}" Buổi Học: ${selectedDate?.stage_Name}`}
              />
            </Grid>
          )}
        </Grid>
      ) : (
        <>
          {loading ? (
            <LoadingComponent isModal />
          ) : (
            <Calendar
              view={calendarView}
              value={null}
              tileContent={({ date }) => <SelectDateButton date={date} />}
            />
          )}
        </>
      )}
    </>
  );
};

export default memo(Attendance, _.isEqual);
