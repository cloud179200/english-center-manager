import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  OutlinedInput,
  useTheme,
  FormHelperText,
} from "@mui/material";
import CustomModal from "../../../components/custom-modal/CustomModal";
import { NAME_TRANS_VN } from "../../../config/constant";
import Animate from "../../../components/extended/Animate";
import { useDispatch } from "react-redux";
import { addStageAction } from "../../../redux/class/operators";
import { useFormik } from "formik";
import { addStageSchema } from "../schema";

const StageAddModal = ({ open, handleClose, reloadStageData, classObject }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  // const userInfo = useSelector(state => state.user.userInfo)
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      class_Id: 0,
      stage_Name: "",
    },
    validationSchema: addStageSchema,
    onSubmit: (values) => {
      setLoading(true);
      dispatch(
        addStageAction(values.class_Id, values.stage_Name, addStageCallback)
      );
    },
  });

  const addStageCallback = (res, err) => {
    setLoading(false);
    if (err) {
      return;
    }
    reloadStageData();
  };

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
    isValid,
    touched,
    values,
  } = formik;

  useEffect(() => {
    if (!classObject) {
      resetForm();
      return;
    }
    setFieldValue("class_Id", classObject?.class_Id);
  }, [classObject?.class_Id]);
  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title={NAME_TRANS_VN.STAGE_ADD}
    >
      <Grid container component="form" onSubmit={handleSubmit} p={2}>
        <Grid item xs={12}>
          <Grid
            container
            columnGap={0.5}
            flexWrap="nowrap"
            justifyContent={{ xs: "space-evenly", md: "" }}
          >
            <Grid item xs={12} md={12}>
              <FormControl
                fullWidth
                error={Boolean(touched.stage_Name && errors.stage_Name)}
                sx={{ ...theme.typography.customInput }}
              >
                <InputLabel>{NAME_TRANS_VN.STAGE_NAME}</InputLabel>
                <OutlinedInput
                  type="text"
                  value={values.stage_Name}
                  name="stage_Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label={NAME_TRANS_VN.stage_Name}
                />
                {touched.stage_Name && errors.stage_Name && (
                  <FormHelperText error>{errors.stage_Name}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ mt: 2 }}>
            <Animate>
              <Button
                disableElevation
                fullWidth
                type="submit"
                size="large"
                variant="contained"
                color="secondary"
                disabled={loading || !isValid}
                endIcon={
                  loading ? (
                    <CircularProgress color="secondary" size={20} />
                  ) : null
                }
              >
                {NAME_TRANS_VN.STAGE_ADD}
              </Button>
            </Animate>
          </Box>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default StageAddModal;
