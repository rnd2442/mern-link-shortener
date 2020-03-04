import React from "react";
import { TLink } from "../types";
import { useHistory } from "react-router-dom";

type TProps = {
  links: TLink[];
};

export const LinkList: React.FC<TProps> = ({ links }) => {
  const history = useHistory();

  const onClickHandler = (id: string) => {
    history.push(`/detail/${id}`);
  };

  if (links.length === 0) {
    return <p>There is no links yet</p>;
  }

  return (
    <table className="highlight">
      <thead>
        <tr>
          <th>№</th>
          <th>Original</th>
          <th>Shortened</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => {
          return (
            <tr
              key={link._id}
              onClick={() => {
                onClickHandler(link._id);
              }}
              className="cursor"
            >
              <td>{index + 1}</td>
              <td>{link.from}</td>
              <td>{link.to}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
