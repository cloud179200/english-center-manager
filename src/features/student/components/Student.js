import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Grid, IconButton } from "@mui/material";
import { IconInfoCircle } from "@tabler/icons";
import { useDispatch } from "react-redux";
import CustomBox from "../../../components/custom-box/CustomBox";
import _ from "lodash";
import CustomTable from "../../../components/custom-table/CustomTable";
import LoadingComponent from "../../../utils/component/Loading";
import StudentFilterComponent from "./StudentFilterComponent";
import { getListStudentAction } from '../../../redux/student/operators';

export const initStudentFilter = {
  student_Id: "",
  student_Name: "",
};


const StudentComponent = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(_.cloneDeep(initStudentFilter));
  const [studentList, setStudentList] = useState([]);

  const getTeacherData = () => {
    setLoading(true);
    dispatch(
      getListStudentAction((res, err) => {
        setLoading(false);
        if (err) {
          return;
        }
        setStudentList(
          res.map((item) => ({
            student_Id: item.student_Id,
            student_Name: item.first_Name + " " + item.last_Name,
          }))
        );
      })
    );
  };

  const Utility = useCallback(() => {
    return (
      <Grid container justifyContent="flex-end" flexWrap="nowrap" columnGap={2}>
        <Grid item>
          <IconButton color="primary">
            <IconInfoCircle
              strokeWidth={2}
              size="1.3rem"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            />
          </IconButton>
        </Grid>
      </Grid>
    );
  }, []);

  const teacherData = useMemo(() => {
    const isFilter = Object.values(filter).some((item) => Boolean(item));
    const cloneClassList = _.cloneDeep(studentList).map((item) => ({
      student_Id: item.student_Id,
      student_Name: item.student_Name,
      utility: <Utility />,
    }));
    if (!isFilter) {
      return cloneClassList;
    }
    let filterResult = cloneClassList
      .filter((item) =>
        filter.student_Id ? item.student_Id.includes(filter.student_Id) : true
      )
      .filter((item) =>
        filter.student_Name
          ? item.student_Name.includes(filter.student_Name)
          : true
      );
    return filterResult;
  }, [filter, studentList]);

  useEffect(() => {
    getTeacherData();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <CustomBox>
            <StudentFilterComponent
              filter={filter}
              setFilter={setFilter}
              studentList={studentList}
            />
          </CustomBox>
          <CustomBox>
            <Grid container rowSpacing={2} sx={{ overflowX: "auto" }}>
              <Grid item md={12}>
                <CustomTable
                  headers={["Id", "Tên Học Viên", "#"]}
                  data={teacherData}
                  title="Danh Sách Học Viên"
                />
              </Grid>
            </Grid>
          </CustomBox>
        </>
      )}
    </>
  );
};

export default StudentComponent;
