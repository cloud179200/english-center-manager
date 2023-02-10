import React, { useEffect, useState } from "react";
import {
  IconCurrencyDong,
} from "@tabler/icons";
import {
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import CountUp from "react-countup";
// import _ from "underscore";
import CustomBox from "../../../components/custom-box/CustomBox.js";
import { useDispatch, useSelector } from "react-redux";
import { DEFAULT_BACKGROUND_IMAGE } from "../../../redux/customization/constant.js";
import { getTeacherDashboardDataAction } from "../../../redux/dashboard/operators.js";

const DashBoardTeacher = () => {
  const theme = useTheme();
  const userDetail = useSelector((state) => state.user.userDetail);
  const dispatch = useDispatch()
  const [data, setData] = useState({})

  useEffect(() => {
    dispatch(getTeacherDashboardDataAction(userDetail.reference_Id, (res, err) => {
      if (err) return
      setData(res)
    }))
  }, []);

  return (
    <>
      <Grid container rowSpacing={4} columnSpacing={4}>
        <Grid item xs={12} md={6}>
          <CustomBox
            sx={{
              backgroundImage: DEFAULT_BACKGROUND_IMAGE,
              height: "30vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h3"
              align="center"
              mb={2}
              mt={2}
              color={theme.palette.background.default}
            >
              Tổng Số Tiền Đã Nhận:
            </Typography>
            <Typography
              variant="h1"
              align="center"
              mb={2}
              mt={2}
              color={theme.palette.background.default}
            >
              <CountUp end={data?.total_Payroll || 0} duration="2" separator="." />
              <IconCurrencyDong
                strokeWidth={2}
                size="1.5rem"
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                  position: "relative",
                  top: theme.spacing(1) / 4,
                }}
              />
            </Typography>
          </CustomBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomBox
            sx={{
              backgroundImage: DEFAULT_BACKGROUND_IMAGE,
              height: "30vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h3"
              align="center"
              mb={2}
              mt={2}
              color={theme.palette.background.default}
            >
              Buổi Học Đã Dạy:
            </Typography>
            <Typography
              variant="h1"
              align="center"
              mb={2}
              mt={2}
              color={theme.palette.background.default}
            >
              <CountUp end={data?.total_Period || 0} duration="2" separator="." />
            </Typography>
          </CustomBox>
        </Grid>
      </Grid>
    </>
  );
};
export default DashBoardTeacher;
