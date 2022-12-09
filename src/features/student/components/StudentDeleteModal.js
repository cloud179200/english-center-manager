import React, { useState } from "react";
import {
  Grid,
  Box,
  Button,
  CircularProgress,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
} from "@mui/material";
import CustomModal from "../../../components/custom-modal/CustomModal";
import { NAME_TRANS_VN } from "../../../config/constant";
import AnimateButton from "../../../components/extended/AnimateButton";
import { useDispatch } from "react-redux";
import { removeStudentAction } from "../../../redux/student/operators";
import StudentMale from "../../../assets/images/users/student_male.png";
import StudentFemale from "../../../assets/images/users/student_female.png";
import _ from "lodash";
const StudentDeleteModal = ({
  open,
  handleClose,
  reloadStudentData,
  studentObject,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleDeleteStudent = async () => {
    setLoading(true);
    dispatch(
      removeStudentAction(studentObject?.student_Id, removeStudentCallback)
    );
  };
  const removeStudentCallback = (res, err) => {
    setLoading(false);
    if (err) {
      return;
    }
    handleClose();
    reloadStudentData();
  };

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title={`${NAME_TRANS_VN.STUDENT_DELETE} ${studentObject?.student_Name}`}
    >
      <Grid container p={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardActionArea sx={{ display: "flex" }}>
              <CardMedia
                component="img"
                src={_.sampleSize([StudentMale, StudentFemale])}
                alt="wang ping"
                sx={{
                  height: "40vh",
                  width: "auto",
                }}
              />
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  Id: {studentObject?.student_Id}
                </Typography>
                <Typography gutterBottom variant="h4" component="div">
                  Tên Học Viên: {studentObject?.student_Name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ngày Tạo: {studentObject?.created_Date}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button
                disableElevation
                fullWidth
                size="large"
                variant="contained"
                color="error"
                disabled={loading}
                onClick={handleDeleteStudent}
                endIcon={
                  loading ? <CircularProgress color="error" size={20} /> : null
                }
              >
                {NAME_TRANS_VN.STUDENT_DELETE}
              </Button>
            </AnimateButton>
          </Box>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default StudentDeleteModal;
