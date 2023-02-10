import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  IconBan,
  IconChecks,
  IconClockHour3,
  IconHourglass,
} from "@tabler/icons";
import {
  Grid,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CustomTable from "../../../components/custom-table/CustomTable.js";
import { Pie } from "@ant-design/plots";
import moment from "moment";
import _ from "underscore";
import CustomBox from "../../../components/custom-box/CustomBox.js";
import { useSelector, useDispatch } from "react-redux";
import LoadingComponent from "../../../utils/component/Loading.js";
import { getAttendanceByStudentIdAction } from "../../../redux/class/operators.js";

const DashBoardStudent = () => {
  const theme = useTheme();
  const userDetail = useSelector(state => state.user.userDetail)
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch()
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState([]);
  const data = useMemo(() => ([
    {
      type: "Có Mặt",
      value: _.clone(attendanceData).filter(item => item.attendance_Status === 1).length,
    },
    {
      type: "Muộn",
      value: _.clone(attendanceData).filter(item => item.attendance_Status === 2).length,
    },
    {
      type: "Vắng",
      value: _.clone(attendanceData).filter(item => item.attendance_Status === 3).length,
    },
  ]), [attendanceData]) 
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
    color: [
      theme.palette.primary.main,
      theme.palette.warning.main,
      theme.palette.error.main,
    ],
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
  

  const getAttendanceData = () => {
    dispatch(
      getAttendanceByStudentIdAction(userDetail?.reference_Id, (res, err) => {
        setLoading(false);
        if (err) {
          return
        }
        setAttendanceData(res);
      })
    );
  }

  const attendanceTableData = useMemo(() => {
    return _.clone(attendanceData).sort().map((item) => ({
      student_Id: item.student_Id,
      student_Name: userDetail?.first_Name + " " + userDetail.last_Name,
      schedule_Date: moment(item.schedule_Date).format("MM/DD/YYYY"),
      attendance_Date: moment(item.attendance_Date).toJSON(),
      utility: <AttendanceStatus item={item} />,
    }));
  }, [attendanceData]);

  useEffect(() => {
    getAttendanceData()
  }, []);

  return (
    <>
      <Grid container columnSpacing={4} rowSpacing={4}>
        {loading ? <LoadingComponent /> : <>
          <Grid item xs={12} md={4}>
            <Pie {...config} />
          </Grid>
          <Grid item xs={12} md={8}>
            <CustomBox>
              <CustomTable
                headers={[
                  "Id",
                  "Tên Học Viên",
                  "Thời Gian Diễn Ra Buổi Học",
                  "Ngày Cập Nhật",
                  "#",
                ]}
                data={attendanceTableData}
                title={`5 Buổi Điểm Danh Gần Nhất...`}
              />
            </CustomBox>
          </Grid>
        </>}
      </Grid>
    </>
  );
};
export default DashBoardStudent;
