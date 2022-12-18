import React, { useMemo, useState } from "react";
import {
  Grid,
  Box,
  Button,
  CircularProgress,
  CardContent,
  Typography,
  CardActionArea,
  Card,
  CardMedia,
} from "@mui/material";
import CustomModal from "../../../components/custom-modal/CustomModal";
import { NAME_TRANS_VN } from "../../../config/constant";
import AnimateButton from "../../../components/extended/Animate";
import { useDispatch } from "react-redux";
import { removeTeacherAction } from "../../../redux/teacher/operators";
import Professor from "../../../assets/images/users/professor.png";
import Teacher from "../../../assets/images/users/teacher.png";

const TeacherDeleteModal = ({
  open,
  handleClose,
  reloadTeacherData,
  teacherObject,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleDeleteTeacher = async () => {
    setLoading(true);
    dispatch(
      removeTeacherAction(teacherObject?.teacher_Id, removeTeacherCallback)
    );
  };
  const removeTeacherCallback = (res, err) => {
    setLoading(false);
    if (err) {
      return;
    }
    handleClose();
    reloadTeacherData();
  };
  const imageSrc = useMemo(
    () => (teacherObject?.gender ? Professor : Teacher),
    [teacherObject?.teacher_Id]
  );

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title={`${NAME_TRANS_VN.TEACHER_DELETE} ${teacherObject?.teacher_Name}`}
    >
      <Grid container p={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardActionArea sx={{ display: "flex" }}>
              <CardMedia
                component="img"
                src={imageSrc}
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
                  Id: {teacherObject?.teacher_Id}
                </Typography>
                <Typography gutterBottom variant="h4" component="div">
                  Tên Giảng Viên: {teacherObject?.teacher_Name}
                </Typography>
                <Typography gutterBottom variant="h4" component="div">
                  Email: {teacherObject?.email}
                </Typography>
                <Typography gutterBottom variant="h4" component="div">
                  Số Điện Thoại: {teacherObject?.phone_Number}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Giới Tính:{" "}
                  {teacherObject?.gender === 0
                    ? NAME_TRANS_VN.MALE
                    : NAME_TRANS_VN.FEMALE}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Địa Chỉ: {teacherObject?.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ngày Tạo: {teacherObject?.created_Date}
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
                onClick={handleDeleteTeacher}
                endIcon={
                  loading ? <CircularProgress color="error" size={20} /> : null
                }
              >
                {NAME_TRANS_VN.TEACHER_DELETE}
              </Button>
            </AnimateButton>
          </Box>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default TeacherDeleteModal;
