import React, { useEffect, useState } from "react";
import {
  Fade,
  Grid,
  IconButton,
  MenuItem,
  Tab,
  Tabs,
  Tooltip,
  useMediaQuery,
  useTheme,
  Menu,
  Button,
} from "@mui/material";
import CustomModal from "../../../components/custom-modal/CustomModal";
import { NAME_TRANS_VN } from "../../../config/constant";
import { Calendar } from "react-calendar";
import "../../../assets/scss/_custom-calendar.scss";
import moment from "moment";
import CustomBox from "./../../../components/custom-box/CustomBox";
import {
  IconCalendar,
  IconBackspace,
  IconChalkboard,
  IconChevronDown,
  IconChecklist,
} from "@tabler/icons";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  getScheduleByClassIdAction,
  getStageByClassIdAction,
  setScheduleAction,
} from "../../../redux/class/operators";
import { addNotificationAction } from "../../../redux/utils/operators";
import StageComponent from "../../stage/components/Stage";
import Attendance from "../../attendance/component/Attendance";

const ScheduleSetupButton = ({
  disabled,
  date,
  stages,
  scheduleDates,
  handleRemoveSchedule,
  handleSetSchedule,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const momentDate = moment(_.cloneDeep(date)).format("YYYY-MM-DD");
  const dateScheduleObject = _.cloneDeep(scheduleDates).find(
    (item) => item.schedule_Date === momentDate
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const handleSelectSchedule = (stageId, stageName) => {
    setOpenMenu(false);
    setAnchorEl(null);
    handleSetSchedule(momentDate, stageId, stageName);
  };
  if (dateScheduleObject?.schedule_Date) {
    return (
      <Fade in={true} style={{ transitionDelay: `100ms` }}>
        <Tooltip
          title={`Xóa Buổi Học Đã Gán: ${dateScheduleObject?.stage_Name} - ${dateScheduleObject?.stage_Id}`}
        >
          <IconButton
            disabled={disabled}
            onClick={() => handleRemoveSchedule(momentDate)}
            color="error"
            size="large"
            sx={{ padding: matchDownSM ? 0 : theme.spacing(1) }}
          >
            <IconBackspace strokeWidth={2} size="2rem" />
          </IconButton>
        </Tooltip>
      </Fade>
    );
  }
  return (
    <>
      <Tooltip title="Chọn Buổi Học">
        <IconButton
          disabled={disabled}
          onClick={(e) => {
            if (!stages.length) {
              dispatch(
                addNotificationAction("Lớp Không Tồn Tại Buổi Học", true)
              );
              return;
            }
            setAnchorEl(e.target);
            setOpenMenu(true);
          }}
          color="secondary"
          size="large"
          sx={{ padding: matchDownSM ? 0 : theme.spacing(1) }}
        >
          <IconChevronDown strokeWidth={2} size="2rem" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        PaperProps={{
          style: {
            maxHeight: "70vh",
            maxWidth: "100vw",
          },
        }}
        onClose={() => setOpenMenu(false)}
      >
        {_.cloneDeep(stages).map((item, index) => (
          <MenuItem
            key={momentDate + item.stage_Id + item.stage_Name + index}
            onClick={() => handleSelectSchedule(item.stage_Id, item.stage_Name)}
          >
            {`${item.stage_Name} - ${item.stage_Id}`}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const ClassManageScheduleModal = ({ open, handleClose, classObject }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const calendarView = useSelector((state) => state.customization.calendarView);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [scheduleDates, setScheduleDates] = useState([]);
  const [defaultScheduleDates, setDefaultScheduleDates] = useState([]);
  const [stages, setStages] = useState([]);

  const handleChangeTab = (event, newValue) => {
    if (loading) {
      return;
    }
    setTab(newValue);
  };

  const handleSetClassSchedule = (scheduleList) => {
    const schedules = scheduleList.map((item) => ({
      stage_Id: item.stage_Id,
      schedule_Date: moment(item.schedule_Date)
        .add("days", 1)
        .toDate()
        .toISOString(),
    }));
    setLoading(true);
    dispatch(
      setScheduleAction(classObject?.class_Id, schedules, (res, err) => {
        setLoading(false);
        if (err) {
          return;
        }
        getScheduleData();
      })
    );
  };

  const getScheduleData = () => {
    setLoading(true);
    dispatch(
      getScheduleByClassIdAction(classObject?.class_Id, (res, err) => {
        setLoading(false);
        if (err) {
          return;
        }
        const newData = (res?.schedules || []).map((item) => ({
          stage_Id: item.stage_Id,
          stage_Name: item.stage_Name,
          schedule_Date: moment(item.schedule_Date).format("YYYY-MM-DD"),
        }));
        setScheduleDates(_.cloneDeep(newData));
        setDefaultScheduleDates(_.cloneDeep(newData));
      })
    );
  };

  const getStageData = () => {
    setLoading(true);
    dispatch(
      getStageByClassIdAction(classObject?.class_Id, (res, err) => {
        setLoading(false);
        if (err) return;
        setStages(res);
      })
    );
  };

  const handleSetSchedule = (date, stageId, stageName) => {
    const scheduleObject = {
      schedule_Date: date,
      stage_Id: stageId,
      stage_Name: stageName,
    };
    const newDateSchedule = [..._.cloneDeep(scheduleDates), scheduleObject];
    setScheduleDates(newDateSchedule);
  };

  const handleRemoveSchedule = (date) => {
    const newDateSchedule = _.cloneDeep(scheduleDates).filter(
      (item) => item.schedule_Date !== date
    );
    setScheduleDates(newDateSchedule);
  };

  useEffect(() => {
    if (!classObject?.class_Id) {
      return;
    }
    getStageData();
    getScheduleData();
  }, [classObject?.class_Id]);

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title={`${NAME_TRANS_VN.CLASS_NAME}: ${classObject?.class_Name}`}
    >
      <Grid container p={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ padding: theme.spacing(1) }}>
          <Tabs value={tab} onChange={handleChangeTab}>
            <Tab icon={<IconChalkboard strokeWidth={2} size="1.5rem" />} />
            <Tab icon={<IconCalendar strokeWidth={2} size="1.5rem" />} />
            <Tab icon={<IconChecklist strokeWidth={2} size="1.5rem" />} />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          {tab === 0 && (
            <StageComponent
              classObject={classObject}
              setStageListByFather={setStages}
            />
          )}
          {tab === 1 && (
            <CustomBox>
              <Grid
                container
                justifyContent="flex-end"
                alignItems="flex-start"
                rowSpacing={2}
              >
                <Grid item xs={12} md={6}>
                  <Button
                    fullWidth
                    color="secondary"
                    variant="contained"
                    disabled={
                      _.isEqual(defaultScheduleDates, scheduleDates) || loading
                    }
                    onClick={() => handleSetClassSchedule(scheduleDates)}
                  >
                    {NAME_TRANS_VN.SAVE}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Calendar
                    view={calendarView}
                    value={null}
                    tileContent={({ date }) => (
                      <ScheduleSetupButton
                        disabled={loading}
                        date={date}
                        stages={stages}
                        scheduleDates={scheduleDates}
                        handleSetSchedule={handleSetSchedule}
                        handleRemoveSchedule={handleRemoveSchedule}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </CustomBox>
          )}
          {tab === 2 && (
            <CustomBox>
              <Attendance
                classObject={classObject}
                scheduleDates={scheduleDates}
              />
            </CustomBox>
          )}
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default ClassManageScheduleModal;
