import React from "react";
import { CollaborationCard } from "./Collaboration";

export const CollaborationPage: React.FC = () => {
  return (
    <div>
      <CollaborationCard repository={"abc/def"} />
    </div>
  );
};
