import React from "react";

type TProps = {
  title: string;
  actionPanel?: JSX.Element;
};

export const StyledCard: React.FC<TProps> = ({
  children,
  title,
  actionPanel,
}) => {
  return (
    <div className="card white  lighten-4">
      <div className="card-content ">
        <span className="card-title">{title}</span>
        <div>{children}</div>
      </div>

      {actionPanel && <div className="card-action">{actionPanel}</div>}
    </div>
  );
};
