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
  Pagination,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomRow from "./CustomRow";

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
        <Grid item md={12}>
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
      <TableContainer sx={{ maxHeight: "60vh" }}>
        <Table
          sx={{
            backgroundColor: "#ffff",
          }}
        >
          <TableHead>
            <TableRow>
              {headers.map((item, index) => (
                <TableCell
                  key={item + index}
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
            {data.slice(page * 10 - 10, page * 10).map((row, id) => (
              <CustomRow key={row + page + id} rowData={row} index={id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>
          <Pagination
            sx={{ marginTop: "1rem" }}
            color="secondary"
            count={Math.round(data.length / 10)}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
    </>
  );
};

export default CustomTable;
