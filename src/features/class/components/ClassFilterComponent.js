import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { initClassFilter } from "./Class";
import { NAME_TRANS_VN } from "../../../config/constant";
const ClassFilterComponent = ({ filter, setFilter, classList }) => {
  const [filterInput, setFilterInput] = useState(_.cloneDeep(initClassFilter));

  const handleApply = () => {
    setFilter(_.cloneDeep(filterInput));
  };

  const handleClear = () => {
    setFilter(_.cloneDeep(initClassFilter));
  };

  const optionsClassId = [
    ...new Set(
      _.cloneDeep(classList)
        .map((option) => option.class_Id)
    ),
  ];

  const optionsClassName = [
    ...new Set(
      _.cloneDeep(classList)
        .map((option) => option.class_Name)
    ),
  ];

  const optionsTeacher = [
    ...new Set(
      _.cloneDeep(classList)
        .map((option) => option.teacher_Name)
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
      <Grid item xs={12} md={3}>
        <Autocomplete
          freeSolo
          disableClearable
          options={optionsClassId}
          onChange={(event, newValue) => {
            setFilterInput({ ...filterInput, class_Id: newValue });
          }}
          value={filterInput.class_Id}
          onInputChange={(event) => {
            setFilterInput({
              ...filterInput,
              class_Id: event.target.value,
            });
          }}
          inputValue={filterInput.class_Id}
          renderInput={(params) => (
            <TextField
              {...params}
              label={NAME_TRANS_VN.ID}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Autocomplete
          freeSolo
          disableClearable
          options={optionsClassName}
          onChange={(event, newValue) => {
            setFilterInput({ ...filterInput, class_Name: newValue });
          }}
          value={filterInput.class_Name}
          onInputChange={(event) => {
            setFilterInput({
              ...filterInput,
              class_Name: event.target.value,
            });
          }}
          inputValue={filterInput.class_Name}
          renderInput={(params) => (
            <TextField
              {...params}
              label={NAME_TRANS_VN.CLASS_NAME}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Autocomplete
          freeSolo
          disableClearable
          options={optionsTeacher}
          onChange={(event, newValue) => {
            setFilterInput({ ...filterInput, teacher_Name: newValue });
          }}
          value={filterInput.teacher_Name}
          onInputChange={(event) => {
            setFilterInput({
              ...filterInput,
              teacher_Name: event.target.value,
            });
          }}
          inputValue={filterInput.teacher_Name}
          renderInput={(params) => (
            <TextField
              {...params}
              label={NAME_TRANS_VN.TEACHER}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={3}>
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
export default ClassFilterComponent;
