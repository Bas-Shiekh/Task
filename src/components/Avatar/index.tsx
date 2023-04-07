import { FC } from "react";
import { IAvatar } from "../../interfaces";
import "./index.css";

const Avatar: FC<IAvatar> = ({ image }) => {
  return (
    <div className="avatar">
      <img src={image} alt="admin" />
    </div>
  );
};

export default Avatar;
