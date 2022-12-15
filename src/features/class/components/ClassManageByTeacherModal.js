import React, { useEffect, useState } from "react";
import {
  Grid,
  Tab,
  Tabs,
  useTheme,
} from "@mui/material";
import CustomModal from "../../../components/custom-modal/CustomModal";
import { NAME_TRANS_VN } from "../../../config/constant";
import "../../../assets/scss/_custom-calendar.scss";
import moment from "moment";
import CustomBox from "../../../components/custom-box/CustomBox";
import {
  IconChecklist,
} from "@tabler/icons";
import { useDispatch } from "react-redux";
import _ from "lodash";
import {
  getScheduleByClassIdAction,
} from "../../../redux/class/operators";
import Attendance from "../../attendance/component/Attendance";

const ClassManageByTeacherModal = ({ open, handleClose, classObject }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [scheduleDates, setScheduleDates] = useState([]);
  
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
      })
    );
  };


  const handleChangeTab = (event, newValue) => {
    if (loading) {
      return;
    }
    setTab(newValue);
  };

  useEffect(() => {
    if (!classObject?.class_Id) {
      return;
    }
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
            <Tab icon={<IconChecklist strokeWidth={2} size="1.5rem" />} />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          {tab === 0 && (
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

export default ClassManageByTeacherModal;
