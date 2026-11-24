import { Component } from "react";
import { createRoot } from "react-dom/client";
import "@gastromatic/themes/dist/themes.css";
import Showcase from "./showcase/Showcase.jsx";
import "./index.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return <pre id="showcase-error">{String(this.state.error.stack || this.state.error)}</pre>;
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <Showcase />
  </ErrorBoundary>
);
