import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LocationComponent from "./components/LocationComponent.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocationComponent />
  </StrictMode>,
);
