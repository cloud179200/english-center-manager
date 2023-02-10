import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import _ from "underscore";
import { initTransactionTeacherFilter } from "./Transaction";
import { NAME_TRANS_VN } from "../../../config/constant";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

const TransactionFilterTeacherComponent = ({
  filter,
  setFilter,
  transactionList,
}) => {
  const [filterInput, setFilterInput] = useState(
    _.clone(initTransactionTeacherFilter)
  );

  const handleApply = () => {
    setFilter(_.clone(filterInput));
  };

  const handleClear = () => {
    setFilter(_.clone(initTransactionTeacherFilter));
  };

  const optionsTeacherName = [
    ...new Set(
      _.clone(transactionList).map((option) => `${option.class_Name}`)
    ),
  ];

  const handleChangeTeacherSelectedMonth = (newValue) => {
    setFilterInput((prevFilterInput) => ({
      ...prevFilterInput,
      selected_Month: newValue,
    }));
  };

  useEffect(() => {
    setFilterInput(_.clone(filter));
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
          options={optionsTeacherName}
          onChange={(event, newValue) => {
            setFilterInput({ ...filterInput, class_Name: newValue });
          }}
          value={filterInput.class_Name}
          onInputChange={(event, newValue) => {
            setFilterInput({
              ...filterInput,
              class_Name: newValue,
            });
          }}
          inputValue={filterInput.class_Name}
          renderInput={(params) => (
            <TextField {...params} label={NAME_TRANS_VN.CLASS_NAME} />
          )}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DesktopDatePicker
            label="Tháng/Năm"
            inputFormat="MM/YYYY"
            value={filterInput.selected_Month}
            onChange={handleChangeTeacherSelectedMonth}
            maxDate={moment().toDate()}
            renderInput={(params) => <TextField {...params} fullWidth/>}
          />
        </LocalizationProvider>
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
            <Button variant="contained" onClick={handleApply} fullWidth>
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
export default TransactionFilterTeacherComponent;
