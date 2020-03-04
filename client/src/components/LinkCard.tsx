import React from "react";
import { TLink } from "../types";
import { StyledCard } from "./StyledCard";

type TProps = {
  link: TLink;
};

export const LinkCard: React.FC<TProps> = ({ link }) => {
  return (
    <StyledCard title={"INFO"}>
      <p className="truncate">
        Short link:{" "}
        {/* ref="noopener noreferrer" <-- This needs for React can work with refs correctly */}
        <a href={link.to} target="_blank" rel="noopener noreferrer">
          {link.to}
        </a>
      </p>
      <p className="truncate">
        Original:{" "}
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          {link.from}
        </a>
      </p>
      <p>
        Clicks: <strong>{link.clicks}</strong>
      </p>
      <p className="truncate">
        Created: <strong>{new Date(link.date).toDateString()}</strong>
      </p>
    </StyledCard>
  );
};
