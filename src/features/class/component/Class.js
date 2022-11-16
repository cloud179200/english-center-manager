import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import {IconPlus} from "@tabler/icons";
import { useDispatch } from "react-redux";
import { getClassAction } from "../../../redux/class/operators";
import CustomBox from "../../../components/custom-box/CustomBox";
import _ from "lodash";
import CustomTable from "../../../components/custom-table/CustomTable";
import CustomModal from "../../../components/custom-modal/CustomModal";

const rows = [
  {
    class_Id: "LopKuaIem",
    class_Name: "Chill",
    total_Student: 12,
    teacher: "Phung Xuan Nha",
  },
  {
    class_Id: "LopKuaIem02",
    class_Name: "Chill",
    total_Student: 12,
    teacher: "Phung Xuan Nha",
  },
  {
    class_Id: "LopKuaIem03",
    class_Name: "Chill",
    total_Student: 12,
    teacher: "Phung Xuan Nha",
  },
  {
    class_Id: "LopKuaIem04",
    class_Name: "Chill",
    total_Student: 12,
    teacher: "Phung Xuan Nha",
  },
  {
    class_Id: "LopKuaIem05",
    class_Name: "Chill",
    total_Student: 12,
    teacher: "Phung Xuan Nha",
  },
  {
    class_Id: "LopKuaIem06",
    class_Name: "Chill",
    total_Student: 12,
    teacher: "Phung Xuan Nha",
  },
  {
    class_Id: "LopKuaIem07",
    class_Name: "Chill",
    total_Student: 12,
    teacher: "Phung Xuan Nha",
  },
];
const ClassComponent = () => {
  const dispatch = useDispatch();
  const [classList, setClassList] = useState([]);
  const [openNewModal, setOpenNewModal] = useState(false);

  const handleCloseNewModal = () => {
    setOpenNewModal(false);
  };

  const handleOpenNewModal = () => {
    setOpenNewModal(true);
  };

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

  return (
    <>
      <CustomModal open={openNewModal} handleClose={handleCloseNewModal}>
        <div>Hayssdaqweqeqwsss</div>
      </CustomModal>
      <CustomBox>
        <Grid container width="100%" rowSpacing={2}>
          <Grid item md="12">
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="secondary"
                size="small"
                endIcon={<IconPlus strokeWidth={1.5} size="1.3rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />}
                onClick={handleOpenNewModal}
              >
                New
              </Button>
            </Box>
          </Grid>
          <Grid item md="12">
            <CustomTable
              headers={["Id", "Tên Lớp", "Sĩ Số", "Giảng Viên"]}
              data={classList}
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
