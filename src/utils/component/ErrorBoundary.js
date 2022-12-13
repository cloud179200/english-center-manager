import { Typography } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import CustomBox from "../../components/custom-box/CustomBox";
import MainLayout from "../../layout/MainLayout";
import MinimalLayout from "../../layout/MinimalLayout";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error?.message || "Something went wrong!" };
  }

  componentDidCatch(error, errorInfo) {
    console.log("[ErrorBoundary]", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.userDetail?.user_Type) {
        return (
          <MainLayout>
            <CustomBox>
              <Typography color="error">{this.state.error}</Typography>
            </CustomBox>
          </MainLayout>
        );
      }
      return (
        <MinimalLayout>
          <CustomBox>
            <Typography color="error">{this.state.error}</Typography>
          </CustomBox>
        </MinimalLayout>
      );
    }

    return this.props.children;
  }
}

const mapStateToProps = (state) => ({
  userDetail: state.user.userDetail
});
export default connect(mapStateToProps)(ErrorBoundary);
