import { updateObject } from '../../../shared/utility';

// function to show the loading spinner
export function manageLoadingStart(state, action) {
    const numRequest = state.numRequest + 1;
    return updateObject(state, { loading: true, numRequest });
}

// function to hide the loading spinner
export function manageLoadingStop(state, action) {
    const numRequest = state.numRequest - 1;
    let loading = true;
    if (numRequest === 0) {
        loading = false;
    }
    return updateObject(state, { loading, numRequest });
}