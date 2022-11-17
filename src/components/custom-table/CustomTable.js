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
  Grid,
  TableFooter,
  Pagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { uniqueKey } from "../../utils";
import _ from "lodash";

const CustomTable = ({ data = [], headers = [], title = "" }) => {
  const [page, setPage] = useState(1);

  const handlePageChange = (_, p) => {
    setPage(p);
  };

  useEffect(() => {
    setPage(1);
  }, [data]);

  if (!data.length) {
    return (
      <Grid container>
        <Grid item md="12">
          <Typography variant="h3" align="center" mb={2} mt={2}>
            Không có dữ liệu để hiển thị
          </Typography>
        </Grid>
      </Grid>
    );
  }
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
                <TableCell
                  key={uniqueKey()}
                  align={index ? "right" : "inherit"}
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                  }}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * 10 - 10, page * 10).map((row) => {
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
                          align={index === 0 ? "inherit" : "right"}
                        >
                          {row[key]}
                        </TableCell>
                      );
                    })}
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <Pagination
              sx={{ marginTop: "1rem" }}
              color="secondary"
              count={Math.round(data.length / 10)}
              page={page}
              onChange={handlePageChange}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomTable;