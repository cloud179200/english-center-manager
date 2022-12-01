import React, { useCallback, useEffect, useState } from "react";
import {
  Fade,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CustomModal from "../../../components/custom-modal/CustomModal";
import { NAME_TRANS_VN } from "../../../config/constant";
import { Calendar } from "react-calendar";
import "../../../assets/scss/_custom-calendar.scss";
import mockDataDate from "../../../config/data/date-mock-data.json";
import _ from "lodash";
import moment from "moment";
import { Cash, CheckupList, ClockHour3 } from "tabler-icons-react";
import CustomBox from "./../../../components/custom-box/CustomBox";
import { IconCircleCheck } from "@tabler/icons";
const ClassManageByStudentModal = ({
  open,
  handleClose,
  classObject,
  reloadClassData,
}) => {
  const theme = useTheme();
  // const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);
  // console.log(theme, dispatch, loading, setLoading, reloadClassData);
  console.log(reloadClassData);
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const [dateAttendance, setDateAttendance] = useState([]);
  const [markedAttendance, setMarkedAttendance] = useState([]);
  const [tab, setTab] = React.useState(0);
  const nowDate = moment().format("DD.MM.YYYY");

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

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
        if (momentDate !== nowDate) {
          return (
            <IconButton
              disabled={true}
              onClick={() => handleAttendance(momentDate)}
              color="primary"
              size="large"
              sx={{ padding: matchDownSM ? 0 : theme.spacing(1) }}
            >
              <ClockHour3 strokeWidth={2} size="2rem" />
            </IconButton>
          );
        }
        return (
          <Tooltip title="Nhấn Để Điểm Danh">
            <IconButton
              disabled={false}
              onClick={() => handleAttendance(momentDate)}
              color="primary"
              size="large"
              sx={{ padding: matchDownSM ? 0 : theme.spacing(1) }}
            >
              <ClockHour3 strokeWidth={2} size="2rem" />
            </IconButton>
          </Tooltip>
        );
      }
      if (markedAttendance.includes(momentDate)) {
        return (
          <Fade in={true} style={{ transitionDelay: `100ms` }}>
            <IconButton
              color="success"
              size="large"
              sx={{ padding: matchDownSM ? 0 : theme.spacing(1) }}
            >
              <IconCircleCheck strokeWidth={2} size="2rem" />
            </IconButton>
          </Fade>
        );
      }
      return null;
    },
    [dateAttendance, markedAttendance, matchDownSM]
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
        <Grid item xs={12} sx={{ padding: theme.spacing(1) }}>
          <Tabs value={tab} onChange={handleChangeTab}>
            <Tab icon={<CheckupList strokeWidth={2} size="1.3rem" />} />
            <Tab icon={<Cash strokeWidth={2} size="1.3rem" />} />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          <CustomBox>
            {tab === 0 && (
              <Calendar
                view="month"
                value={null}
                tileContent={({ date }) => <AttendanceButton date={date} />}
              />
            )}
            {tab === 1 && <>Bú</>}
          </CustomBox>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default ClassManageByStudentModal;
