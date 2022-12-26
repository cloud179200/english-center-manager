import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Chip,
  Fade,
  Grid,
  IconButton,
  Tab,
  Tabs,
  useTheme,
} from "@mui/material";
import {
  IconInfoCircle,
  IconTrash,
  IconBackspace,
  IconSelect,
  IconList,
  IconArrowBigUpLines,
  IconCurrencyDong,
  IconEdit,
  IconCirclePlus,
} from "@tabler/icons";
import { useDispatch } from "react-redux";
import CustomBox from "../../../components/custom-box/CustomBox";
import _ from "lodash";
import CustomTable from "../../../components/custom-table/CustomTable";
import LoadingComponent from "../../../utils/component/Loading";
import TeacherFilterComponent from "./TeacherFilterComponent";
import {
  assignPayrollToTeacherAction,
  getListPayrollAction,
  getListTeacherAction,
} from "../../../redux/teacher/operators";
import TeacherInfoModal from "./TeacherInfoModal";
import TeacherDeleteModal from "./TeacherDeleteModal";
import TeacherSelectPayrollMenu from "./TeacherSelectPayroll";
import salaryMockData from "../../../config/data/salary-mock-data.json";
import { NAME_TRANS_VN } from "../../../config/constant";
import PayrollFilterComponent from "./PayrollFilterComponent";
import PayrollDeleteModal from "./PayrollDeleteModal";
import PayrollEditModal from "./PayrollEditModal";
import PayrollAddModal from "./PayrollAddModal";
import { addNotificationAction } from "../../../redux/utils/operators";
import { NumericFormat } from "react-number-format";

export const initTeacherFilter = {
  teacher_Id: "",
  teacher_Name: "",
};
export const initPayrollFilter = {
  teacher_Id: "",
  teacher_Name: "",
};

