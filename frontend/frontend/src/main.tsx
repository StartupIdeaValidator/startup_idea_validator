
  import { createRoot } from "react-dom/client";
  import { QueryClientProvider } from "@tanstack/react-query";
  import { queryClient } from "./lib/queryClient";
  import { enableMocks } from "./api/mock";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  // Enable mock API when no real backend is configured
  if (import.meta.env.VITE_USE_MOCKS !== "false") {
    enableMocks();
  }

  createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );