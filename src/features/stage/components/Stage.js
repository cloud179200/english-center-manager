import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Grid, IconButton } from "@mui/material";
import { NAME_TRANS_VN } from "../../../config/constant";
import "../../../assets/scss/_custom-calendar.scss";
import CustomBox from "./../../../components/custom-box/CustomBox";
import { IconEdit, IconTrash, IconCirclePlus } from "@tabler/icons";
import { useDispatch } from "react-redux";
import _ from "lodash";
import CustomTable from "../../../components/custom-table/CustomTable";
import { getStageByClassIdAction } from "../../../redux/class/operators";
import StageDeleteModal from "./StageDeleteModal";
import StageAddModal from "./StageAddModal";
import StageEditModal from "./StageEditModal";
import StageFilterComponent from "./StageFilterComponent";
import LoadingComponent from "../../../utils/component/Loading";
export const initStageFilter = {
  stage_Id: "",
  stage_Name: "",
  teacher_Name: "",
};
const StageComponent = ({
  classObject = null,
  setStageListByFather = null,
}) => {
  // const theme = useTheme();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(_.cloneDeep(initStageFilter));
  const [loading, setLoading] = useState(false);
  const [stageList, setStageList] = useState([]);
  const [deleteStageObject, setDeleteStageObject] = useState(null);
  const [openAddStageModal, setOpenAddStageModal] = useState(false);

  const [editStageObject, setEditStageObject] = useState(null);

  const handleCloseDeleteStageModal = () => {
    setDeleteStageObject(null);
  };

  const handleCloseAddStageModal = () => {
    setOpenAddStageModal(false);
  };

  const handleCloseEditStageModal = () => {
    setEditStageObject(null);
  };

  const Utility = useCallback(
    ({ item }) => {
      return (
        <Grid
          container
          justifyContent="flex-end"
          flexWrap="nowrap"
          columnGap={2}
        >
          <Grid item>
            <IconButton
              disabled={loading}
              onClick={() => setEditStageObject(_.cloneDeep(item))}
            >
              <IconEdit
                strokeWidth={2}
                size="1.5rem"
                style={{ marginTop: "auto", marginBottom: "auto" }}
              />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              disabled={loading}
              color="error"
              onClick={() => setDeleteStageObject(_.cloneDeep(item))}
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
    },
    [loading]
  );

  const stageData = useMemo(() => {
    const isFilter = Object.values(filter).some((item) => Boolean(item));
    const cloneStageList = _.cloneDeep(stageList).map((item) => ({
      stage_Id: item.stage_Id,
      stage_Name: item.stage_Name,
      utility: <Utility item={item} />,
    }));
    if (!isFilter) {
      return cloneStageList;
    }
    let filterResult = cloneStageList
      .filter((item) =>
        filter.stage_Id
          ? item.class_Id.toString().includes(filter.stage_Id)
          : true
      )
      .filter((item) =>
        filter.stage_Name
          ? item.stage_Name
              .toLowerCase()
              .includes(filter.stage_Name.toLowerCase())
          : true
      );
    return filterResult;
  }, [stageList, filter]);

  const getStageData = () => {
    setLoading(true);
    dispatch(
      getStageByClassIdAction(classObject?.class_Id, (res, err) => {
        setLoading(false);
        if (err) return;
        setStageList(res);
        setStageListByFather && setStageListByFather(res);
      })
    );
  };

  useEffect(() => {
    if (!classObject?.class_Id) {
      return;
    }
    getStageData();
  }, [classObject?.class_Id]);

  return (
    <>
      <StageAddModal
        open={openAddStageModal}
        classObject={classObject}
        reloadStageData={getStageData}
        handleClose={handleCloseAddStageModal}
      />
      <StageEditModal
        open={Boolean(editStageObject)}
        stageObject={editStageObject}
        reloadStageData={getStageData}
        handleClose={handleCloseEditStageModal}
      />
      <StageDeleteModal
        open={Boolean(deleteStageObject)}
        stageObject={deleteStageObject}
        reloadStageData={getStageData}
        handleClose={handleCloseDeleteStageModal}
      />
      <CustomBox>
        <StageFilterComponent
          filter={filter}
          setFilter={setFilter}
          classList={stageList}
        />
      </CustomBox>
      <CustomBox>
        <Grid
          container
          justifyContent="flex-end"
          alignItems="flex-start"
          columnSpacing={{ xs: 0, md: 2 }}
          rowSpacing={2}
        >
          <Grid item xs={12} md={6}>
            <Button
              disabled={loading}
              color="secondary"
              variant="contained"
              onClick={() => setOpenAddStageModal(true)}
              fullWidth
              endIcon={
                <IconCirclePlus
                  stroke={1.5}
                  size="1.5rem"
                  style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                  }}
                />
              }
            >
              {NAME_TRANS_VN.STAGE_ADD}
            </Button>
          </Grid>
          {loading ? (
            <LoadingComponent isModal />
          ) : (
            <Grid item xs={12}>
              <CustomTable
                headers={["Id", "Tên Buổi Học", "#"]}
                data={stageData}
                title="Danh Sách Buổi Học"
              />
            </Grid>
          )}
        </Grid>
      </CustomBox>
    </>
  );
};

export default StageComponent;
