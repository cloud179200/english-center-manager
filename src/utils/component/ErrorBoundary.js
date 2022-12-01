import { Typography } from "@mui/material";
import React from "react";
import CustomBox from "../../components/custom-box/CustomBox";
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
    console.log("[component Error]", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
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

export default ErrorBoundary;
