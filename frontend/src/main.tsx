import "./styles/index.css";
import Routes from "./Routes.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Routes />
          </LocalizationProvider>
        <ToastContainer />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
