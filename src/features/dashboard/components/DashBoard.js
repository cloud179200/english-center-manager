/* eslint-disable import/no-unresolved */
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../../utils/component/Loading";
import { getUserDetailAction } from "../../../redux/user/operators";
import CustomBox from "../../../components/custom-box/CustomBox";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { sleep } from "../../../utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function App() {
  return;
}

const DashBoard = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const userInfo = useSelector((state) => state.user.userInfo);
  const commonLoading = useSelector((state) => state.common.loading);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    if (userInfo?.token && userInfo?.email) {
      dispatch(getUserDetailAction(userInfo?.email));
    }
    setLoading(true);
    await sleep(1000);
    setLoading(false);
  };
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
    loadData();
  }, [userInfo, matchDownSM]);

  return (
    <>
      {loading || commonLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <CustomBox>
            <Grid container>
              <Grid item xs={12}>
                <Line options={options} data={data} />
              </Grid>
            </Grid>
          </CustomBox>
        </>
      )}
    </>
  );
};
export default DashBoard;
