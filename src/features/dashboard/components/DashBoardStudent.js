import React, { useCallback, useEffect, useMemo, useState } from "react";
// eslint-disable-next-line import/no-unresolved
import { Pie } from "react-chartjs-2";
import {
  IconBan,
  IconChecks,
  IconClockHour3,
  IconHourglass,
} from "@tabler/icons";
import {
  Grid,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CustomTable from "../../../components/custom-table/CustomTable";
import attendanceStudentsMockData from "../../../config/data/attendance-student-mock-data.json";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import moment from "moment";
import _ from "lodash";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashBoardStudent = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const [attendanceData, setAttendanceData] = useState([]);
  const dataPie = {
    labels: ["Có Mặt", "Muộn", "Vắng"],
    datasets: [
      {
        label: "Dữ Liệu Điểm Danh",
        data: [2, 4, 4],
        backgroundColor: [
          theme.palette.secondary.main,
          theme.palette.warning.main,
          theme.palette.error.main,
        ],
        borderColor: [
          theme.palette.secondary.light,
          theme.palette.warning.light,
          theme.palette.error.light,
        ],
        borderWidth: 3,
      },
    ],
  };

  const AttendanceStatus = useCallback(
    ({ item }) => {
      let renderStatus = null;
      switch (item.status) {
        case 1:
          renderStatus = (
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
          break;
        case 2:
          renderStatus = (
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
          break;
        case 3:
          renderStatus = (
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
          break;
        default:
          renderStatus = (
            <Tooltip title="Chưa Điểm Danh">
              <IconButton
                size="large"
                sx={{ padding: matchDownSM ? 0 : theme.spacing(1) }}
              >
                <IconHourglass strokeWidth={2} size="2rem" />
              </IconButton>
            </Tooltip>
          );
      }

      return <>{renderStatus}</>;
    },
    [matchDownSM]
  );

  console.log("[AttendanceStatus]", AttendanceStatus);
  const attendanceTableData = useMemo(() => {
    return _.cloneDeep(attendanceData).map((item) => ({
      student_Id: item.student_Id,
      student_Name: item.student_Name,
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
      <Grid item xs={12} md={6}>
        <Pie data={dataPie} />
      </Grid>
      <Grid item xs={12} md={6}>
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
      </Grid>
    </>
  );
};

export default DashBoardStudent;
