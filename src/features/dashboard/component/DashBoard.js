import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../../utils/component/Loading";
import { getUserDetailAction } from "../../../redux/user/operators";
import { useTimeout } from "react-use";
import CustomBox from "../../../components/custom-box/CustomBox";
const DashBoard = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [ready] = useTimeout(2000);

  const loadData = async () => {
    if (userInfo?.token && userInfo?.email) {
      dispatch(getUserDetailAction(userInfo?.email, () => {}));
    }
  };

  useEffect(() => {
    loadData();
  }, [userInfo]);

  return (
    <>
      {!ready() ? (
        <LoadingComponent />
      ) : (
        <CustomBox>Bo may da san sang</CustomBox>
      )}
    </>
  );
};
export default DashBoard;
