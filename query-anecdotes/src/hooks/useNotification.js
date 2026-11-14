import { useContext } from 'react';
import NotificationContext from '../NotificationContext';

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (context === null) {
    throw new Error('useNotificaion must be used within NotificationContextProvider');
  }

  return context;
};
