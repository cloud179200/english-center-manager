import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { IconPlus } from "@tabler/icons";
import { useDispatch, useSelector } from "react-redux";
import { getClassAction } from "../../../redux/class/operators";
import CustomBox from "../../../components/custom-box/CustomBox";
import _ from "lodash";
import CustomTable from "../../../components/custom-table/CustomTable";
import LoadingComponent from "../../../utils/component/Loading";
import { useTimeout } from "react-use";
import ClassAddModal from "./ClassAddModal";
import ClassFilterComponent from "./ClassFilterComponent";
import classMockData from "../../../config/data/class-mock-data.json"
const rows = classMockData

export const initClassFilter = { class_Id: "", class_Name: "", teacher: "" };

const ClassComponent = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.common.loading);
  const [ready] = useTimeout(2000);
  const [filter, setFilter] = useState(_.cloneDeep(initClassFilter));
  const [classList, setClassList] = useState([]);
  const [openAddClassModal, setOpenAddClassModal] = useState(false);

  const handleCloseAddClassModal = () => {
    setOpenAddClassModal(false);
  };

  const handleOpenAddClassModal = () => {
    setOpenAddClassModal(true);
  };

  const getClassData = (f) => {
    const isFilter = Object.values(f).some(item => Boolean(item))
    if (!isFilter) {
      return _.cloneDeep(classList)
    }
    let filterResult = _.cloneDeep(classList).filter(item => f.class_Id ? item.class_Id.includes(f.class_Id) : true).filter(item => f.class_Name ? item.class_Name.includes(f.class_Name) : true).filter(item => f.teacher ? item.teacher.includes(f.teacher) : true)
    return filterResult
  }

  useEffect(() => {
    setClassList(_.cloneDeep(rows));
    return;
    dispatch(
      getClassAction((res, err) => {
        if (err) {
          return;
        }
        setClassList(res);
      })
    );
  }, []);

  if (loading || !ready()) {
    return <LoadingComponent />;
  }

  return (
    <>
      <ClassAddModal
        open={openAddClassModal}
        handleClose={handleCloseAddClassModal}
      />
      <CustomBox>
        <ClassFilterComponent filter={filter} setFilter={setFilter} classList={classList} />
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
                  strokeWidth={1.5}
                  size="1.3rem"
                  style={{ marginTop: "auto", marginBottom: "auto" }}
                />
              }
              onClick={handleOpenAddClassModal}
              sx={{
                width: "100%"
              }}
            >
              New
            </Button>
          </Grid>
          <Grid item md={12}>
            <CustomTable
              headers={["Id", "Tên Lớp", "Sĩ Số", "Giảng Viên"]}
              data={getClassData(filter)}
              title="Danh Sách Lớp"
            />
          </Grid>
        </Grid>
      </CustomBox>
      <CustomBox>Chill</CustomBox>
    </>
  );
};

export default ClassComponent;
