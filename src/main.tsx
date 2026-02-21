import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TimerComponent from "./components/Timer.component.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <LocationComponent /> */}
    <TimerComponent />
  </StrictMode>,
);
