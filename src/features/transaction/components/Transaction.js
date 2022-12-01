import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import {
  IconClockHour3,
  IconCurrencyDong,
  IconInfoCircle,
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
import { useLatest } from "react-use";
export const initTransactionFilter = {
  class_Name: "",
  student_Name: "",
};

const TransactionComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const userDetail = useSelector((state) => state.user.userDetail);
  const [loading, setLoading] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState([]);
  const lastestLoadingConfirm = useLatest(loadingConfirm);
  const [filter, setFilter] = useState(_.cloneDeep(initTransactionFilter));
  const [transactionList, setTranactionList] = useState([]);
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

  const handleConfirmTransaction = (item) => {
    setLoadingConfirm([
      ...lastestLoadingConfirm.current,
      `${item.student_Id} ${item.class_Id}`,
    ]);
    dispatch(
      confirmStudentTransactionAction(
        item.student_Id,
        item.class_Id,
        userInfo.email,
        (res, err) => {
          setLoadingConfirm(
            [...lastestLoadingConfirm.current].filter(
              (i) => i !== `${item.student_Id} ${item.class_Id}`
            )
          );
          if (err) {
            return;
          }
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
            setTranactionList(res);
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
        setTranactionList(res);
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
              <IconInfoCircle
                strokeWidth={2}
                size="1.3rem"
                style={{ marginTop: "auto", marginBottom: "auto" }}
              />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Đang Đợi Xử Lý">
            <IconButton color="primary">
              <IconClockHour3
                strokeWidth={2}
                size="1.3rem"
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
        isFullfiled ||
        lastestLoadingConfirm.current.includes(`${item.student_Id} ${item.class_Id}`);
      return (
        <Grid container flexWrap="nowrap" columnGap={2}>
          <Grid item xs={12}>
            <Button
              disabled={isDisabled}
              variant="contained"
              color="secondary"
              onClick={() => handleConfirmTransaction(item)}
              endIcon={
                lastestLoadingConfirm.current.includes(
                  `${item.student_Id} ${item.class_Id}`
                ) && <CircularProgress color="secondary" size={20} />
              }
            >
              Xác Nhận
            </Button>
          </Grid>
        </Grid>
      );
    },
    [lastestLoadingConfirm.current]
  );

  const transactionData = useMemo(() => {
    const isFilter = Object.values(filter).some((item) => Boolean(item));
    const cloneTransactionList = _.cloneDeep(transactionList).map((item) =>
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
                  size="1.3rem"
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
                  size="1.3rem"
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
        filter.class_Name ? item.class_Name.includes(filter.class_Name) : true
      )
      .filter((item) =>
        filter.student_Name
          ? item.student_Name.includes(filter.student_Name)
          : true
      );
    return filterResult;
  }, [filter, transactionList, lastestLoadingConfirm.current]);

  useEffect(() => {
    getTransactionData();
  }, [userDetail?.user_Type]);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <CustomBox>
            <TransactionFilterComponent
              filter={filter}
              setFilter={setFilter}
              transactionList={transactionList}
            />
          </CustomBox>
          <CustomBox>
            <Grid container rowSpacing={2} sx={{ overflowX: "auto" }}>
              <Grid item xs={12}>
                <CustomTable
                  headers={headers}
                  data={transactionData}
                  title="Danh Sách Giao Dịch"
                />
              </Grid>
            </Grid>
          </CustomBox>
        </>
      )}
    </>
  );
};

export default TransactionComponent;
