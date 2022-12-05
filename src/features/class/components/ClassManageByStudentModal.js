import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Fade,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
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
import { IconCircleCheck, IconCurrencyDong } from "@tabler/icons";
import { useDispatch, useSelector } from "react-redux";
import { studentPaymentClassFeeAction } from "../../../redux/student/operators";
const ClassManageByStudentModal = ({
  open,
  handleClose,
  classObject,
  reloadClassData,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.user.userDetail);
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const [dateAttendance, setDateAttendance] = useState([]);
  const [markedAttendance, setMarkedAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = React.useState(0);
  const nowDate = moment().format("DD.MM.YYYY");

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const handlePaymentClassFee = () => {
    setLoading(true);
    dispatch(
      studentPaymentClassFeeAction(
        userDetail?.reference_Id,
        classObject.class_Id,
        (res, err) => {
          setLoading(false);
          if (err) {
            return;
          }
          reloadClassData();
        }
      )
    );
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
              disabled={loading}
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
    [dateAttendance, markedAttendance, matchDownSM, loading]
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

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title={`${NAME_TRANS_VN.CLASS_NAME}: ${classObject?.class_Name}`}
    >
      <Grid container p={2}>
        <Grid item xs={12} sx={{ padding: theme.spacing(1) }}>
          <Tabs value={tab} onChange={handleChangeTab}>
            <Tab icon={<CheckupList strokeWidth={2} size="1.5rem" />} />
            <Tab icon={<Cash strokeWidth={2} size="1.5rem" />} />
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
            {tab === 1 && (
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    {`Bằng cách nhấn vào ${NAME_TRANS_VN.PAYMENT} bạn đồng ý thanh toán tiền học phí ${classObject?.class_Fee}`}{" "}
                    <IconCurrencyDong
                      strokeWidth={2}
                      size="1.5rem"
                      style={{
                        marginTop: "auto",
                        marginBottom: "auto",
                        position: "relative",
                        top: theme.spacing(1),
                      }}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    disabled={loading}
                    color="secondary"
                    variant="contained"
                    onClick={handlePaymentClassFee}
                    fullWidth
                    endIcon={
                      loading ? <CircularProgress color="error" size={20} /> : null
                    }
                    
                  >
                    {NAME_TRANS_VN.PAYMENT} 
                  </Button>
                </Grid>
              </Grid>
            )}
          </CustomBox>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default ClassManageByStudentModal;
