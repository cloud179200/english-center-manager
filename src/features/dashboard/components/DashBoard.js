import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../../utils/component/Loading";
import { getUserDetailAction } from "../../../redux/user/operators";

import DashBoardStudent from "./DashBoardStudent";
import DashboardAdmin from "./DashboardAdmin";

const DashBoard = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.userInfo);
  const userDetail = useSelector((state) => state.user.userDetail);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userInfo?.token || !userInfo?.email) {
      return;
    }
    setLoading(true);
    dispatch(getUserDetailAction(userInfo.email, () => setLoading(false)));
  }, []);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          {userDetail?.user_Type === 1 && <DashboardAdmin />}
          {userDetail?.user_Type === 2 && <DashBoardStudent />}
          {userDetail?.user_Type === 3 && <DashboardAdmin />}
        </>
      )}
    </>
  );
};
export default DashBoard;