const TeacherComponent = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [loadingSelectPayrolls, setLoadingSelectPayrolls] = useState([]);
  const [filter, setFilter] = useState(_.cloneDeep(initTeacherFilter));
  const [filterPayroll, setFilterPayroll] = useState(
    _.cloneDeep(initPayrollFilter)
  );
  const [teachers, setTeachers] = useState([]);
  const [deleteTeacherObject, setDeleteTeacherObject] = useState(null);
  const [infoTeacherObject, setInfoTeacherObject] = useState(null);

  const [openAddPayrollModal, setOpenAddPayrollModal] = useState(false);
  const [editPayrollObject, setEditPayrollObject] = useState(null);
  const [deletePayrollObject, setDeletePayrollObject] = useState(null);

  const [payrolls, setPayrolls] = useState([]);
  const [payrollTeacherObject, setPayrollTeacherObject] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [tab, setTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    if (loading) {
      return;
    }
    setTab(newValue);
  };

  const handleOpenAddPayrollModal = () => {
    setOpenAddPayrollModal(true);
  };

  const handleCloseAddPayrollModal = () => {
    setOpenAddPayrollModal(false);
  };
  const handleCloseEditPayrollModal = () => {
    setEditPayrollObject(null);
  };

  const handleCloseDeletePayrollModal = () => {
    setDeletePayrollObject(null);
  };

  const handleRemovePayroll = (item) => {
    const newTeachers = _.cloneDeep(teachers).map((i) =>
      i?.teacher_Id === item?.teacher_Id
        ? { ...i, payroll_Id: null, payroll_Name: null }
        : i
    );
    setTeachers(newTeachers);
  };

  const handleOpenSelectSalaryMenu = (e, item) => {
    if (!payrolls.length) {
      dispatch(addNotificationAction("Hiện Không Có Bậc Lương Nào!", true));
      return;
    }
    setOpenMenu(true);
    setAnchorEl(e.target);
    setPayrollTeacherObject(item);
  };

  const handleCloseSelectPayrollMenu = () => {
    setOpenMenu(false);
    setAnchorEl(null);
    setPayrollTeacherObject(null);
  };

  const handleSelectPayroll = (teacherObject, item) => {
    setLoadingSelectPayrolls((prevState) => {
      return [...prevState, teacherObject];
    });
    dispatch(
      assignPayrollToTeacherAction(
        item?.payroll_Id,
        teacherObject?.teacher_Id,
        (res, err) => {
          if (err) {
            return;
          }
          setLoadingSelectPayrolls((prevState) => {
            return prevState.filter((i) => !_.isEqual(i, teacherObject));
          });
          const newTeachers = _.cloneDeep(teachers).map((i) =>
            i?.teacher_Id === teacherObject?.teacher_Id
              ? {
                  ...i,
                  payroll_Id: item?.payroll_Id,
                  payroll_Name: item?.payroll_Name,
                }
              : i
          );
          setTeachers(newTeachers);
        }
      )
    );
  };

  const handleCloseDeleteTeacherModal = () => {
    setDeleteTeacherObject(null);
  };

  const handleCloseInfoTeacherModal = () => {
    setInfoTeacherObject(null);
  };

  const reloadTeacherData = () => {
    getTeacherData();
  };

  const getTeacherData = () => {
    setLoading(true);
    dispatch(
      getListTeacherAction((res, err) => {
        setLoading(false);
        if (err) {
          return;
        }
        setTeachers(
          res.map((item) => {
            const randomSalary = _.sample([null, _.sample(salaryMockData)]);
            if (!randomSalary) {
              return {
                ...item,
                teacher_Id: item.teacher_Id,
                teacher_Name: item.first_Name + " " + item.last_Name,
              };
            }
            return {
              ...item,
              teacher_Id: item.teacher_Id,
              teacher_Name: item.first_Name + " " + item.last_Name,
              ...randomSalary,
            };
          })
        );
      })
    );
  };

  const getPayrollData = () => {
    setLoading(true);
    dispatch(
      getListPayrollAction((res, err) => {
        setLoading(false);
        if (err) {
          return;
        }
        setPayrolls(
          res.map((item) => {
            return {
              ...item,
              payroll_Id: item.payroll_Id,
              payroll_Name: item.payroll_Name,
              payroll_Value: item.payroll_Value,
            };
          })
        );
      })
    );
  };

  const reloadPayrollData = () => {
    getPayrollData();
  };

  const UtilityPayroll = useCallback(({ item }) => {
    return (
      <Grid container justifyContent="flex-end" flexWrap="nowrap" columnGap={2}>
        <Grid item>
          <IconButton onClick={() => setEditPayrollObject(_.cloneDeep(item))}>
            <IconEdit
              strokeWidth={2}
              size="1.5rem"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            onClick={() => setDeletePayrollObject(_.cloneDeep(item))}
            color="error"
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
  }, []);

  const Utility = useCallback(({ item }) => {
    return (
      <Grid container justifyContent="flex-end" flexWrap="nowrap" columnGap={2}>
        <Grid item>
          <IconButton
            color="primary"
            onClick={() => setInfoTeacherObject(_.cloneDeep(item))}
          >
            <IconInfoCircle
              strokeWidth={2}
              size="1.5rem"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            />
          </IconButton>
        </Grid>

        <Grid item>
          <IconButton
            color="error"
            onClick={() => setDeleteTeacherObject(_.cloneDeep(item))}
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
  }, []);

  const UtilitySelectPayroll = useCallback(
    ({ item }) => {
      return (
        <Grid
          container
          justifyContent="flex-end"
          flexWrap="nowrap"
          columnGap={2}
        >
          <Grid item>
            {item?.payroll_Id ? (
              <Fade in={true}>
                <Chip
                  color="secondary"
                  label={item?.payroll_Name}
                  onDelete={() => handleRemovePayroll(_.cloneDeep(item))}
                  deleteIcon={<IconBackspace strokeWidth={2} size="1.5rem" />}
                />
              </Fade>
            ) : (
              <IconButton
                color="secondary"
                disabled={loadingSelectPayrolls.some((i) => _.isEqual(i, item))}
                onClick={(e) =>
                  handleOpenSelectSalaryMenu(e, _.cloneDeep(item))
                }
              >
                <IconSelect
                  strokeWidth={2}
                  size="1.5rem"
                  style={{ marginTop: "auto", marginBottom: "auto" }}
                />
              </IconButton>
            )}
          </Grid>
        </Grid>
      );
    },
    [teachers, payrolls, loadingSelectPayrolls]
  );

  const teacherData = useMemo(() => {
    const isFilter = Object.values(filter).some((item) => Boolean(item));
    const cloneTeacherList = _.cloneDeep(teachers).map((item) => ({
      teacher_Id: item.teacher_Id,
      teacher_Name: item.teacher_Name,
      utilitySalary: <UtilitySelectPayroll item={item} />,
      utility: <Utility item={item} />,
    }));
    if (!isFilter) {
      return cloneTeacherList;
    }
    let filterResult = cloneTeacherList
      .filter((item) =>
        filter.teacher_Id
          ? item.teacher_Id.toString().includes(filter.teacher_Id)
          : true
      )
      .filter((item) =>
        filter.teacher_Name
          ? item.teacher_Name
              .toLowerCase()
              .includes(filter.teacher_Name.toLowerCase())
          : true
      );
    return filterResult;
  }, [filter, teachers, payrolls]);

  const payrollData = useMemo(() => {
    const isFilter = Object.values(filterPayroll).some((item) => Boolean(item));
    const cloneTeacherList = _.cloneDeep(payrolls).map((item) => ({
      payroll_Id: item.payroll_Id,
      payroll_Name: item.payroll_Name,
      payroll_Value: (
        <>
          <NumericFormat
            value={item.payroll_Value}
            thousandSeparator={true}
            displayType="text"
          />
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
        </>
      ),
      utility: <UtilityPayroll item={item} />,
    }));
    if (!isFilter) {
      return cloneTeacherList;
    }
    let filterResult = cloneTeacherList
      .filter((item) =>
        filter.payroll_Id
          ? item.payroll_Id.toString().includes(filter.payroll_Id)
          : true
      )
      .filter((item) =>
        filter.payroll_Name
          ? item.payroll_Name
              .toLowerCase()
              .includes(filter.payroll_Name.toLowerCase())
          : true
      );
    return filterResult;
  }, [filterPayroll, payrolls]);

  useEffect(() => {
    switch (tab) {
      case 0:
        getTeacherData();
        getPayrollData();
        handleCloseSelectPayrollMenu();
        break;
      case 1:
        getPayrollData();
    }
  }, [tab]);

  return (
    <>
      <TeacherInfoModal
        teacherObject={infoTeacherObject}
        open={Boolean(infoTeacherObject)}
        handleClose={handleCloseInfoTeacherModal}
      />
      <TeacherDeleteModal
        teacherObject={deleteTeacherObject}
        open={Boolean(deleteTeacherObject)}
        handleClose={handleCloseDeleteTeacherModal}
        reloadTeacherData={reloadTeacherData}
      />
      <TeacherSelectPayrollMenu
        anchorEl={anchorEl}
        openMenu={openMenu}
        handleClose={handleCloseSelectPayrollMenu}
        handleSelect={handleSelectPayroll}
        teacherObject={payrollTeacherObject}
        payrolls={payrolls}
      />
      <PayrollDeleteModal
        payrollObject={deletePayrollObject}
        open={Boolean(deletePayrollObject)}
        handleClose={handleCloseDeletePayrollModal}
        reloadPayrollData={reloadPayrollData}
      />
      <PayrollEditModal
        payrollObject={editPayrollObject}
        open={Boolean(editPayrollObject)}
        handleClose={handleCloseEditPayrollModal}
        reloadPayrollData={reloadPayrollData}
      />
      <PayrollAddModal
        open={openAddPayrollModal}
        handleClose={handleCloseAddPayrollModal}
        reloadPayrollData={reloadPayrollData}
      />
      <CustomBox>
        {tab === 0 && (
          <TeacherFilterComponent
            filter={filter}
            setFilter={setFilter}
            teacherList={teachers}
          />
        )}

        {tab === 1 && (
          <PayrollFilterComponent
            filter={filterPayroll}
            setFilter={setFilterPayroll}
            payrollList={payrolls}
          />
        )}
      </CustomBox>
      <CustomBox>
        <Grid container rowSpacing={2} sx={{ overflowX: "auto" }}>
          <Grid item xs={12} sx={{ padding: theme.spacing(1) }}>
            <Tabs value={tab} onChange={handleChangeTab}>
              <Tab
                icon={<IconList strokeWidth={2} size="1.5rem" />}
                iconPosition="start"
                label={NAME_TRANS_VN.TEACHER}
              />
              <Tab
                icon={<IconArrowBigUpLines strokeWidth={2} size="1.5rem" />}
                iconPosition="start"
                label={NAME_TRANS_VN.PAYROLL}
              />
            </Tabs>
          </Grid>
          {loading ? (
            <LoadingComponent />
          ) : (
            <>
              {tab === 0 && (
                <Grid item xs={12}>
                  <CustomTable
                    reloadPageWhenDataChange={false}
                    headers={["Id", "Tên Giảng Viên", "Bậc Lương", "#"]}
                    data={teacherData}
                    title="Danh Sách Giảng Viên"
                  />
                </Grid>
              )}
              {tab === 1 && (
                <>
                  <Grid item xs={12} md={3}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      endIcon={
                        <IconCirclePlus
                          stroke={1.5}
                          size="1.5rem"
                          style={{ marginTop: "auto", marginBottom: "auto" }}
                        />
                      }
                      onClick={handleOpenAddPayrollModal}
                      sx={{
                        width: "100%",
                      }}
                    >
                      {NAME_TRANS_VN.PAYROLL_NEW}
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTable
                      reloadPageWhenDataChange={false}
                      headers={["Id", "Tên Bậc Lương", "Giá Trị", "#"]}
                      data={payrollData}
                      title="Danh Sách Bậc Lương"
                    />
                  </Grid>
                </>
              )}
            </>
          )}
        </Grid>
      </CustomBox>
    </>
  );
};

export default TeacherComponent;
