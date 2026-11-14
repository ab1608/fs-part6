import { createContext, useState } from 'react';

const NotificationContext = createContext(null);
export default NotificationContext;

export const NotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
