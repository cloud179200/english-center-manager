import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Grid, IconButton, Tooltip, useTheme } from "@mui/material";
import {
  IconClockHour3,
  IconCurrencyDong,
  IconInfoCircle,
} from "@tabler/icons";
import { useDispatch } from "react-redux";
import CustomBox from "../../../components/custom-box/CustomBox";
import _ from "lodash";
import CustomTable from "../../../components/custom-table/CustomTable";
import LoadingComponent from "../../../utils/component/Loading";
import TransactionFilterComponent from "./TransactionFilterComponent";
import { getListTeacherAction } from "../../../redux/teacher/operators";
import transactionMockData from "../../../config/data/transaction-mock-data.json";
export const initTransactionFilter = {
  transaction_Id: "",
  transaction_Description: "",
};

const TransactionComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(_.cloneDeep(initTransactionFilter));
  const [transactionList, setTranactionList] = useState([]);

  const getTransactionData = () => {
    setLoading(true);
    dispatch(
      getListTeacherAction((res, err) => {
        setLoading(false);
        setTranactionList(_.cloneDeep(transactionMockData));
        return;
        if (err) {
          return;
        }
        setTranactionList(
          res.map((item) => ({
            transaction_Id: item.transaction_Id,
            transaction_Description: item.first_Name + " " + item.last_Name,
          }))
        );
      })
    );
  };

  const Utility = useCallback((props) => {
    return (
      <Grid container justifyContent="flex-end" flexWrap="nowrap" columnGap={2}>
        <Grid item>
          {props?.item?.transaction_Status ? (
            <Tooltip title="Fullfilled">
              <IconButton color="warning">
                <IconInfoCircle
                  strokeWidth={2}
                  size="1.3rem"
                  style={{ marginTop: "auto", marginBottom: "auto" }}
                />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Pending">
              <IconButton color="primary">
                <IconClockHour3
                  strokeWidth={2}
                  size="1.3rem"
                  style={{ marginTop: "auto", marginBottom: "auto" }}
                />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
      </Grid>
    );
  }, []);

  const transactionData = useMemo(() => {
    const isFilter = Object.values(filter).some((item) => Boolean(item));
    const cloneTransactionList = _.cloneDeep(transactionList).map((item) => ({
      transaction_Id: item.transaction_Id,
      transaction_Description: item.transaction_Description,
      transaction_Total: (
        <>
          {item.transaction_Total}
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
    }));
    if (!isFilter) {
      return cloneTransactionList;
    }
    let filterResult = cloneTransactionList
      .filter((item) =>
        filter.transaction_Id
          ? item.transaction_Id.includes(filter.transaction_Id)
          : true
      )
      .filter((item) =>
        filter.transaction_Description
          ? item.transaction_Description.includes(
              filter.transaction_Description
            )
          : true
      );
    return filterResult;
  }, [filter, transactionList]);

  useEffect(() => {
    getTransactionData();
  }, []);

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
              <Grid item md={12}>
                <CustomTable
                  headers={["Id", "Ghi Chú", "Số Tiền", "Trạng Thái"]}
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
