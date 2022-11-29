import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Grid, IconButton } from "@mui/material";
import { IconPlus, IconTrash, IconEdit } from "@tabler/icons";
import { useDispatch, useSelector } from "react-redux";
import { getClassAction } from "../../../redux/class/operators";
import CustomBox from "../../../components/custom-box/CustomBox";
import _ from "lodash";
import CustomTable from "../../../components/custom-table/CustomTable";
import LoadingComponent from "../../../utils/component/Loading";
import ClassAddModal from "./ClassAddModal";
import ClassFilterComponent from "./ClassFilterComponent";
// import classMockData from "../../../config/data/class-mock-data.json";
import { NAME_TRANS_VN } from "../../../config/constant";
import ClassEditModal from "./ClassEditModal";
import ClassDeleteModal from "./ClassDeleteModal";
// const rows = _.cloneDeep(classMockData);

export const initClassFilter = {
  class_Id: "",
  class_Name: "",
  teacher_Name: "",
};

const ClassComponent = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.common.loading);
  const [filter, setFilter] = useState(_.cloneDeep(initClassFilter));
  const [classList, setClassList] = useState([]);
  const [openAddClassModal, setOpenAddClassModal] = useState(false);
  const [editClassObject, setEditClassObject] = useState(null);
  const [deleteClassObject, setDeleteClassObject] = useState(null);

  const handleCloseAddClassModal = () => {
    setOpenAddClassModal(false);
  };

  const handleOpenAddClassModal = () => {
    setOpenAddClassModal(true);
  };

  const handleCloseEditClassModal = () => {
    setEditClassObject(null);
  };

  const handleCloseDeleteClassModal = () => {
    setDeleteClassObject(null);
  };

  const getClassData = () => {
    dispatch(
      getClassAction((res, err) => {
        if (err) {
          return;
        }
        setClassList(
          res.map((item) => ({
            class_Id: item.class_Id,
            class_Name: item.class_Name,
            total: item.list_Student.length,
            teacher_Name:
              item.list_Teacher[0].first_Name +
              " " +
              item.list_Teacher[0].last_Name,
            class_Fee: item.class_Fee,
            teacher_Id: item.list_Teacher[0].teacher_Id,
            list_Student: item.list_Student.map((i) => ({
              student_Id: i.student_Id,
              student_Name: i.first_Name + " " + i.last_Name,
            })),
          }))
        );
      })
    );
  };

  const reloadClassData = () => {
    getClassData();
  };
  const Utility = useCallback(({ item }) => {
    return (
      <Grid container justifyContent="flex-end" flexWrap="nowrap" columnGap={2}>
        <Grid item>
          <IconButton onClick={() => setEditClassObject(_.cloneDeep(item))}>
            <IconEdit
              strokeWidth={1.5}
              size="1.3rem"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            onClick={() => setDeleteClassObject(_.cloneDeep(item))}
            color="error"
          >
            <IconTrash
              strokeWidth={1.5}
              size="1.3rem"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            />
          </IconButton>
        </Grid>
      </Grid>
    );
  }, []);

  const classData = useMemo(() => {
    const isFilter = Object.values(filter).some((item) => Boolean(item));
    const cloneClassList = _.cloneDeep(classList).map((item) => ({
      class_Id: item.class_Id,
      class_Name: item.class_Name,
      total: item.total,
      teacher_Name: item.teacher_Name,
      class_Fee: item.class_Fee,
      utility: <Utility item={item} />,
    }));
    if (!isFilter) {
      return cloneClassList;
    }
    let filterResult = cloneClassList
      .filter((item) =>
        filter.class_Id ? item.class_Id.includes(filter.class_Id) : true
      )
      .filter((item) =>
        filter.class_Name ? item.class_Name.includes(filter.class_Name) : true
      )
      .filter((item) =>
        filter.teacher_Name
          ? item.teacher_Name.includes(filter.teacher_Name)
          : true
      );
    return filterResult;
  }, [filter, classList]);

  useEffect(() => {
    getClassData();
  }, []);

  return (
    <>
      <ClassDeleteModal
        classObject={deleteClassObject}
        open={Boolean(deleteClassObject)}
        handleClose={handleCloseDeleteClassModal}
        reloadClassData={reloadClassData}
      />
      <ClassEditModal
        classObject={editClassObject}
        open={Boolean(editClassObject)}
        handleClose={handleCloseEditClassModal}
        reloadClassData={reloadClassData}
      />
      <ClassAddModal
        open={openAddClassModal}
        handleClose={handleCloseAddClassModal}
        reloadClassData={reloadClassData}
      />
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <CustomBox>
            <ClassFilterComponent
              filter={filter}
              setFilter={setFilter}
              classList={classList}
            />
          </CustomBox>
          <CustomBox>
            <Grid container rowSpacing={2} sx={{ overflowX: "auto" }}>
              <Grid item xs={12} md={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  endIcon={
                    <IconPlus
                      stroke={1.5}
                      size="2rem"
                      style={{ marginTop: "auto", marginBottom: "auto" }}
                    />
                  }
                  onClick={handleOpenAddClassModal}
                  sx={{
                    width: "100%",
                  }}
                >
                  {NAME_TRANS_VN.CLASS_NEW}
                </Button>
              </Grid>
              <Grid item md={12}>
                <CustomTable
                  headers={[
                    "Id",
                    "Tên Lớp",
                    "Sĩ Số",
                    "Giảng Viên",
                    "Học Phí",
                    "#",
                  ]}
                  data={classData}
                  title="Danh Sách Lớp"
                />
              </Grid>
            </Grid>
          </CustomBox>
        </>
      )}
    </>
  );
};

export default ClassComponent;
