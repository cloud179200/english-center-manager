import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Grid, IconButton } from "@mui/material";
import { IconInfoCircle, IconTrash } from "@tabler/icons";
import { useDispatch } from "react-redux";
import CustomBox from "../../../components/custom-box/CustomBox";
import _ from "lodash";
import CustomTable from "../../../components/custom-table/CustomTable";
import LoadingComponent from "../../../utils/component/Loading";
import StudentFilterComponent from "./StudentFilterComponent";
import { getListStudentAction } from "../../../redux/student/operators";
import StudentDeleteModal from "./StudentDeleteModal";
import StudentInfoModal from "./StudentInfoModal";

export const initStudentFilter = {
  student_Id: "",
  student_Name: "",
};

const StudentComponent = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(_.cloneDeep(initStudentFilter));
  const [students, setStudents] = useState([]);
  const [deleteStudentObject, setDeleteStudentObject] = useState(null);
  const [infoStudentObject, setInfoStudentObject] = useState(null);

  const reloadStudentData = () => {
    getStudentData();
  };

  const handleCloseDeleteStudentModal = () => {
    setDeleteStudentObject(null);
  };

  const handleCloseInfoStudentModal = () => {
    setInfoStudentObject(null);
  };

  const getStudentData = () => {
    setLoading(true);
    dispatch(
      getListStudentAction((res, err) => {
        setLoading(false);
        if (err) {
          return;
        }
        setStudents(
          res.map((item) => ({
            ...item,
            student_Id: item.student_Id,
            student_Name: item.first_Name + " " + item.last_Name,
          }))
        );
      })
    );
  };

  const Utility = useCallback(({ item }) => {
    return (
      <Grid container justifyContent="flex-end" flexWrap="nowrap" columnGap={2}>
        <Grid item>
          <IconButton
            color="primary"
            onClick={() => setInfoStudentObject(_.cloneDeep(item))}
          >
            <IconInfoCircle
              strokeWidth={2}
              size="1.5rem"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            />
          </IconButton>
        </Grid>

        <Grid item>
          <IconButton
            color="error"
            onClick={() => setDeleteStudentObject(_.cloneDeep(item))}
          >
            <IconTrash
              strokeWidth={2}
              size="1.5rem"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            />
          </IconButton>
        </Grid>
      </Grid>
    );
  }, []);

  const studentData = useMemo(() => {
    const isFilter = Object.values(filter).some((item) => Boolean(item));
    const cloneStudentList = _.cloneDeep(students).map((item) => ({
      student_Id: item.student_Id,
      student_Name: item.student_Name,
      created_Date: item.created_Date,
      utility: <Utility item={item} />,
    }));
    if (!isFilter) {
      return cloneStudentList;
    }
    let filterResult = cloneStudentList
      .filter((item) =>
        filter.student_Id
          ? item.student_Id.toString().includes(filter.student_Id)
          : true
      )
      .filter((item) =>
        filter.student_Name
          ? item.student_Name
              .toLowerCase()
              .includes(filter.student_Name.toLowerCase())
          : true
      );
    return filterResult;
  }, [filter, students]);

  useEffect(() => {
    getStudentData();
  }, []);

  return (
    <>
      <StudentInfoModal
        studentObject={infoStudentObject}
        open={Boolean(infoStudentObject)}
        handleClose={handleCloseInfoStudentModal}
      />
      <StudentDeleteModal
        studentObject={deleteStudentObject}
        open={Boolean(deleteStudentObject)}
        handleClose={handleCloseDeleteStudentModal}
        reloadStudentData={reloadStudentData}
      />
      <CustomBox>
        <StudentFilterComponent
          filter={filter}
          setFilter={setFilter}
          studentList={students}
        />
      </CustomBox>
      <CustomBox>
        <Grid container rowSpacing={2} sx={{ overflowX: "auto" }}>
          {loading ? (
            <LoadingComponent />
          ) : (
            <Grid item xs={12}>
              <CustomTable
                headers={["Id", "Tên Học Viên", "Ngày Tạo", "#"]}
                data={studentData}
                title="Danh Sách Học Viên"
              />
            </Grid>
          )}
        </Grid>
      </CustomBox>
    </>
  );
};

export default StudentComponent;
