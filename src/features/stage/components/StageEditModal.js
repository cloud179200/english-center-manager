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
import { setStageAction } from "../../../redux/class/operators";
import { useFormik } from "formik";
import { editStageSchema } from "../schema";
import _ from "lodash";
 
const StageEditModal = ({
  open,
  handleClose,
  reloadStageData,
  stageObject,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  // const userInfo = useSelector(state => state.user.userInfo)
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      stage_Id: 0,
      stage_Name: "",
    },
    validationSchema: editStageSchema,
    onSubmit: (values) => {
      setLoading(true);
      dispatch(
        setStageAction(values.stage_Id, values.stage_Name, editStageCallback)
      );
    },
  });

  const editStageCallback = (res, err) => {
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
    isValid,
    touched,
    setValues,
    values,
  } = formik;

  useEffect(() => {
    if (!open) {
      return;
    }
    setValues(_.cloneDeep(stageObject));
  }, [open]);

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title={NAME_TRANS_VN.STAGE_EDIT}
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
                {NAME_TRANS_VN.STAGE_EDIT}
              </Button>
            </Animate>
          </Box>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default StageEditModal;
