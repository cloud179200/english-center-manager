import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../../utils/component/Loading";
import { getUserDetailAction } from "../../../redux/user/operators";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// eslint-disable-next-line import/no-unresolved
import { Line } from "react-chartjs-2";
import faker from "faker";
import { Grid, useTheme } from "@mui/material";
import DashBoardStudent from "./DashBoardStudent";
import CustomBox from "../../../components/custom-box/CustomBox";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashBoard = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const userInfo = useSelector((state) => state.user.userInfo);
  const userDetail = useSelector((state) => state.user.userDetail);
  const [loading, setLoading] = useState(false);
  const labels = useMemo(
    () => [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    []
  );

  const options = useMemo(() => ({
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }));

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Doanh Thu",
          data: labels.map(() =>
            faker.datatype.number({ min: 0, max: 100000000 })
          ),
          borderColor: theme.palette.secondary.light,
          backgroundColor: theme.palette.secondary.main,
          yAxisID: "y",
        },
        {
          label: "Chi Tiêu",
          data: labels.map(() =>
            faker.datatype.number({ min: 0, max: 100000000 })
          ),
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.main,
          yAxisID: "y1",
        },
      ],
    }),
    []
  );

  useEffect(() => {
    if (!userInfo?.token || !userInfo?.email) {
      return;
    }
    setLoading(true);
    dispatch(getUserDetailAction(userInfo.email, () => setLoading(false)));
  }, []);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          {userDetail?.user_Type === 1 && (
            <>
              <Grid container columnSpacing={4} rowSpacing={4}>
                <Grid item xs={12}>
                  <CustomBox>
                    <Line options={options} data={data} />
                  </CustomBox>
                </Grid>
              </Grid>
            </>
          )}
          {userDetail?.user_Type === 2 && <DashBoardStudent />}
          {userDetail?.user_Type === 3 && (
            <>
              <Grid container columnSpacing={4} rowSpacing={4}>
                <Grid item xs={12}>
                  <CustomBox>
                    <Line options={options} data={data} />
                  </CustomBox>
                </Grid>
              </Grid>
            </>
          )}
        </>
      )}
    </>
  );
};
export default DashBoard;
