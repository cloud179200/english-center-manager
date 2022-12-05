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
} from "@tabler/icons";
import { useDispatch } from "react-redux";
import _ from "lodash";
import {
  getScheduleByClassIdAction,
  getStageByClassIdAction,
  setScheduleAction,
} from "../../../redux/class/operators";
import { addNotificationAction } from "../../../redux/utils/operators";
import StageComponent from "../../stage/components/Stage";

const ScheduleSetupButton = ({
  disabled,
  date,
  stageList,
  dateScheduleList,
  handleRemoveSchedule,
  handleSetSchedule,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const momentDate = moment(date).format("DD.MM.YYYY");
  const dateScheduleObject = _.cloneDeep(dateScheduleList).find(
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
          title={`Xóa Lộ Trình Đã Gán: ${dateScheduleObject?.stage_Name} - ${dateScheduleObject?.stage_Id}`}
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
      <Tooltip title="Chọn Lộ Trình">
        <IconButton
          disabled={disabled}
          onClick={(e) => {
            if (!stageList.length) {
              dispatch(
                addNotificationAction("Lớp Không Tồn Tại Lộ Trình", true)
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
            maxHeight: "50vh",
            width: "fit-content",
          },
        }}
        onClose={() => setOpenMenu(false)}
      >
        {_.cloneDeep(stageList).map((item, index) => (
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
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [dateScheduleList, setDateScheduleList] = useState([]);
  const [stageList, setStageList] = useState([]);

  const setSchedule = (scheduleList) => {
    const schedules = scheduleList.map(item => ({
      stage_Id: item.stage_Id,
      schedule_Date: new Date(moment(item.schedule_Date)),
    }))
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
        debugger;
        console.log("[getScheduleByClassIdAction]", res);
      })
    );
  };

  const getStageData = () => {
    setLoading(true);
    dispatch(
      getStageByClassIdAction(classObject?.class_Id, (res, err) => {
        setLoading(false);
        if (err) return;
        setStageList(res);
      })
    );
  };

  const handleChangeTab = (event, newValue) => {
    if (loading) {
      return;
    }
    setTab(newValue);
  };

  const handleSetSchedule = (date, stageId, stageName) => {
    const scheduleObject = {
      schedule_Date: date,
      stage_Id: stageId,
      stage_Name: stageName,
    };
    const newDateSchedule = [..._.cloneDeep(dateScheduleList), scheduleObject];
    setSchedule(newDateSchedule);
    setDateScheduleList(newDateSchedule);
  };

  const handleRemoveSchedule = (date) => {
    const newDateSchedule = _.cloneDeep(dateScheduleList).filter(
      (item) => item.schedule_Date !== date
    );
    setSchedule(newDateSchedule);
    setDateScheduleList(newDateSchedule);
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
            <Tab icon={<IconChalkboard strokeWidth={2} size="2rem" />} />
            <Tab icon={<IconCalendar strokeWidth={2} size="2rem" />} />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          {tab === 0 && (
            <StageComponent
              classObject={classObject}
            />
          )}
          {tab === 1 && (
            <CustomBox>
              <Calendar
                value={null}
                tileContent={({ date }) => (
                  <ScheduleSetupButton
                    disabled={loading}
                    date={date}
                    stageList={stageList}
                    dateScheduleList={dateScheduleList}
                    handleSetSchedule={handleSetSchedule}
                    handleRemoveSchedule={handleRemoveSchedule}
                  />
                )}
              />
            </CustomBox>
          )}
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default ClassManageScheduleModal;
