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
    ...new Set(
      _.cloneDeep(transactionList).map((option) => option.teacher_Name)
    ),
  ];

  const optionsTransactionDescription = [
    ...new Set(
      _.cloneDeep(transactionList).map((option) => option.student_Name)
    ),
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
            setFilterInput({ ...filterInput, teacher_Name: newValue });
          }}
          value={filterInput.teacher_Name}
          onInputChange={(event, newValue) => {
            setFilterInput({
              ...filterInput,
              teacher_Name: newValue,
            });
          }}
          inputValue={filterInput.teacher_Name}
          renderInput={(params) => (
            <TextField {...params} label={NAME_TRANS_VN.CLASS_NAME} />
          )}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Autocomplete
          freeSolo
          disableClearable
          options={optionsTransactionDescription}
          onChange={(event, newValue) => {
            setFilterInput({ ...filterInput, student_Name: newValue });
          }}
          value={filterInput.student_Name}
          onInputChange={(event, newValue) => {
            setFilterInput({
              ...filterInput,
              student_Name: newValue,
            });
          }}
          inputValue={filterInput.student_Name}
          renderInput={(params) => (
            <TextField {...params} label={NAME_TRANS_VN.STUDENT_NAME} />
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
              fullWidth
            >
              {NAME_TRANS_VN.APPLY_FILTER}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClear}
              fullWidth
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
