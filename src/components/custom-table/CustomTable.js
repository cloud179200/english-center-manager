import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";
import React from "react";
import { uniqueKey } from "../../utils";
import _ from "lodash";

const CustomTable = ({ data = [], headers = [], title = "" }) => {
  return (
    <>
      {title && (
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, mb: 1 }}>
          <Typography variant="h3" component="div">
            {title}
          </Typography>
        </Toolbar>
      )}
      <Divider />
      <TableContainer>
        <Table
          sx={{
            backgroundColor: "#ffff",
          }}
        >
          <TableHead>
            <TableRow>
              {headers.map((item, index) => (
                <TableCell key={uniqueKey()} align={index ? "right" : ""} sx={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              return (
                <TableRow
                  key={uniqueKey()}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {typeof row === "object" &&
                    Object.keys(_.cloneDeep(row)).map((key, index) => {
                      return (
                        <TableCell
                          key={uniqueKey()}
                          component={index === 0 ? "th" : ""}
                          scope={index === 0 ? "row" : ""}
                          align={index === 0 ? "" : "right"}
                        >
                          {row[key]}
                        </TableCell>
                      );
                    })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomTable;
