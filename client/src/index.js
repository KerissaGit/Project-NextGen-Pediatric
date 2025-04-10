import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom"

import { router } from "./router"

const rootContainerontainer = document.getElementById("root");
const root = createRoot(rootContainer);
root.render(
        <RouterProvider router={router} />
    );

