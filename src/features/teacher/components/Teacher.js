import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Grid, IconButton } from "@mui/material";
import { IconInfoCircle } from "@tabler/icons";
import { useDispatch } from "react-redux";
import CustomBox from "../../../components/custom-box/CustomBox";
import _ from "lodash";
import CustomTable from "../../../components/custom-table/CustomTable";
import LoadingComponent from "../../../utils/component/Loading";
import TeacherFilterComponent from "./TeacherFilterComponent";
import { getListTeacherAction } from "../../../redux/teacher/operators";

export const initTeacherFilter = {
  teacher_Id: "",
  teacher_Name: "",
};



const TeacherComponent = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(_.cloneDeep(initTeacherFilter));
  const [teacherList, setTeacherList] = useState([]);

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
            teacher_Id: item.teacher_Id,
            teacher_Name: item.first_Name + " " + item.last_Name,
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
    const cloneTeacherList = _.cloneDeep(teacherList).map((item) => ({
      teacher_Id: item.teacher_Id,
      teacher_Name: item.teacher_Name,
      utility: <Utility />,
    }));
    if (!isFilter) {
      return cloneTeacherList;
    }
    let filterResult = cloneTeacherList
      .filter((item) =>
        filter.teacher_Id ? item.teacher_Id.includes(filter.teacher_Id) : true
      )
      .filter((item) =>
        filter.teacher_Name
          ? item.teacher_Name.includes(filter.teacher_Name)
          : true
      );
    return filterResult;
  }, [filter, teacherList]);

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
            <TeacherFilterComponent
              filter={filter}
              setFilter={setFilter}
              teacherList={teacherList}
            />
          </CustomBox>
          <CustomBox>
            <Grid container rowSpacing={2} sx={{ overflowX: "auto" }}>
              <Grid item xs={12}>
                <CustomTable
                  headers={["Id", "Tên Giảng Viên", "#"]}
                  data={teacherData}
                  title="Danh Sách Giảng Viên"
                />
              </Grid>
            </Grid>
          </CustomBox>
        </>
      )}
    </>
  );
};

export default TeacherComponent;
