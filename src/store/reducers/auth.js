import {
    login,
    logout,
    genericActionsAuth,
    resetErrorAuth
} from '../actions';
import { createReducer } from '../../shared/utility';
import {
    loginFacade,
    logoutFacade,
    errorAuthFacade,
    resetErrorAuthFacade
} from '../reducers/facade/auth';

const initialState = {
    uid: null,
    error: {}
};

const authReducer = createReducer(initialState, {
    [login.SUCCESS]: loginFacade,
    [logout.SUCCESS]: logoutFacade,
    [genericActionsAuth.FAILURE]: errorAuthFacade,
    [resetErrorAuth.TRIGGER]: resetErrorAuthFacade
});

export default authReducer;