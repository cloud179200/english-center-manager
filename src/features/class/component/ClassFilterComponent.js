import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { initClassFilter } from "./Class";
const ClassFilterComponent = ({ filter, setFilter, classList }) => {
  const [filterInput, setFilterInput] = useState(_.cloneDeep(initClassFilter));

  const handleApply = () => {
    setFilter(_.cloneDeep(filterInput));
    console.log("[filterInput]", filterInput);
  };

  const handleClear = () => {
    setFilter(_.cloneDeep(initClassFilter));
  };

  const optionsClassId = [
    ...new Set(
      _.cloneDeep(classList)
        .map((option) => option.class_Id)
        .filter((item) =>
          item.toLowerCase().includes(filterInput.class_Id.toLowerCase())
        )
    ),
  ];

  const optionsClassName = [
    ...new Set(
      _.cloneDeep(classList)
        .map((option) => option.class_Name)
        .filter((item) =>
          item.toLowerCase().includes(filterInput.class_Name.toLowerCase())
        )
    ),
  ];

  const optionsTeacher = [
    ...new Set(
      _.cloneDeep(classList)
        .map((option) => option.teacher)
        .filter((item) =>
          item.toLowerCase().includes(filterInput.teacher.toLowerCase())
        )
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
          renderInput={(params) => (
            <TextField
              {...params}
              label="Id"
              InputProps={{
                ...params.InputProps,
                type: "search",
                value: filterInput.class_Id,
                onChange: (event) => {
                  setFilterInput({
                    ...filterInput,
                    class_Id: event.target.value,
                  });
                },
              }}
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
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tên Lớp"
              InputProps={{
                ...params.InputProps,
                type: "search",
                value: filterInput.class_Name,
                onChange: (event) => {
                  setFilterInput({
                    ...filterInput,
                    class_Name: event.target.value,
                  });
                },
              }}
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
            setFilterInput({ ...filterInput, teacher: newValue });
          }}
          value={filterInput.teacher}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Giảng Viên"
              InputProps={{
                ...params.InputProps,
                type: "search",
                value: filterInput.teacher,
                onChange: (event) => {
                  setFilterInput({
                    ...filterInput,
                    teacher: event.target.value,
                  });
                },
              }}
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
              sx={{ width: "100%" }}
            >
              Apply
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClear}
              sx={{ width: "100%" }}
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
