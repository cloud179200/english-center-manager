import React, { memo } from "react";
import { TableRow, TableCell, Fade } from "@mui/material";
import _ from "lodash";

const CustomRow = ({ rowData, index }) => {
  return (
    <Fade in={true} style={{ transitionDelay: `${index * 40}ms` }}>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        {typeof rowData === "object" &&
          Object.keys(_.cloneDeep(rowData)).map((key, id) => {
            return (
              <TableCell
                key={rowData + key + id}
                component={id === 0 ? "th" : ""}
                scope={id === 0 ? "row" : ""}
                align={id === 0 ? "inherit" : "right"}
              >
                {rowData[key]}
              </TableCell>
            );
          })}
      </TableRow>
    </Fade>
  );
};

export default memo(CustomRow);
