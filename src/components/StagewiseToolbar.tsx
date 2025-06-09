"use client";

import { useEffect, useState } from "react";

export const StagewiseToolbar = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Only load in development mode
    if (process.env.NODE_ENV === "development") {
      import("@stagewise/toolbar-next")
        .then(({ StagewiseToolbar }) => {
          const stagewiseConfig = {
            plugins: [],
          };

          const container = document.createElement("div");
          container.id = "stagewise-toolbar-container";
          document.body.appendChild(container);

          const StagewiseToolbarComponent = StagewiseToolbar;
          // Initialize the toolbar
          const root = document.getElementById("stagewise-toolbar-container");
          if (root) {
            // @ts-ignore - Dynamic import handling
            const ReactDOM = require("react-dom/client");
            const reactRoot = ReactDOM.createRoot(root);
            reactRoot.render(
              <StagewiseToolbarComponent config={stagewiseConfig} />
            );
          }
        })
        .catch((error) => {
          console.error("Failed to load Stagewise toolbar:", error);
        });
    }

    setIsMounted(true);

    // Clean up
    return () => {
      const container = document.getElementById("stagewise-toolbar-container");
      if (container) {
        container.remove();
      }
    };
  }, []);

  // Return null as this component doesn't render anything visible
  return null;
};
