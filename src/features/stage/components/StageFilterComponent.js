import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import _ from "underscore";
import { initStageFilter } from "./Stage";
import { NAME_TRANS_VN } from "../../../config/constant";
const StageFilterComponent = ({ filter, setFilter, stages }) => {
  const [filterInput, setFilterInput] = useState(_.clone(initStageFilter));

  const handleApply = () => {
    setFilter(_.clone(filterInput));
  };

  const handleClear = () => {
    setFilter(_.clone(initStageFilter));
  };

  const optionsStageId = [
    ...new Set(_.clone(stages).map((option) => option.stage_Id)),
  ];

  const optionsStageName = [
    ...new Set(_.clone(stages).map((option) => option.stage_Name)),
  ];

  useEffect(() => {
    setFilterInput(_.clone(filter));
  }, [filter]);

  return (
    <Grid
      container
      width="100%"
      columnSpacing={{ xs: 0, md: 2 }}
      rowSpacing={{ xs: 2, md: 2 }}
      m={0}
    >
      <Grid item xs={12} md={6}>
        <Autocomplete
          freeSolo
          disableClearable
          options={optionsStageId}
          onChange={(event, newValue) => {
            setFilterInput({ ...filterInput, stage_Id: newValue });
          }}
          value={filterInput.stage_Id}
          inputValue={filterInput.stage_Id}
          onInputChange={(event, newValue) => {
            setFilterInput({
              ...filterInput,
              stage_Id: newValue,
            });
          }}
          renderInput={(params) => (
            <TextField {...params} label={NAME_TRANS_VN.ID} />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Autocomplete
          freeSolo
          disableClearable
          options={optionsStageName}
          onChange={(event, newValue) => {
            setFilterInput({ ...filterInput, stage_Name: newValue });
          }}
          value={filterInput.stage_Name}
          onInputChange={(event, newValue) => {
            setFilterInput({
              ...filterInput,
              stage_Name: newValue,
            });
          }}
          inputValue={filterInput.stage_Name}
          renderInput={(params) => (
            <TextField {...params} label={NAME_TRANS_VN.STAGE_NAME} />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Button variant="contained" onClick={handleApply} fullWidth>
          {NAME_TRANS_VN.APPLY_FILTER}
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
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
  );
};
export default StageFilterComponent;
