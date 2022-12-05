import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  CircularProgress,
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
import mockDataStage from "../../../config/data/stage-mock-data.json";
import moment from "moment";
import CustomBox from "./../../../components/custom-box/CustomBox";
import {
  IconCalendar,
  IconBackspace,
  IconChalkboard,
  IconChevronDown,
  IconPlus,
  IconEdit,
  IconTrash,
} from "@tabler/icons";
import { useDispatch } from "react-redux";
import _ from "lodash";
import CustomTable from "../../../components/custom-table/CustomTable";
import {
  addStageAction,
  getStageByClassIdAction,
  removeStageAction,
} from "../../../redux/class/operators";
import { addNotificationAction } from "../../../redux/utils/operators";

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

const ClassManageScheduleModal = ({
  open,
  handleClose,
  classObject,
  reloadClassData,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingDeleteStage, setLoadingDeleteStage] = useState(false);
  const [tab, setTab] = React.useState(0);
  const [dateScheduleList, setDateScheduleList] = useState([]);
  const [stageList, setStageList] = useState([]);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const handleSetSchedule = (date, stageId, stageName) => {
    const scheduleObject = {
      schedule_Date: date,
      stage_Id: stageId,
      stage_Name: stageName,
    };
    setDateScheduleList([...dateScheduleList, scheduleObject]);
  };

  const handleRemoveSchedule = (date) => {
    setDateScheduleList(
      [...dateScheduleList].filter((item) => item.schedule_Date !== date)
    );
  };

  const handleOpenAddStageForm = async () => {
    setLoading(true);
    const addStagePromise = _.cloneDeep(mockDataStage)
      .slice(0, 50)
      .map(
        (item) =>
          new Promise((resolve) => {
            dispatch(
              addStageAction(
                classObject?.class_Id,
                item.stage_Name,
                (res, err) => {
                  resolve(true);
                  if (err) {
                    return;
                  }
                }
              )
            );
          })
      );
    await Promise.all(addStagePromise);
    getStageData();
    return;
    reloadClassData();
  };

  const handleRemoveStage = (stage_Id) => {
    setLoadingDeleteStage(true);
    dispatch(
      removeStageAction(stage_Id, (res, err) => {
        setLoadingDeleteStage(false);
        if (err) return;
        setStageList(
          _.cloneDeep(stageList).filter((item) => item.stageId !== stage_Id)
        );
      })
    );
  };
  const Utility = useCallback(
    ({ item }) => {
      return (
        <Grid
          container
          justifyContent="flex-end"
          flexWrap="nowrap"
          columnGap={2}
        >
          <Grid item>
            <IconButton disabled={loadingDeleteStage}>
              <IconEdit
                strokeWidth={2}
                size="1.5rem"
                style={{ marginTop: "auto", marginBottom: "auto" }}
              />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              disabled={loadingDeleteStage}
              color="error"
              onClick={() => handleRemoveStage(item.stage_Id)}
            >
              <IconTrash
                strokeWidth={2}
                size="1.5rem"
                style={{ marginTop: "auto", marginBottom: "auto" }}
              />
            </IconButton>
          </Grid>
        </Grid>
      );
    },
    [loadingDeleteStage]
  );

  const stageData = useMemo(() => {
    const cloneStageList = _.cloneDeep(stageList).map((item) => ({
      stage_Id: item.stage_Id,
      stage_Name: item.stage_Name,
      utility: <Utility item={item} />,
    }));
    return cloneStageList;
  }, [stageList]);

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

  useEffect(() => {
    if (!open) {
      return;
    }
    //TODO: binding schedule by class data
    getStageData();
    return;
    setStageList(_.cloneDeep(mockDataStage).slice(0, 10));
  }, [open, tab]);

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title={`${NAME_TRANS_VN.CLASS_NAME}: ${classObject?.class_Name}`}
    >
      <Grid container p={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ padding: theme.spacing(1) }}>
          <Tabs value={tab} onChange={handleChangeTab}>
            <Tab icon={<IconCalendar strokeWidth={2} size="2rem" />} />
            <Tab icon={<IconChalkboard strokeWidth={2} size="2rem" />} />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          <CustomBox>
            {tab === 0 && (
              <Calendar
                view="month"
                value={null}
                tileContent={({ date }) => (
                  <ScheduleSetupButton
                    disabled={loading || loadingDeleteStage}
                    date={date}
                    stageList={stageList}
                    dateScheduleList={dateScheduleList}
                    handleSetSchedule={handleSetSchedule}
                    handleRemoveSchedule={handleRemoveSchedule}
                  />
                )}
              />
            )}
            {tab === 1 && (
              <Grid
                container
                justifyContent="flex-end"
                alignItems="flex-start"
                rowSpacing={2}
              >
                <Grid item xs={12} md={4}>
                  <Button
                    disabled={loading}
                    color="secondary"
                    variant="contained"
                    onClick={handleOpenAddStageForm}
                    fullWidth
                    endIcon={
                      loading ? (
                        <CircularProgress color="secondary" size={20} />
                      ) : (
                        <IconPlus
                          stroke={1.5}
                          size="2rem"
                          style={{
                            marginTop: "auto",
                            marginBottom: "auto",
                          }}
                        />
                      )
                    }
                  >
                    {NAME_TRANS_VN.STAGE_ADD}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <CustomTable
                    headers={["Id", "Tên Lộ Trình", "#"]}
                    data={stageData}
                    title="Danh Sách Lộ Trình"
                  />
                </Grid>
              </Grid>
            )}
          </CustomBox>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default ClassManageScheduleModal;
