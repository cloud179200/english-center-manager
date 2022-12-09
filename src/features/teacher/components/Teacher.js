import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Grid, IconButton } from "@mui/material";
import { IconInfoCircle, IconTrash } from "@tabler/icons";
import { useDispatch } from "react-redux";
import CustomBox from "../../../components/custom-box/CustomBox";
import _ from "lodash";
import CustomTable from "../../../components/custom-table/CustomTable";
import LoadingComponent from "../../../utils/component/Loading";
import TeacherFilterComponent from "./TeacherFilterComponent";
import { getListTeacherAction } from "../../../redux/teacher/operators";
import TeacherInfoModal from "./TeacherInfoModal";
import TeacherDeleteModal from "./TeacherDeleteModal";

export const initTeacherFilter = {
  teacher_Id: "",
  teacher_Name: "",
};

const TeacherComponent = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(_.cloneDeep(initTeacherFilter));
  const [teacherList, setTeacherList] = useState([]);
  const [deleteTeacherObject, setDeleteTeacherObject] = useState(null);
  const [infoTeacherObject, setInfoTeacherObject] = useState(null);

  const handleCloseDeleteTeacherModal = () => {
    setDeleteTeacherObject(null);
  };

  const handleCloseInfoTeacherModal = () => {
    setInfoTeacherObject(null);
  };

  const reloadTeacherData = () => {
    getTeacherData();
  };

  const getTeacherData = () => {
    setLoading(true);
    dispatch(
      getListTeacherAction((res, err) => {
        setLoading(false);
        if (err) {
          return;
        }
        setTeacherList(
          res.map((item) => ({
            ...item,
            teacher_Id: item.teacher_Id,
            teacher_Name: item.first_Name + " " + item.last_Name,
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
            onClick={() => setInfoTeacherObject(_.cloneDeep(item))}
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
            onClick={() => setDeleteTeacherObject(_.cloneDeep(item))}
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

  const teacherData = useMemo(() => {
    const isFilter = Object.values(filter).some((item) => Boolean(item));
    const cloneTeacherList = _.cloneDeep(teacherList).map((item) => ({
      teacher_Id: item.teacher_Id,
      teacher_Name: item.teacher_Name,
      utility: <Utility item={item} />,
    }));
    if (!isFilter) {
      return cloneTeacherList;
    }
    let filterResult = cloneTeacherList
      .filter((item) =>
        filter.teacher_Id
          ? item.teacher_Id.toString().includes(filter.teacher_Id)
          : true
      )
      .filter((item) =>
        filter.teacher_Name
          ? item.teacher_Name
              .toLowerCase()
              .includes(filter.teacher_Name.toLowerCase())
          : true
      );
    return filterResult;
  }, [filter, teacherList]);

  useEffect(() => {
    getTeacherData();
  }, []);

  return (
    <>
      <TeacherInfoModal
        teacherObject={infoTeacherObject}
        open={Boolean(infoTeacherObject)}
        handleClose={handleCloseInfoTeacherModal}
      />
      <TeacherDeleteModal
        studentObject={deleteTeacherObject}
        open={Boolean(deleteTeacherObject)}
        handleClose={handleCloseDeleteTeacherModal}
        reloadTeacherData={reloadTeacherData}
      />
      <CustomBox>
        <TeacherFilterComponent
          filter={filter}
          setFilter={setFilter}
          teacherList={teacherList}
        />
      </CustomBox>
      <CustomBox>
        <Grid container rowSpacing={2} sx={{ overflowX: "auto" }}>
          {loading ? (
            <LoadingComponent />
          ) : (
            <Grid item xs={12}>
              <CustomTable
                headers={["Id", "Tên Giảng Viên", "#"]}
                data={teacherData}
                title="Danh Sách Giảng Viên"
              />
            </Grid>
          )}
        </Grid>
      </CustomBox>
    </>
  );
};

export default TeacherComponent;
