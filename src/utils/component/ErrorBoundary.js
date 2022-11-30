import { Typography } from "@mui/material";
import React from "react";
import CustomBox from "../../components/custom-box/CustomBox";
import MainLayout from "../../layout/MainLayout";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error?.message || "Something went wrong!" };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <MainLayout>
          <CustomBox>
            <Typography color="error">{this.state.error}</Typography>
          </CustomBox>
        </MainLayout>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
