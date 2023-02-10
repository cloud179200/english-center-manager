import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import _ from "underscore";
import { initPayrollFilter } from "./Teacher";
import { NAME_TRANS_VN } from "../../../config/constant";
const PayrollFilterComponent = ({ filter, setFilter, payrollList }) => {
  const [filterInput, setFilterInput] = useState(
    _.clone(initPayrollFilter)
  );

  const handleApply = () => {
    setFilter(_.clone(filterInput));
  };

  const handleClear = () => {
    setFilter(_.clone(initPayrollFilter));
  };

  const optionsPayrollId = [
    ...new Set(_.clone(payrollList).map((option) => option.payroll_Id)),
  ];

  const optionsPayroll = [
    ...new Set(_.clone(payrollList).map((option) => option.payroll_Name)),
  ];

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
          options={optionsPayrollId}
          onChange={(event, newValue) => {
            setFilterInput({ ...filterInput, payroll_Id: newValue });
          }}
          value={filterInput.payroll_Id}
          onInputChange={(event, newValue) => {
            setFilterInput({
              ...filterInput,
              payroll_Id: newValue,
            });
          }}
          inputValue={filterInput.payroll_Id}
          renderInput={(params) => (
            <TextField {...params} label={NAME_TRANS_VN.ID} />
          )}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Autocomplete
          freeSolo
          disableClearable
          options={optionsPayroll}
          onChange={(event, newValue) => {
            setFilterInput({ ...filterInput, payroll_Name: newValue });
          }}
          value={filterInput.payroll_Name}
          onInputChange={(event, newValue) => {
            setFilterInput({
              ...filterInput,
              payroll_Name: newValue,
            });
          }}
          inputValue={filterInput.payroll_Name}
          renderInput={(params) => (
            <TextField {...params} label={NAME_TRANS_VN.PAYROLL} />
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
export default PayrollFilterComponent;
