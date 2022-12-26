import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Switch,
  Tab,
  Tabs,
  Tooltip,
  useTheme,
} from "@mui/material";
import {
  IconClockHour3,
  IconCurrencyDong,
  IconDiscountCheck,
  IconList,
} from "@tabler/icons";
import { useDispatch, useSelector } from "react-redux";
import CustomBox from "../../../components/custom-box/CustomBox";
import _ from "lodash";
import CustomTable from "../../../components/custom-table/CustomTable";
import LoadingComponent from "../../../utils/component/Loading";
import TransactionFilterComponent from "./TransactionFilterComponent";
import {
  getStudentTransactionsByIdAction,
  getStudentTransactionsAction,
  confirmStudentTransactionAction,
} from "../../../redux/student/operators";
import AnimateButton from "../../../components/extended/Animate";
import { NAME_TRANS_VN } from "../../../config/constant";
import moment from "moment";
import { NumericFormat } from "react-number-format";
import {
  confirmTeacherTransactionAction,
  getTeacherTransactionsByMonthAction,
} from "../../../redux/teacher/operators";
import TransactionFilterTeacherComponent from "./TransactionFilterTeacherComponent";

export const initTransactionStudentFilter = {
  class_Name: "",
  student_Name: "",
};

export const initTransactionTeacherFilter = {
  teacher_Name: "",
  selected_Month: moment().toDate(),
};

const TransactionComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);
  const userInfo = useSelector((state) => state.user.userInfo);
  const userDetail = useSelector((state) => state.user.userDetail);
  const [loading, setLoading] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState([]);
  const [loadingConfirmTeacher, setLoadingConfirmTeacher] = useState([]);
  const [filter, setFilter] = useState(
    _.cloneDeep(initTransactionStudentFilter)
  );
  const [filterTeacher, setFilterTeacher] = useState(
    _.cloneDeep(initTransactionTeacherFilter)
  );
  const [transactions, setTranactions] = useState([]);
  const [transactionsTeacher, setTransactionsTeacher] = useState([]);
  const [filterConfirmed, setFilterConfirmed] = useState(false);
  const [filterConfirmedTeacher, setFilterConfirmedTeacher] = useState(false);
  const [tab, setTab] = useState(0);
  const isRenderAdmin = userDetail?.user_Type === 1;
  const isRenderStudent =
    (tab === 0 && userDetail?.user_Type === 1) || userDetail?.user_Type === 2;
  const isRenderTeacher =
    (tab === 1 && userDetail?.user_Type === 1) || userDetail?.user_Type === 3;
  const headersStudent = useMemo(() => {
    if (userDetail?.user_Type === 2) {
      return [
        "Id Lớp",
        "Tên Lớp",
        "Tên Học Viên",
        "Số Tiền Cần Đóng",
        "Trạng Thái",
      ];
    }
    return [
      "Id Lớp",
      "Tên Lớp",
      "Tên Học Viên",
      "Số Tiền Cần Đóng",
      "Trạng Thái",
      "#",
    ];
  }, [userDetail?.user_Type]);

  const headersTeacher = useMemo(() => {
    if (userDetail?.user_Type === 3) {
      return [
        "Id Giảng Viên",
        "Tên Giảng Viên",
        "Số Buổi Đã Dạy",
        "Số Tiền Thanh Toán",
        "Đợt Tất Toán",
        "Trạng Thái",
      ];
    }
    return [
      "Id Giảng Viên",
      "Tên Giảng Viên",
      "Số Buổi Đã Dạy",
      "Số Tiền Thanh Toán",
      "Đợt Tất Toán",
      "Trạng Thái",
      "#",
    ];
  }, [userDetail?.user_Type]);

  const handleChangeTab = (event, newValue) => {
    if (loading) {
      return;
    }
    setTab(newValue);
  };

  const handleConfirmTransactionStudent = (itemTransaction) => {
    setLoadingConfirm([...loadingConfirm, _.cloneDeep(itemTransaction)]);
    dispatch(
      confirmStudentTransactionAction(
        itemTransaction.student_Id,
        itemTransaction.class_Id,
        userInfo.email,
        (res, err) => {
          setLoadingConfirm(
            [...loadingConfirm].filter((i) =>
              _.isEqual(i, _.cloneDeep(itemTransaction))
            )
          );
          if (err) {
            return;
          }

          setTranactions((prevList) => {
            const indexTransactionTarget = prevList.findIndex((item) =>
              _.isEqual(item, itemTransaction)
            );
            prevList[indexTransactionTarget].paid_Ammount =
              prevList[indexTransactionTarget].class_Fee;
            return prevList;
          });
        }
      )
    );
  };

  const getTransactionStudentData = () => {
    if (!userDetail?.user_Type) {
      return;
    }
    setLoading(true);
    if (userDetail?.user_Type === 2) {
      dispatch(
        getStudentTransactionsByIdAction(
          userDetail.reference_Id,
          (res, err) => {
            setLoading(false);
            if (err) {
              return;
            }
            setTranactions(res);
          }
        )
      );
      return;
    }
    dispatch(
      getStudentTransactionsAction((res, err) => {
        setLoading(false);
        if (err) {
          return;
        }
        setTranactions(res);
      })
    );
  };

  const handleConfirmTransactionTeacher = (itemTransaction) => {
    setLoadingConfirmTeacher([
      ...loadingConfirmTeacher,
      _.cloneDeep(itemTransaction),
    ]);
    dispatch(
      confirmTeacherTransactionAction(
        itemTransaction.teacher_Id,
        filterTeacher.selected_Month,
        (res, err) => {
          setLoadingConfirmTeacher(
            [...loadingConfirmTeacher].filter((i) =>
              _.isEqual(i, _.cloneDeep(itemTransaction))
            )
          );
          if (err) {
            return;
          }

          setTransactionsTeacher((prevList) => {
            const indexTransactionTarget = prevList.findIndex((item) =>
              _.isEqual(item, itemTransaction)
            );
            prevList[indexTransactionTarget].status = 2;
            return prevList;
          });
        }
      )
    );
  };

  const getTransactionTeacherData = () => {
    setLoading(true);
    dispatch(
      getTeacherTransactionsByMonthAction(
        filterTeacher.selected_Month,
        (res, err) => {
          setLoading(false);
          if (err) {
            return;
          }
          setTransactionsTeacher(res);
        }
      )
    );
  };

  const UtilityStudent = useCallback(({ item }) => {
    const isFullfiled = Boolean(
      item?.paid_Ammount === item?.class_Fee && item?.paid_Ammount
    );
    return (
      <>
        {isFullfiled ? (
          <Tooltip title="Trung Tâm Đã Nhận Được Tiền">
            <IconButton color="success">
              <IconDiscountCheck
                strokeWidth={2}
                size="1.5rem"
                style={{ marginTop: "auto", marginBottom: "auto" }}
              />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Đang Đợi Xử Lý">
            <IconButton color="primary">
              <IconClockHour3
                strokeWidth={2}
                size="1.5rem"
                style={{ marginTop: "auto", marginBottom: "auto" }}
              />
            </IconButton>
          </Tooltip>
        )}
      </>
    );
  }, []);

  const UtilityTeacher = useCallback(({ item }) => {
    const isFullfiled = Boolean(item?.status === 2);
    return (
      <>
        {isFullfiled ? (
          <Tooltip title="Giảng Viên Đã Nhận Được Tiền">
            <IconButton color="success">
              <IconDiscountCheck
                strokeWidth={2}
                size="1.5rem"
                style={{ marginTop: "auto", marginBottom: "auto" }}
              />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Đang Đợi Xử Lý">
            <IconButton color="primary">
              <IconClockHour3
                strokeWidth={2}
                size="1.5rem"
                style={{ marginTop: "auto", marginBottom: "auto" }}
              />
            </IconButton>
          </Tooltip>
        )}
      </>
    );
  }, []);

  const UtilityAdminStudent = useCallback(
    ({ item }) => {
      const isFullfiled = Boolean(
        item?.paid_Ammount === item?.class_Fee && item?.paid_Ammount
      );
      const isDisabled =
        isFullfiled || loadingConfirm.some((i) => _.isEqual(i, item));
      const isLoading = loadingConfirm.some((i) => _.isEqual(i, item));
      return (
        <Grid container flexWrap="nowrap" columnGap={2}>
          <Grid item xs={12}>
            <AnimateButton>
              <Button
                disabled={isDisabled}
                variant="contained"
                color="secondary"
                onClick={() => handleConfirmTransactionStudent(item)}
                endIcon={
                  isLoading && <CircularProgress color="secondary" size={20} />
                }
              >
                Xác Nhận
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      );
    },
    [loadingConfirm]
  );

  const UtilityAdminTeacher = useCallback(
    ({ item }) => {
      const isFullfiled = Boolean(item?.status === 2);
      const isDisabled =
        isFullfiled || loadingConfirmTeacher.some((i) => _.isEqual(i, item));
      const isLoading = loadingConfirmTeacher.some((i) => _.isEqual(i, item));
      return (
        <Grid container flexWrap="nowrap" columnGap={2}>
          <Grid item xs={12}>
            <AnimateButton>
              <Button
                disabled={isDisabled}
                variant="contained"
                color="secondary"
                onClick={() => handleConfirmTransactionTeacher(item)}
                endIcon={
                  isLoading && <CircularProgress color="secondary" size={20} />
                }
              >
                Xác Nhận
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      );
    },
    [loadingConfirm]
  );

  const transactionData = useMemo(() => {
    const isFilter = Object.values(filter).some((item) => Boolean(item));
    const cloneTransactionList = _.cloneDeep(transactions)
      .filter((item) =>
        filterConfirmed
          ? item?.paid_Ammount === item?.class_Fee
          : item?.paid_Ammount !== item?.class_Fee
      )
      .map((item) =>
        userDetail?.user_Type === 1
          ? {
              class_Id: item.class_Id,
              class_Name: item.class_Name,
              student_Name: item.student_Name,
              class_Fee: (
                <>
                  <NumericFormat
                    value={item.class_Fee}
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
              utility: <UtilityStudent item={item} />,
              utilityAdmin: <UtilityAdminStudent item={item} />,
            }
          : {
              class_Id: item.class_Id,
              class_Name: item.class_Name,
              student_Name: item.student_Name,
              class_Fee: (
                <>
                  <NumericFormat
                    value={item.class_Fee}
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
              utility: <UtilityStudent item={item} />,
            }
      );
    if (!isFilter) {
      return cloneTransactionList;
    }
    let filterResult = cloneTransactionList
      .filter((item) =>
        filter.class_Name
          ? item.class_Name
              .toLowerCase()
              .includes(filter.class_Name.toLowerCase())
          : true
      )
      .filter((item) =>
        filter.student_Name
          ? item.student_Name
              .toLowerCase()
              .includes(filter.student_Name.toLowerCase())
          : true
      );
    return filterResult;
  }, [filter, transactions, loadingConfirm, filterConfirmed]);

  const transactionTeacherData = useMemo(() => {
    const isFilter = filterTeacher.teacher_Name;
    // {
    //   "teacher_Name": "ngoc Kwb",
    //   "period": 2,
    //   "payroll_Value": "1000000",
    //   "confirm_By": null,
    //   "confirm_Date": "2022-12-25T18:01:19",
    //   "status": 2,
    //   "status_Text": 0,
    //   "total": 2000000,
    //   "teacher_Id": 44,
    //   "transaction_Month": "12",
    //   "transaction_Year": "2022"
    // }
    const cloneTransactionList = _.cloneDeep(transactionsTeacher)
      .filter((item) =>
        userDetail?.user_Type === 1
          ? true
          : userDetail?.reference_Id === item.teacher_Id
      )
      .filter((item) =>
        filterConfirmedTeacher ? item?.status === 2 : item?.status === 1
      )
      .map((item) =>
        userDetail?.user_Type === 1
          ? {
              teacher_Id: item.teacher_Id,
              teacher_Name: item.teacher_Name,
              period: item.period,
              total: (
                <>
                  <NumericFormat
                    value={item.total}
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
              date: item.transaction_Month + "/" + item.transaction_Year,
              utility: <UtilityTeacher item={item} />,
              utilityAdmin: <UtilityAdminTeacher item={item} />,
            }
          : {
              teacher_Id: item.teacher_Id,
              teacher_Name: item.teacher_Name,
              period: item.period,
              total: (
                <>
                  <NumericFormat
                    value={item.total}
                    type="text"
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
              date: item.transaction_Month + "/" + item.transaction_Year,
              utility: <UtilityTeacher item={item} />,
            }
      );
    if (!isFilter) {
      return cloneTransactionList;
    }
    let filterResult = cloneTransactionList.filter((item) =>
      filter.teacher_Name
        ? item.teacher_Name
            .toLowerCase()
            .includes(filter.teacher_Name.toLowerCase())
        : true
    );

    return filterResult;
  }, [
    filterTeacher,
    transactionsTeacher,
    loadingConfirmTeacher,
    filterConfirmedTeacher,
  ]);

  useEffect(() => {
    if (isRenderStudent) {
      getTransactionStudentData();
      return;
    }
    if (isRenderTeacher) {
      getTransactionTeacherData();
      return;
    }
  }, [
    userDetail?.user_Type,
    isRenderStudent,
    isRenderTeacher,
    filterTeacher.selected_Month,
  ]);

  return (
    <>
      <CustomBox>
        {isRenderStudent && (
          <TransactionFilterComponent
            filter={filter}
            setFilter={setFilter}
            transactionList={transactions}
          />
        )}
        {isRenderTeacher && (
          <TransactionFilterTeacherComponent
            filter={filterTeacher}
            setFilter={setFilterTeacher}
            transactionList={transactions}
          />
        )}
      </CustomBox>
      <CustomBox>
        <Grid container rowSpacing={2} sx={{ overflowX: "auto" }}>
          {isRenderAdmin && (
            <Grid item xs={12} sx={{ padding: theme.spacing(1) }}>
              <Tabs value={tab} onChange={handleChangeTab}>
                <Tab
                  icon={<IconList strokeWidth={2} size="1.5rem" />}
                  iconPosition="start"
                  label={NAME_TRANS_VN.STUDENT}
                />
                <Tab
                  icon={<IconList strokeWidth={2} size="1.5rem" />}
                  iconPosition="start"
                  label={NAME_TRANS_VN.TEACHER}
                />
              </Tabs>
            </Grid>
          )}
          {loading ? (
            <LoadingComponent />
          ) : (
            <>
              {isRenderStudent && (
                <>
                  <Grid container item xs={12} justifyContent="flex-end">
                    <Switch
                      icon={
                        <IconClockHour3
                          strokeWidth={2}
                          size="1.5rem"
                          style={{
                            marginTop: "auto",
                            marginBottom: "auto",
                            borderRadius: `${customization.borderRadius}px`,
                            border: "2px solid",
                            position: "relative",
                            bottom: 2,
                            backgroundColor: theme.palette.background.default,
                            color: theme.palette.primary.main,
                          }}
                        />
                      }
                      checkedIcon={
                        <IconDiscountCheck
                          strokeWidth={2}
                          size="1.5rem"
                          style={{
                            marginTop: "auto",
                            marginBottom: "auto",
                            borderRadius: `${customization.borderRadius}px`,
                            border: "2px solid",
                            position: "relative",
                            bottom: 2,
                            backgroundColor: theme.palette.background.default,
                          }}
                        />
                      }
                      checked={filterConfirmed}
                      color="success"
                      onChange={() => setFilterConfirmed(!filterConfirmed)}
                      size="medium"
                      sx={{
                        "& .MuiSwitch-track": {
                          backgroundColor: !filterConfirmed
                            ? theme.palette.primary.dark
                            : theme.palette.success.dark,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTable
                      headers={headersStudent}
                      data={transactionData}
                      title={"Danh Sách Giao Dịch"}
                      // reloadPageWhenDataChange={false}
                    />
                  </Grid>
                </>
              )}
              {isRenderTeacher && (
                <>
                  <Grid container item xs={12} justifyContent="flex-end">
                    <Switch
                      icon={
                        <IconClockHour3
                          strokeWidth={2}
                          size="1.5rem"
                          style={{
                            marginTop: "auto",
                            marginBottom: "auto",
                            borderRadius: `${customization.borderRadius}px`,
                            border: "2px solid",
                            position: "relative",
                            bottom: 2,
                            backgroundColor: theme.palette.background.default,
                            color: theme.palette.primary.main,
                          }}
                        />
                      }
                      checkedIcon={
                        <IconDiscountCheck
                          strokeWidth={2}
                          size="1.5rem"
                          style={{
                            marginTop: "auto",
                            marginBottom: "auto",
                            borderRadius: `${customization.borderRadius}px`,
                            border: "2px solid",
                            position: "relative",
                            bottom: 2,
                            backgroundColor: theme.palette.background.default,
                          }}
                        />
                      }
                      checked={filterConfirmedTeacher}
                      color="success"
                      onChange={() =>
                        setFilterConfirmedTeacher(!filterConfirmedTeacher)
                      }
                      size="medium"
                      sx={{
                        "& .MuiSwitch-track": {
                          backgroundColor: !filterConfirmedTeacher
                            ? theme.palette.primary.dark
                            : theme.palette.success.dark,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTable
                      headers={headersTeacher}
                      data={transactionTeacherData}
                      title={"Danh Sách Giao Dịch Trả Lương Giảng Viên"}
                      // reloadPageWhenDataChange={false}
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

export default TransactionComponent;
