import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import LoadingComponent from "../../../utils/component/Loading";
import CustomBox from "../../../components/custom-box/CustomBox";
import {
  Button,
  CardMedia,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  useTheme,
  Typography,
  CircularProgress,
  IconButton,
  Fade,
  Tooltip,
} from "@mui/material";
import { useFormik } from "formik";
import { NAME_TRANS_VN } from "../../../config/constant";
import { landingManageSchema } from "../schema";
import AnimateButton from "../../../components/extended/Animate";
import { uniqueKey, fileToBase64 } from "./../../../utils/index";
import _ from "lodash";
import { IconEdit, IconFileExport, IconTrash } from "@tabler/icons";
import {
  getClientDataAction,
  getLandingPageDataAction,
  setLandingPageDataAction,
} from "../../../redux/landing/operators";
import CustomTable from "../../../components/custom-table/CustomTable";
import { CSVLink } from "react-csv";

const LandingManageComponent = () => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const [defaultLandingData, setDefaultLandingData] = useState([]);
  const [landingData, setLandingData] = useState([]);
  const [landingClientData, setLandingClientData] = useState([]);
  const [loadingLandingData, setLoadingLandingData] = useState(false);
  const [loadingClientData, setLoadingClientData] = useState(false);

  const imageSourceRef = useRef(null);

  const initialValues = useMemo(
    () => ({
      Id: "",
      class_Name: "",
      class_Fee: 0,
      image_Name: "",
      image_Source: "",
      description: "",
    }),
    []
  );

  const formik = useFormik({
    initialValues,
    validationSchema: landingManageSchema,
    onSubmit: async (values, formikHelpers) => {
      if (values.Id) {
        setLandingData((prevLandingData) => {
          return prevLandingData.map((item) =>
            item.Id === values.Id
              ? {
                  ...item,
                  class_Name: values.class_Name,
                  class_Fee: values.class_Fee,
                  description: values.description,
                  image_Source: values.image_Source,
                }
              : item
          );
        });
        formikHelpers.setFieldValue("Id", "");
        return;
      }
      setLandingData([
        ...landingData,
        {
          Id: uniqueKey(),
          class_Name: values.class_Name,
          class_Fee: values.class_Fee,
          description: values.description,
          image_Source: values.image_Source,
        },
      ]);
    },
  });

  const handleSetLandingData = () => {
    setLoadingLandingData(true);
    dispatch(
      setLandingPageDataAction(
        _.cloneDeep(landingData).map((item) => ({
          class_Name: item.class_Name,
          class_Fee: item.class_Fee,
          description: item.description,
          image_Source: item.image_Source,
        })),
        (res, err) => {
          setLoadingLandingData(false);
          if (err) {
            return;
          }
          getLandingData();
        }
      )
    );
  };

  const handleRemoveLandingData = (item) => {
    setLandingData(_.cloneDeep(landingData).filter((i) => !_.isEqual(i, item)));
  };

  const handleSetImageSourceBase64 = async (e) => {
    setSubmitting(true);
    const value = await fileToBase64(e?.target?.files[0]);
    setSubmitting(false);
    if (value) {
      setFieldValue("image_Source", value || "");
      setFieldValue("image_Name", e?.target?.files[0].name || "");
    }
  };

  const handleExportLandingClientCSV = () => {
    return;
  };

  const getLandingData = () => {
    setLoadingLandingData(true);
    dispatch(
      getLandingPageDataAction((res, err) => {
        setLoadingLandingData(false);
        if (err) {
          return;
        }
        const formattedRes = res.map((item) => ({ Id: uniqueKey(), ...item }));
        setLandingData(_.cloneDeep(formattedRes));
        setDefaultLandingData(_.cloneDeep(formattedRes));
      })
    );
  };

  const getLandingClientData = () => {
    setLoadingClientData(true);
    dispatch(
      getClientDataAction((res, err) => {
        setLoadingClientData(false);
        if (err) {
          return;
        }
        setLandingClientData(
          res.map((item) => ({
            email: item.email,
            full_Name: item.full_Name,
            phone_Number: item.phone_Number,
            note: item.note,
          }))
        );
      })
    );
  };

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    touched,
    values,
    isSubmitting,
    setFieldValue,
    setSubmitting,
    setValues,
  } = formik;

  useEffect(() => {
    getLandingData();
    getLandingClientData();
  }, []);

  return (
    <>
      <CustomBox>
        <Grid container columnSpacing={2} rowSpacing={2}>
          <Grid container justifyContent="center" item xs={12} md={4} rowSpacing={2}>
            <Grid
              container
              item
              xs={12}
              sx={{
                minHeight: "50vh",
                maxHeight: "50vh",
                overflow: "auto",
              }}
            >
              {loadingLandingData ? (
                <LoadingComponent height="100%" />
              ) : (
                <>
                  {landingData.length === 0 ? (
                    <Grid item xs={12}>
                      <Typography variant="h4">
                        Không Có Lớp Học Quảng Cáo...
                      </Typography>
                    </Grid>
                  ) : (
                    <Grid item xs={12}>
                      <Typography variant="h4">Lớp Học Quảng Cáo</Typography>
                    </Grid>
                  )}
                  {landingData.map((item, index) => (
                    <Fade
                      in={true}
                      key={item.class_Name + "-" + item.Id}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <Grid
                        container
                        item
                        xs={12}
                        maxHeight="100px"
                        flexWrap="nowrap"
                        columnSpacing={1}
                      >
                        <Grid item xs={3}>
                          <CardMedia
                            component="img"
                            src={item.image_Source}
                            alt="wang ping"
                            sx={{
                              maxHeight: "100px",
                              maxWidth: "100px",
                            }}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <Typography
                            gutterBottom
                            variant="h4"
                            color="text.primary"
                            component="div"
                          >
                            Tên Lớp Học: {item?.class_Name}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="h4"
                            color="text.primary"
                            component="div"
                          >
                            Giá: {item?.class_Fee}
                          </Typography>
                          <Tooltip title={`Ghi Chú: ${item?.description}`}>
                            <Typography
                              gutterBottom
                              variant="h4"
                              color="text.primary"
                              component="div"
                              sx={{
                                maxWidth: "300px",
                                maxHeight: "4rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              Ghi Chú: {item?.description}
                            </Typography>
                          </Tooltip>
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          container
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Grid
                            item
                            xs={12}
                            container
                            justifyContent="center"
                            alignItems="center"
                          >
                            <IconButton
                              onClick={() =>
                                setValues({
                                  ..._.cloneDeep(item),
                                  image_Name: "",
                                })
                              }
                              disabled={item?.Id === values.Id}
                              sx={{
                                maxheight: "100px",
                              }}
                            >
                              <IconEdit
                                strokeWidth={2}
                                size="1.5rem"
                                style={{
                                  marginTop: "auto",
                                  marginBottom: "auto",
                                }}
                              />
                            </IconButton>
                          </Grid>
                          <Grid
                            xs={12}
                            container
                            justifyContent="center"
                            alignItems="center"
                          >
                            {" "}
                            <IconButton
                              onClick={() =>
                                handleRemoveLandingData(_.cloneDeep(item))
                              }
                              color="error"
                              sx={{
                                maxheight: "100px",
                              }}
                            >
                              <IconTrash
                                strokeWidth={2}
                                size="1.5rem"
                                style={{
                                  marginTop: "auto",
                                  marginBottom: "auto",
                                }}
                              />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Fade>
                  ))}
                </>
              )}
            </Grid>
            <Grid item xs={12} md={12}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={
                    loadingLandingData ||
                    _.isEqual(defaultLandingData, landingData)
                  }
                  onClick={handleSetLandingData}
                  fullWidth
                  size="large"
                  variant="contained"
                  color="secondary"
                >
                  {NAME_TRANS_VN.SAVE}
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid
              container
              component="form"
              justifyContent="center"
              alignItems="center"
              onSubmit={handleSubmit}
              rowSpacing={2}
              columnSpacing={2}
            >
              <Grid item xs={12}>
                <Typography variant="h4">Thêm Lớp Học Quảng Cáo</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.class_Name && errors.class_Name)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel>{NAME_TRANS_VN.CLASS_NAME}</InputLabel>
                  <OutlinedInput
                    value={values.class_Name}
                    name="class_Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label={NAME_TRANS_VN.CLASS_NAME}
                    autoComplete="off"
                  />
                  {touched.class_Name && errors.class_Name && (
                    <FormHelperText error>{errors.class_Name}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.class_Fee && errors.class_Fee)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel>{NAME_TRANS_VN.CLASS_FEE}</InputLabel>
                  <OutlinedInput
                    value={values.class_Fee}
                    name="class_Fee"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label={NAME_TRANS_VN.CLASS_FEE}
                    autoComplete="off"
                    type="number"
                  />
                  {touched.class_Fee && errors.class_Fee && (
                    <FormHelperText error>{errors.class_Fee}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.image_Source && errors.image_Source)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel>{"Ảnh Khóa Học"}</InputLabel>
                  <OutlinedInput
                    name="image_Source"
                    value={
                      values.image_Source
                        ? values.image_Name || "base64.jpg"
                        : ""
                    }
                    onBlur={handleBlur}
                    onClick={() =>
                      imageSourceRef.current && imageSourceRef.current?.click()
                    }
                    autoComplete="off"
                  />
                  <OutlinedInput
                    onChange={handleSetImageSourceBase64}
                    type="file"
                    inputRef={imageSourceRef}
                    sx={{
                      display: "none",
                    }}
                  />
                  {touched.image_Source && errors.image_Source && (
                    <FormHelperText error>{errors.image_Source}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.description && errors.description)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel>{NAME_TRANS_VN.DESCRIPTION}</InputLabel>
                  <OutlinedInput
                    value={values.description}
                    name="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label={NAME_TRANS_VN.DESCRIPTION}
                    autoComplete="off"
                    multiline
                    minRows={3}
                  />
                  {touched.description && errors.description && (
                    <FormHelperText error>{errors.description}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting || !isValid || loadingLandingData}
                    onClick={handleSubmit}
                    fullWidth
                    size="large"
                    variant="contained"
                    color="secondary"
                    endIcon={
                      isSubmitting ? (
                        <CircularProgress color="secondary" size={20} />
                      ) : null
                    }
                  >
                    {values.Id ? NAME_TRANS_VN.EDIT : NAME_TRANS_VN.ADD}
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CustomBox>
      <CustomBox>
        <Grid container justifyContent="flex-end">
          <Grid item xs={12}>
            {loadingClientData ? (
              <LoadingComponent height="50vh" />
            ) : (
              <CustomTable
                headers={["Email", "Tên Khách Hàng", "SĐT", "Ghi Chú"]}
                data={landingClientData}
                title={`Danh Sách Khách Hàng Yêu Cầu Tư Vấn`}
              />
            )}
          </Grid>
          <Grid item xs={12} md={3} sx={{ marginTop: theme.spacing(2) }}>
            <CSVLink
              data={landingClientData}
              filename="dataClient.csv"
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="small"
                endIcon={
                  <IconFileExport
                    stroke={1.5}
                    size="1.5rem"
                    style={{ marginTop: "auto", marginBottom: "auto" }}
                  />
                }
                disabled={loadingClientData}
                onClick={handleExportLandingClientCSV}
                sx={{
                  width: "100%",
                }}
              >
                Xuất Dữ Liệu
              </Button>
            </CSVLink>
          </Grid>
        </Grid>
      </CustomBox>
    </>
  );
};
export default LandingManageComponent;
