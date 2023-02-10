import { Menu, MenuItem } from "@mui/material";
import React from "react";
import _ from "underscore";
const TeacherSelectPayrollMenu = (props) => {
  const {
    anchorEl,
    openMenu,
    teacherObject,
    handleClose,
    handleSelect,
    payrolls,
  } = props;

  const handleSelectPayroll = (item) => {
    handleSelect(teacherObject, item);
    handleClose();
  };
  console.log("[TeacherSelectPayroll.js]", teacherObject);
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
      {_.clone(payrolls).map((item) => (
        <MenuItem
          key={
            item.payroll_Id + "-" + item.payroll_Name + "-" + item.payroll_Value
          }
          onClick={() => handleSelectPayroll(_.clone(item))}
        >
          {`${item.payroll_Id} - ${item.payroll_Name} - ${item.payroll_Value}`}
        </MenuItem>
      ))}
    </Menu>
  );
};
export default TeacherSelectPayrollMenu;
