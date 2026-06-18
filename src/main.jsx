import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import { store } from "./store";
import AppContextProvider from "./context/AppContext";
import { ThemeProvider } from "./context/ThemeContext";
import RootApp from "./rootApp";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Provider store={store}>
          <AppContextProvider>
            <ThemeProvider>
              <BrowserRouter>
                <RootApp />
                <Toaster />
              </BrowserRouter>
            </ThemeProvider>
          </AppContextProvider>
        </Provider>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
