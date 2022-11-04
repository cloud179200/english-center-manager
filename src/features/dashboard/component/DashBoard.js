import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../../loading";
import { getUserDetailAction } from "../../../redux/user/operators";

const DashBoard = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.user.userInfo);

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
      dash board
      <LoadingComponent />
    </>
  );
};
export default DashBoard;
