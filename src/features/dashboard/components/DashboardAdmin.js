import React, { useMemo } from "react";
import CustomBox from "../../../components/custom-box/CustomBox";
import faker from "faker";
import { Grid, useTheme } from "@mui/material";
import _ from "lodash";
// eslint-disable-next-line import/named
import { Line } from "@ant-design/plots";
const DashboardAdmin = () => {
  const theme = useTheme();
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

  const data = labels.map((item) => ({
    date: item,
    value: faker.datatype.number({ min: 0, max: 100000000 }),
    category: _.sample(["Doanh Thu", "Chi Tiêu"]),
  }));

  const config = {
    data,
    xField: "date",
    yField: "value",
    seriesField: "category",
    point: {
      size: 5,
      shape: "diamond",
    },
    color: [theme.palette.primary.main, theme.palette.secondary.main],
  };
  return (
    <Grid container columnSpacing={4} rowSpacing={4}>
      <Grid item xs={12}>
        <CustomBox>
          <Line {...config} />
        </CustomBox>
      </Grid>
    </Grid>
  );
};

export default DashboardAdmin;
