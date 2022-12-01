import React, { useCallback, useEffect, useState } from "react";
import { Grid, IconButton } from "@mui/material";
import CustomModal from "../../../components/custom-modal/CustomModal";
import { NAME_TRANS_VN } from "../../../config/constant";
import { Calendar } from "react-calendar";
import "../../../assets/scss/_custom-calendar.scss";
import { IconCheck } from "@tabler/icons";
import mockDataDate from "../../../config/data/date-mock-data.json";
import _ from "lodash";
import moment from "moment";
import { ClockHour3 } from "tabler-icons-react";
const ClassManageByStudentModal = ({
  open,
  handleClose,
  classObject,
  reloadClassData,
}) => {
  // const theme = useTheme();
  // const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);
  // console.log(theme, dispatch, loading, setLoading, reloadClassData);
  console.log(reloadClassData);
  const [dateAttendance, setDateAttendance] = useState([]);
  const [markedAttendance, setMarkedAttendance] = useState([]);
  const nowDate = moment().format("DD.MM.YYYY");
  const handleAttendance = (date) => {
    setDateAttendance(
      _.cloneDeep(dateAttendance).filter((item) => item !== date)
    );
    setMarkedAttendance([...markedAttendance, date]);
  };

  const AttendanceButton = useCallback(
    ({ date }) => {
      const momentDate = moment(date).format("DD.MM.YYYY");
      if (dateAttendance.includes(momentDate)) {
        return (
          <IconButton
            disabled={momentDate !== nowDate}
            onClick={() => handleAttendance(momentDate)}
            color="primary"
          >
            <ClockHour3 strokeWidth={2} size="1.3rem" />
          </IconButton>
        );
      }
      if (markedAttendance.includes(momentDate)) {
        return (
          <IconButton color="success">
            <IconCheck strokeWidth={2} size="1.3rem" />
          </IconButton>
        );
      }
      return null;
    },
    [dateAttendance, markedAttendance]
  );

  useEffect(() => {
    if (!open) {
      return;
    }
    setDateAttendance([
      ..._.cloneDeep(mockDataDate).map((item) =>
        moment(item).format("DD.MM.YYYY")
      ),
      moment().format("DD.MM.YYYY"),
    ]);
    setMarkedAttendance([]);
  }, [open]);

  console.log("[dateAttendance]", dateAttendance);

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title={`${NAME_TRANS_VN.CLASS_NAME}: ${classObject?.class_Name}`}
    >
      <Grid container p={2}>
        <Grid item xs={12}>
          <Calendar
            view="month"
            value={null}
            tileContent={({ date }) => <AttendanceButton date={date} />}
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default ClassManageByStudentModal;
