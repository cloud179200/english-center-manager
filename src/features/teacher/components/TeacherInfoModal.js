import React, { useMemo } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import CustomModal from "../../../components/custom-modal/CustomModal";
import Professor from "../../../assets/images/users/professor.png";
import Teacher from "../../../assets/images/users/teacher.png";
import { NAME_TRANS_VN } from "../../../config/constant";
import _ from "lodash";

const TeacherInfoModal = ({ open, handleClose, teacherObject }) => {
  const cloneTeacherObject = _.cloneDeep(teacherObject);

  const imageSrc = useMemo(
    () =>  (teacherObject?.gender ? Teacher : Professor),
    [teacherObject?.teacher_Id]
  );

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title={NAME_TRANS_VN.TEACHER_INFO}
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
                  Id: {cloneTeacherObject?.teacher_Id}
                </Typography>
                <Typography gutterBottom variant="h4" component="div">
                  Tên Giảng Viên: {cloneTeacherObject?.teacher_Name}
                </Typography>
                <Typography gutterBottom variant="h4" component="div">
                  Email: {cloneTeacherObject?.email}
                </Typography>
                <Typography gutterBottom variant="h4" component="div">
                  Số Điện Thoại: {cloneTeacherObject?.phone_Number}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Giới Tính:{" "}
                  {cloneTeacherObject?.gender === 0
                    ? NAME_TRANS_VN.MALE
                    : NAME_TRANS_VN.FEMALE}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Địa Chỉ: {cloneTeacherObject?.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ngày Tạo: {cloneTeacherObject?.created_Date}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default TeacherInfoModal;
