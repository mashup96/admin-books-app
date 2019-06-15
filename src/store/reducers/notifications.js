import {
    genericActionsNotifications,
    getNotifications,
    updateCurrentNotification
} from '../actions';
import { createReducer } from '../../shared/utility';
import {
    getNotificationsFacade,
    updateCurrentNotificFacade,
    errorNotificationsFacade
} from '../reducers/facade/notifications';


const initialState = {
    loading: false,
    notifications: [],
    currentNotification: {
        timeframe: null,
        orders: 0,
        revenue: 0,
        visitors: 0,
        pageViews: 0
    },
    error: {}
};

const notificationsReducer = createReducer(initialState, {
    [getNotifications.SUCCESS]: getNotificationsFacade,
    [updateCurrentNotification.TRIGGER]: updateCurrentNotificFacade,
    [genericActionsNotifications.FAILURE]: errorNotificationsFacade
});

export default notificationsReducer;
