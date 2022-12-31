import React, { useEffect, useMemo, useState } from "react";
import CustomBox from "../../../components/custom-box/CustomBox";
import { Grid, useTheme } from "@mui/material";
import _ from "lodash";
// eslint-disable-next-line import/named
import { Line } from "@ant-design/plots";
import { getAdminDashboardDataAction } from "../../../redux/dashboard/operators";
import { useDispatch } from "react-redux";
// import moment from "moment";

const DashboardAdmin = () => {
  const theme = useTheme();
  const dispatch = useDispatch()
  const [data, setData] = useState([])

  const labels = useMemo(
    () => {
      const defaultLabel = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ]

      let result = []
      const yearData = [...new Set([...data.map(item => item.transaction_Year.toString()), "2022"])]
      const mappingLabelFunc = (item) => {
        _.cloneDeep(defaultLabel).forEach(i => {
          result.push({
            label: "Tháng " + i + " - " + item,
            transaction_Month: i,
            transaction_Year: item
          })
        })
        return item
      }

      yearData.forEach(mappingLabelFunc)
      return result
    },
    [data]
  );


  const dataFormatted = useMemo(() => {
    let resultDataFormatted = []
    labels.map((item) => {
      const resultData = data.find(i => i.transaction_Month.toString() === item.transaction_Month && i.transaction_Year.toString() === item.transaction_Year)
      resultDataFormatted.push({
        date: item.label,
        value: resultData?.income || 0,
        category: "Doanh Thu",
      })

      resultDataFormatted.push({
        date: item.label,
        value: resultData?.outcome || 0,
        category: "Chi Tiêu",
      })
      return item
    });
    return resultDataFormatted
  }, [labels, data]);

  const config = useMemo(() => ({
    data: dataFormatted,
    xField: "date",
    yField: "value",
    seriesField: "category",
    point: {
      size: 10,
      shape: "diamond",
    },
    color: [theme.palette.primary.main, theme.palette.secondary.main],
  }), [dataFormatted]);

  useEffect(() => {
    dispatch(getAdminDashboardDataAction((res, err) => {
      if (err) return
      setData(res)
    }))
  }, []);
  console.log({ dataFormatted })
  return (
    <Grid container columnSpacing={4} rowSpacing={4}>
      <Grid item xs={12}>
        <CustomBox>
          {Boolean(data.length) && <Line {...config} />}
        </CustomBox>
      </Grid>
    </Grid>
  );
};

export default DashboardAdmin;
