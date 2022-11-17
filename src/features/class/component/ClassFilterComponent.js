import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { initClassFilter } from "./Class";
const ClassFilterComponent = ({ filter, setFilter, classList }) => {
  const [filterInput, setFilterInput] = useState(_.cloneDeep(initClassFilter));

  const handleApply = () => {
    setFilter(_.cloneDeep(filterInput));
  };

  const handleClear = () => {
    setFilter(_.cloneDeep(initClassFilter));
  };

  const optionClassId = [
    ...new Set(
      classList
        .map((option) => option.class_Id)
        .filter((item) => item.toLowerCase().includes(filter.class_Id))
    ),
  ];

  const optionClassName = [
    ...new Set(
      classList
        .map((option) => option.class_Name)
        .filter((item) => item.toLowerCase().includes(filter.class_Name))
    ),
  ];

  const optionTeacher = [
    ...new Set(
      classList
        .map((option) => option.teacher)
        .filter((item) => item.toLowerCase().includes(filter.teacher))
    ),
  ];

  useEffect(() => {
    setFilterInput(_.cloneDeep(filter));
  }, [filter]);

  return (
    <Grid container width="100%" columnSpacing={2} m={0}>
      <Grid item md="3" pt={0}>
        <Autocomplete
          freeSolo
          disableClearable
          options={optionClassId}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Id"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
              onChange={(event) => {
                setFilterInput({ ...filter, class_Id: event.target.value });
              }}
            />
          )}
        />
      </Grid>
      <Grid item md="3">
        <Autocomplete
          freeSolo
          disableClearable
          options={optionClassName}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tên Lớp"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
              onChange={(event) => {
                setFilterInput({ ...filter, class_Name: event.target.value });
              }}
            />
          )}
        />
      </Grid>
      <Grid item md="3">
        <Autocomplete
          freeSolo
          disableClearable
          options={optionTeacher}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Giảng Viên"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
              onChange={(event) => {
                setFilterInput({ ...filter, teacher: event.target.value });
              }}
            />
          )}
        />
      </Grid>
      <Grid item md="3">
        <Grid container columnGap={1} justifyContent="flex-end">
          <Grid item>
            <Button variant="contained" size="small" onClick={handleApply}>
              Apply
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={handleClear}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ClassFilterComponent;
