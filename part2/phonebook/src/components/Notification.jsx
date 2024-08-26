import { useEffect, useState } from "react";

const Notification = ({ message, duration }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!visible) return null;

  return <div className="notification">{message}</div>;
};

export default Notification;
