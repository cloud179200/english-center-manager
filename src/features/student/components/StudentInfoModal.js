import React, {useMemo} from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import CustomModal from "../../../components/custom-modal/CustomModal";
import StudentMale from "../../../assets/images/users/student_male.png";
import StudentFemale from "../../../assets/images/users/student_female.png";
import { NAME_TRANS_VN } from "../../../config/constant";
import _ from "lodash";
const StudentInfoModal = ({ open, handleClose, studentObject }) => {
  const cloneStudentObject = _.cloneDeep(studentObject);
  
  const imageSrc = useMemo(() => _.sampleSize([StudentMale, StudentFemale]), [studentObject?.student_Id])

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title={NAME_TRANS_VN.STUDENT_INFO}
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
                  Id: {cloneStudentObject?.student_Id}
                </Typography>
                <Typography gutterBottom variant="h4" component="div">
                  Tên Học Viên: {cloneStudentObject?.student_Name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ngày Tạo: {cloneStudentObject?.created_Date}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default StudentInfoModal;
