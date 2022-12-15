import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Chip, Fade, Grid, IconButton } from "@mui/material";
import {
  IconInfoCircle,
  IconBusinessplan,
  IconTrash,
  IconBackspace,
} from "@tabler/icons";
import { useDispatch } from "react-redux";
import CustomBox from "../../../components/custom-box/CustomBox";
import _ from "lodash";
import CustomTable from "../../../components/custom-table/CustomTable";
import LoadingComponent from "../../../utils/component/Loading";
import TeacherFilterComponent from "./TeacherFilterComponent";
import { getListTeacherAction } from "../../../redux/teacher/operators";
import TeacherInfoModal from "./TeacherInfoModal";
import TeacherDeleteModal from "./TeacherDeleteModal";
import TeacherSelectSalaryMenu from "./TeacherSelectSalary";
import salaryMockData from "../../../config/data/salary-mock-data.json";

export const initTeacherFilter = {
  teacher_Id: "",
  teacher_Name: "",
};

const TeacherComponent = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(_.cloneDeep(initTeacherFilter));
  const [teachers, setTeachers] = useState([]);
  const [deleteTeacherObject, setDeleteTeacherObject] = useState(null);
  const [infoTeacherObject, setInfoTeacherObject] = useState(null);
  const [salaryTeacherObject, setSalaryTeacherObject] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleRemoveSalary = (item) => {
    const newTeachers = _.cloneDeep(teachers).map((i) =>
      i?.teacher_Id === item?.teacher_Id
        ? { ...i, salary_Id: null, salary_Name: null, salary_Level: null }
        : i
    );
    setTeachers(newTeachers);
  };

  const handleOpenSelectSalaryMenu = (e, item) => {
    setOpenMenu(true);
    setAnchorEl(e.target);
    setSalaryTeacherObject(item);
  };

  const handleCloseSelectSalaryMenu = () => {
    setOpenMenu(false);
    setAnchorEl(null);
    setSalaryTeacherObject(null);
  };

  const handleSelectSalary = (teacherObject, item) => {
    const newTeachers = _.cloneDeep(teachers).map((i) =>
      i?.teacher_Id === teacherObject?.teacher_Id
        ? {
            ...i,
            salary_Id: item?.salary_Id,
            salary_Name: item?.salary_Name,
            salary_Level: item?.salary_Level,
          }
        : i
    );
    setTeachers(newTeachers);
  };

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
        setTeachers(
          res.slice(0, 50).map((item) => {
            const randomSalary = _.sample([null, _.sample(salaryMockData)]);
            if (!randomSalary) {
              return {
                ...item,
                teacher_Id: item.teacher_Id,
                teacher_Name: item.first_Name + " " + item.last_Name,
              };
            }
            return {
              ...item,
              teacher_Id: item.teacher_Id,
              teacher_Name: item.first_Name + " " + item.last_Name,
              ...randomSalary,
            };
          })
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

  const UtilitySalary = useCallback(
    ({ item }) => {
      return (
        <Grid
          container
          justifyContent="flex-end"
          flexWrap="nowrap"
          columnGap={2}
        >
          <Grid item>
            {item?.salary_Id ? (
              <Fade in={true}>
                <Chip
                  color="secondary"
                  label={item?.salary_Name}
                  onDelete={() => handleRemoveSalary(_.cloneDeep(item))}
                  deleteIcon={<IconBackspace strokeWidth={2} size="1.5rem" />}
                />
              </Fade>
            ) : (
              <IconButton
                color="secondary"
                onClick={(e) =>
                  handleOpenSelectSalaryMenu(e, _.cloneDeep(item))
                }
              >
                <IconBusinessplan
                  strokeWidth={2}
                  size="1.5rem"
                  style={{ marginTop: "auto", marginBottom: "auto" }}
                />
              </IconButton>
            )}
          </Grid>
        </Grid>
      );
    },
    [teachers]
  );

  const teacherData = useMemo(() => {
    const isFilter = Object.values(filter).some((item) => Boolean(item));
    const cloneTeacherList = _.cloneDeep(teachers).map((item) => ({
      teacher_Id: item.teacher_Id,
      teacher_Name: item.teacher_Name,
      utilitySalary: <UtilitySalary item={item} />,
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
  }, [filter, teachers]);

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
        teacherObject={deleteTeacherObject}
        open={Boolean(deleteTeacherObject)}
        handleClose={handleCloseDeleteTeacherModal}
        reloadTeacherData={reloadTeacherData}
      />
      <TeacherSelectSalaryMenu
        anchorEl={anchorEl}
        openMenu={openMenu}
        handleClose={handleCloseSelectSalaryMenu}
        handleSelect={handleSelectSalary}
        teacherObject={salaryTeacherObject}
      />
      <CustomBox>
        <TeacherFilterComponent
          filter={filter}
          setFilter={setFilter}
          teacherList={teachers}
        />
      </CustomBox>
      <CustomBox>
        <Grid container rowSpacing={2} sx={{ overflowX: "auto" }}>
          {loading ? (
            <LoadingComponent />
          ) : (
            <Grid item xs={12}>
              <CustomTable
                reloadPageWhenDataChange={false}
                headers={["Id", "Tên Giảng Viên", "Bậc Lương", "#"]}
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
