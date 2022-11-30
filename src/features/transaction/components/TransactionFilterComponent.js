import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { initTransactionFilter } from "./Transaction";
import { NAME_TRANS_VN } from "../../../config/constant";
const TransactionFilterComponent = ({ filter, setFilter, transactionList }) => {
  const [filterInput, setFilterInput] = useState(
    _.cloneDeep(initTransactionFilter)
  );

  const handleApply = () => {
    setFilter(_.cloneDeep(filterInput));
  };

  const handleClear = () => {
    setFilter(_.cloneDeep(initTransactionFilter));
  };

  const optionsTeacherId = [
    ...new Set(_.cloneDeep(transactionList).map((option) => option.transaction_Id)),
  ];

  const optionsTransactionDescription = [
    ...new Set(_.cloneDeep(transactionList).map((option) => option.transaction_Description)),
  ];

  useEffect(() => {
    setFilterInput(_.cloneDeep(filter));
  }, [filter]);

  return (
    <Grid
      container
      width="100%"
      columnSpacing={{ xs: 0, md: 2 }}
      rowSpacing={{ xs: 2, md: 0 }}
      m={0}
    >
      <Grid item xs={12} md={4}>
        <Autocomplete
          freeSolo
          disableClearable
          options={optionsTeacherId}
          onChange={(event, newValue) => {
            setFilterInput({ ...filterInput, transaction_Id: newValue });
          }}
          value={filterInput.transaction_Id}
          onInputChange={(event) => {
            setFilterInput({
              ...filterInput,
              transaction_Id: event.target.value,
            });
          }}
          inputValue={filterInput.transaction_Id}
          renderInput={(params) => (
            <TextField {...params} label={NAME_TRANS_VN.ID} />
          )}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Autocomplete
          freeSolo
          disableClearable
          options={optionsTransactionDescription}
          onChange={(event, newValue) => {
            setFilterInput({ ...filterInput, transaction_Description: newValue });
          }}
          value={filterInput.transaction_Description}
          onInputChange={(event) => {
            setFilterInput({
              ...filterInput,
              transaction_Description: event.target.value,
            });
          }}
          inputValue={filterInput.transaction_Description}
          renderInput={(params) => (
            <TextField {...params} label={NAME_TRANS_VN.DESCRIPTION} />
          )}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid
          container
          width="100%"
          columnGap={1}
          flexWrap="nowrap"
          justifyContent={{ md: "flex-end", xs: "space-between" }}
        >
          <Grid item xs={6}>
            <Button
              variant="contained"
              onClick={handleApply}
              sx={{ width: "100%" }}
            >
              {NAME_TRANS_VN.APPLY_FILTER}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClear}
              sx={{ width: "100%" }}
            >
              {NAME_TRANS_VN.CLEAR_FILTER}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default TransactionFilterComponent;
