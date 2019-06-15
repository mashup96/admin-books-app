import { updateObject } from '../../../shared/utility';

export function loginFacade(state, action) {
    const { uid } = action.payload;
    return updateObject(state, { uid });
}

export function logoutFacade(state, action) {
    return updateObject(state, { uid: null });
}

export function errorAuthFacade(state, action) {
    const { error } = action.payload;
    return updateObject(state, { error });
}

export function resetErrorAuthFacade(state, action) {
    return updateObject(state, { error: {} });
}
