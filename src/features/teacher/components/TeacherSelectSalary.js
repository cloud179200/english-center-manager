import { Menu, MenuItem } from "@mui/material";
import React from "react";
import salaryMockData from "../../../config/data/salary-mock-data.json";
import _ from "lodash";
const TeacherSelectSalaryMenu = (props) => {
  const { anchorEl, openMenu, teacherObject, handleClose, handleSelect } =
    props;

  const handleSelectSalary = (item) => {
    handleSelect(teacherObject, item);
    handleClose();
  };
  console.log("[TeacherSelectSalary.js]", teacherObject);
  return (
    <Menu
      anchorEl={anchorEl}
      open={openMenu}
      PaperProps={{
        style: {
          maxHeight: "70vh",
          maxWidth: "100vw",
        },
      }}
      onClose={handleClose}
    >
      {_.cloneDeep(salaryMockData)
        .slice(0, 100)
        .map((item) => (
          <MenuItem
            key={
              item.salary_Id + "-" + item.salary_Level + "-" + item.salary_Name
            }
            onClick={() => handleSelectSalary(_.cloneDeep(item))}
          >
            {`${item.salary_Name} - ${item.salary_Level}`}
          </MenuItem>
        ))}
    </Menu>
  );
};
export default TeacherSelectSalaryMenu;
