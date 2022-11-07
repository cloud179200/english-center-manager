import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import * as icons from "@tabler/icons";
import { useDispatch } from "react-redux";
import { getClassAction } from "../../../redux/class/operators";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];
const ClassComponent = () => {
  const dispatch = useDispatch();
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    dispatch(
      getClassAction((res, err) => {
        if (err) {
          return;
        }
        setClassList(res);
      })
    );
  }, []);
  return (
    <Grid container width="100%" rowSpacing={2}>
      <Grid item md="12">
        <Button variant="contained" color="secondary">
          New {icons.IconPlus}
        </Button>
      </Grid>

      <Grid item md="12">
        <Table
          sx={{
            backgroundColor: "#ffff",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Tên Lớp</TableCell>
              <TableCell align="right">Sĩ Số</TableCell>
              <TableCell align="right">Giảng Viên</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classList.map((row) => (
              <TableRow
                key={row.class_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.class_Id}
                </TableCell>
                <TableCell align="right">{row.total_Name}</TableCell>
                <TableCell align="right">{row.total_Student}</TableCell>
                <TableCell align="right">{row.teacher}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default ClassComponent;
