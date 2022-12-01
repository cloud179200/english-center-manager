import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { initStudentFilter } from "./Student";
import { NAME_TRANS_VN } from "../../../config/constant";
const StudentFilterComponent = ({ filter, setFilter, studentList }) => {
  const [filterInput, setFilterInput] = useState(
    _.cloneDeep(initStudentFilter)
  );

  const handleApply = () => {
    setFilter(_.cloneDeep(filterInput));
  };

  const handleClear = () => {
    setFilter(_.cloneDeep(initStudentFilter));
  };

  const optionsTeacherId = [
    ...new Set(_.cloneDeep(studentList).map((option) => option.student_Id)),
  ];

  const optionsTeacher = [
    ...new Set(_.cloneDeep(studentList).map((option) => option.student_Name)),
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
            setFilterInput({ ...filterInput, student_Id: newValue });
          }}
          value={filterInput.student_Id}
          onInputChange={(event) => {
            setFilterInput({
              ...filterInput,
              student_Id: event.target.value,
            });
          }}
          inputValue={filterInput.student_Id}
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
            setFilterInput({ ...filterInput, student_Name: newValue });
          }}
          value={filterInput.student_Name}
          onInputChange={(event) => {
            setFilterInput({
              ...filterInput,
              student_Name: event.target.value,
            });
          }}
          inputValue={filterInput.student_Name}
          renderInput={(params) => (
            <TextField {...params} label={NAME_TRANS_VN.STUDENT} />
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
export default StudentFilterComponent;
