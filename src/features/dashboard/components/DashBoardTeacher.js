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
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CustomTable from "../../../components/custom-table/CustomTable.js";
import attendanceStudentsMockData from "../../../config/data/attendance-student-mock-data.json";
import CountUp from "react-countup";
import moment from "moment";
import _ from "lodash";
import CustomBox from "../../../components/custom-box/CustomBox.js";
import { useSelector } from "react-redux";

const DashBoardTeacher = () => {
  const theme = useTheme();
  const userDetail = useSelector((state) => state.user.userDetail);
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const [attendanceData, setAttendanceData] = useState([]);

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

  const attendanceTableData = useMemo(() => {
    return _.cloneDeep(attendanceData).map((item) => ({
      student_Id: item.student_Id,
      student_Name: userDetail?.first_Name + " " + userDetail.last_Name,
      stage_Date: moment(item.stage_Date).toJSON(),
      modified_Date: moment(item.modified_Date).toJSON(),
      utility: <AttendanceStatus item={item} />,
    }));
  }, [attendanceData]);

  useEffect(() => {
    setAttendanceData(_.cloneDeep(attendanceStudentsMockData).slice(0, 5));
  }, []);

  return (
    <>
      <Grid container columnSpacing={4} rowSpacing={4}>
        <Grid item xs={12} md={6} sx={{ height: "50%" }}>
          <CustomBox
            sx={{
              backgroundImage:
                "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
            }}
          >
            <Typography variant="h3" align="center" mb={2} mt={2}>
              Tổng Số Tiền Đã Nhận:
            </Typography>
            <CountUp end={888888888} duration="3" />
          </CustomBox>
        </Grid>
        <Grid item xs={12} md={6}>
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
              title={`Lịch Sử Điểm Danh`}
            />
          </CustomBox>
        </Grid>
      </Grid>
    </>
  );
};
export default DashBoardTeacher;
