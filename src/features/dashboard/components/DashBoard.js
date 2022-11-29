import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../../utils/component/Loading";
import { getUserDetailAction } from "../../../redux/user/operators";
import { useTimeout } from "react-use";
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
import { useTheme } from "@mui/material";

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
  const userInfo = useSelector((state) => state.user.userInfo);
  const [ready] = useTimeout(2000);

  const loadData = async () => {
    if (userInfo?.token && userInfo?.email) {
      dispatch(getUserDetailAction(userInfo?.email));
    }
  };
  const labels = useMemo(
    () => ["January", "February", "March", "April", "May", "June", "July"],
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
        text: "Chart.js Line Chart - Multi Axis",
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

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: theme.palette.secondary.light,
        backgroundColor: theme.palette.secondary.main,
        yAxisID: "y",
      },
      {
        label: "Dataset 2",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        borderColor: theme.palette.primary.light,
        backgroundColor: theme.palette.primary.main,
        yAxisID: "y1",
      },
    ],
  };

  useEffect(() => {
    loadData();
  }, [userInfo]);

  return (
    <>
      {!ready() ? (
        <LoadingComponent />
      ) : (
        <CustomBox>
          <Line options={options} data={data} />
        </CustomBox>
      )}
    </>
  );
};
export default DashBoard;
