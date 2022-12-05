import React, { useCallback, useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
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
import CustomBox from "./../../../components/custom-box/CustomBox";
import {
  IconChevronDown,
  IconCircleCheck,
  IconCurrencyDong,
  IconCash,
  IconCheckupList,
  IconClockHour3,
} from "@tabler/icons";
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
  const [tab, setTab] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const handleChangeTab = (event, newValue) => {
    if (loading) {
      return;
    }
    setTab(newValue);
  };

  const handleChangeExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
    return;
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
          <Tooltip title="Chưa Điểm Danh">
            <IconButton
              disabled={loading}
              onClick={() => handleAttendance(momentDate)}
              color="primary"
              size="large"
              sx={{ padding: matchDownSM ? 0 : theme.spacing(1) }}
            >
              <IconClockHour3 strokeWidth={2} size="2rem" />
            </IconButton>
          </Tooltip>
        );
      }
      if (markedAttendance.includes(momentDate)) {
        return (
          <Tooltip title="Đã Điểm Danh">
            <IconButton
              color="success"
              size="large"
              sx={{ padding: matchDownSM ? 0 : theme.spacing(1) }}
            >
              <IconCircleCheck strokeWidth={2} size="2rem" />
            </IconButton>
          </Tooltip>
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
            <Tab icon={<IconCheckupList strokeWidth={2} size="1.5rem" />} />
            <Tab icon={<IconCash strokeWidth={2} size="1.5rem" />} />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          <CustomBox sx={{
            maxHeight: "60vh",
            overflow: "auto"
          }}>
            {tab === 0 && (
              <>
                {dateAttendance.slice(0, 20).map((item, dateAttendanceIndex) => (
                  <Accordion
                    key={item + "-" + dateAttendanceIndex}
                    expanded={expanded === item + "-" + dateAttendanceIndex}
                    onChange={handleChangeExpand(
                      item + "-" + dateAttendanceIndex
                    )}
                  >
                    <AccordionSummary
                      expandIcon={
                        <IconChevronDown strokeWidth={2} size="2rem" />
                      }
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography variant="h5">
                        {NAME_TRANS_VN.STAGE_NAME}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Calendar
                        value={null}
                        tileContent={({ date }) => (
                          <AttendanceButton date={date} />
                        )}
                      />
                    </AccordionDetails>
                  </Accordion>
                ))}
              </>
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
                      loading ? (
                        <CircularProgress color="secondary" size={20} />
                      ) : null
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
