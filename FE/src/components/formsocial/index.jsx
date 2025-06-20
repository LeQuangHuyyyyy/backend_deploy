import React from "react";
import "./index.scss";

export default function FormSocial({ imageurl, content, title }) {
  return (
    <div className="form-social">
      <div className="form-social__header">
        <img className="form-social__avatar" src={imageurl} alt="avatar" />
        <div className="form-social__title">{title}</div>
      </div>
      <div className="form-social__content">{content}</div>
    </div>
  );
}
