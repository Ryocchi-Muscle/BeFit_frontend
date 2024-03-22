// Button.client.tsx
import React from "react";

export default function Button({ onClick, children }: { onClick: any, children: React.ReactNode }) {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
}
