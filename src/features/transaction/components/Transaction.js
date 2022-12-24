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
import TransactionFilterTeacherComponent from "./TransactionFilterTeacherComponent";
export const initTransactionFilter = {
  class_Name: "",
  student_Name: "",
};

export const initTransactionTeacherFilter = {
  class_Name: "",
  student_Name: "",
};

const TransactionComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);
  const userInfo = useSelector((state) => state.user.userInfo);
  const userDetail = useSelector((state) => state.user.userDetail);
  const [loading, setLoading] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState([]);
  const [filter, setFilter] = useState(_.cloneDeep(initTransactionFilter));
  const [filterTeacher, setFilterTeacher] = useState(
    _.cloneDeep(initTransactionTeacherFilter)
  );
  const [transactions, setTranactions] = useState([]);
  const [filterConfirmed, setFilterConfirmed] = useState(false);
  const [tab, setTab] = useState(0);

  const headers = useMemo(() => {
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
    return [
      "Id Lớp",
      "Tên Lớp",
      "Tên Giảng Viên",
      "Số Tiền Cần Đóng",
      "Trạng Thái",
    ];
  }, []);

  const handleChangeTab = (event, newValue) => {
    if (loading) {
      return;
    }
    setTab(newValue);
  };

  const handleConfirmTransaction = (itemTransaction) => {
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
  const getTransactionData = () => {
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

  const Utility = useCallback(({ item }) => {
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

  const UtilityAdmin = useCallback(
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
                onClick={() => handleConfirmTransaction(item)}
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
                  {item.class_Fee}
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
              utility: <Utility item={item} />,
              utilityAdmin: <UtilityAdmin item={item} />,
            }
          : {
              class_Id: item.class_Id,
              class_Name: item.class_Name,
              student_Name: item.student_Name,
              class_Fee: (
                <>
                  {item.class_Fee}
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
              utility: <Utility item={item} />,
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
    const isFilter = Object.values(filterTeacher).some((item) => Boolean(item));
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
                  {item.class_Fee}
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
              utility: <Utility item={item} />,
              utilityAdmin: <UtilityAdmin item={item} />,
            }
          : {
              class_Id: item.class_Id,
              class_Name: item.class_Name,
              student_Name: item.student_Name,
              class_Fee: (
                <>
                  {item.class_Fee}
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
              utility: <Utility item={item} />,
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

  useEffect(() => {
    getTransactionData();
  }, [userDetail?.user_Type]);

  return (
    <>
      <CustomBox>
        {tab === 0 && (
          <TransactionFilterComponent
            filter={filter}
            setFilter={setFilter}
            transactionList={transactions}
          />
        )}
        {tab === 1 && (
          <TransactionFilterTeacherComponent
            filter={filterTeacher}
            setFilter={setFilterTeacher}
            transactionList={transactions}
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
                label={NAME_TRANS_VN.STUDENT}
              />
              <Tab
                icon={<IconList strokeWidth={2} size="1.5rem" />}
                iconPosition="start"
                label={NAME_TRANS_VN.TEACHER}
              />
            </Tabs>
          </Grid>
          {loading ? (
            <LoadingComponent />
          ) : (
            <>
              {tab === 0 && (
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
                      headers={headers}
                      data={transactionData}
                      title={"Danh Sách Giao Dịch"}
                      // reloadPageWhenDataChange={false}
                    />
                  </Grid>
                </>
              )}
              {tab === 1 && (
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
