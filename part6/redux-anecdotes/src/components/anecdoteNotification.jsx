import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearNotification } from '../reducers/notificationReducer';

const AnecdoteNotification = () => {
  const dispatch = useDispatch();
  const { notification, timeout } = useSelector((state) => state.notification);
  console.log(notification, timeout);

  useEffect(() => {
    const notificationTimeout = setTimeout(() => {
      dispatch(clearNotification());
    }, timeout * 1000);

    return () => clearTimeout(notificationTimeout);
  }, [dispatch, timeout]);

  return <div>{notification.length > 0 && `${notification}`}</div>;
};

export default AnecdoteNotification;
