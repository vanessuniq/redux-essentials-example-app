import { formatDistanceToNow, parseISO } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersSlice';
import { selectAllNotifications } from './notificationsSlice';

const NotificationsList = () => {
    const notifications = useSelector(selectAllNotifications)
    const users = useSelector(selectAllUsers)

    const renderedNotifications = notifications.map(notification => {
        const date = parseISO(notification.date)
        const timeAgo = formatDistanceToNow(date)
        const user = users.find(user => user.id === notification.user) || {name: 'unknown user'}

        return (
            <div key={notification.id}>
                <div>
                    <b>{user.name}</b> {notification.message}
                </div>
                <div title={notification.date}>
                    <i>{timeAgo} ago</i>
                </div>
            </div>
        )
    })
    return (
        <section className='notificationList'>
            {renderedNotifications}
        </section>
    );
}

export default NotificationsList;
