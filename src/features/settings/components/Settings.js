import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CustomBox from "../../../components/custom-box/CustomBox";
import LoadingComponent from "../../../utils/component/Loading";
import { sleep } from "../../../utils";
import { addNotificationAction } from "../../../redux/utils/operators";
import { Grid, Typography } from "@mui/material";

const Settings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const initData = async () => {
    setLoading(true);
    await sleep(2000);
    dispatch(addNotificationAction("Success", false));
    setLoading(false);
  };
  useEffect(() => {
    initData();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <CustomBox>
            <Typography variant="h3">Settings</Typography>
            <Grid container>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </CustomBox>
        </>
      )}
    </>
  );
};

export default Settings;
