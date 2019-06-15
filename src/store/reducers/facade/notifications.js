import { updateObject } from '../../../shared/utility';

export function getNotificationsFacade(state, action) {
    const { notifications } = action.payload;
    const currentNotification = { ...notifications[0] };
    return updateObject(state, { notifications, currentNotification });
}

// function to change notification data in the home via select
export function updateCurrentNotificFacade(state, action) {
    const { value } = action.payload;
    const notification = state.notifications.find(
        notification => notification.timeframe === value
    );
    return updateObject(state, {
        currentNotification: { ...notification }
    });
}

export function errorNotificationsFacade(state, action) {
    const { error } = action.payload;
    return updateObject(state, { error });
}

