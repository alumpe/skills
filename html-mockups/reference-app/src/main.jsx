import { Component, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ToastProvider, TooltipProvider } from "@gastromatic/components";
import "@gastromatic/themes/dist/themes.css";
import BasicsPage from "./showcase/BasicsPage.jsx";
import PatternsPage from "./showcase/PatternsPage.jsx";
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
      return (
        <pre id="showcase-error">
          {String(this.state.error.stack || this.state.error)}
        </pre>
      );
    }
    return this.props.children;
  }
}

// Keeps the permanently open sample toast of the patterns page inside the page header.
const TOAST_EDGE_SPACING = 4;

function readPage() {
  return window.location.hash === "#/patterns" ? "patterns" : "basics";
}

/** Shows one of the two reference pages, chosen by the URL hash (`#/basics`, `#/patterns`). */
function App() {
  const [page, setPage] = useState(readPage);

  useEffect(() => {
    const onHashChange = () => setPage(readPage());

    window.addEventListener("hashchange", onHashChange);

    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <TooltipProvider>
      <ToastProvider position="top-right" spacing={TOAST_EDGE_SPACING} />
      {page === "patterns" ? <PatternsPage /> : <BasicsPage />}
    </TooltipProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
