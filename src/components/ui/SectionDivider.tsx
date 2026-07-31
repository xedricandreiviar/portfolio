import React from "react";

export function SectionDivider(): React.JSX.Element {
  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        height: "1px",
        background:
          "linear-gradient(to right, transparent 0%, var(--theme-accent) 50%, transparent 100%)",
      }}
    />
  );
}
