import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { initTeacherFilter } from "./Teacher";
import { NAME_TRANS_VN } from "../../../config/constant";
const ClassFilterComponent = ({ filter, setFilter, teacherList }) => {
  const [filterInput, setFilterInput] = useState(
    _.cloneDeep(initTeacherFilter)
  );

  const handleApply = () => {
    setFilter(_.cloneDeep(filterInput));
  };

  const handleClear = () => {
    setFilter(_.cloneDeep(initTeacherFilter));
  };

  const optionsTeacherId = [
    ...new Set(_.cloneDeep(teacherList).map((option) => option.teacher_Id)),
  ];

  const optionsTeacher = [
    ...new Set(_.cloneDeep(teacherList).map((option) => option.teacher_Name)),
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
            setFilterInput({ ...filterInput, teacher_Id: newValue });
          }}
          value={filterInput.teacher_Id}
          onInputChange={(event) => {
            setFilterInput({
              ...filterInput,
              teacher_Id: event.target.value,
            });
          }}
          inputValue={filterInput.teacher_Id}
          renderInput={(params) => (
            <TextField {...params} label={NAME_TRANS_VN.ID} />
          )}
        />
      </Grid>
      <Grid item xs={12} md={4}>
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
            <TextField {...params} label={NAME_TRANS_VN.TEACHER} />
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
export default ClassFilterComponent;
