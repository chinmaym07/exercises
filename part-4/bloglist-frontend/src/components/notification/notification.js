import React from "react";
import "./notification.style.css";

const Notification = ({ message, status }) => {
  return (
    <div className={ status === 1 ? "post-notif" : "neg-notif" }>
      {message}
    </div>
  );
};
export default Notification;