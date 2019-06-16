import { updateObject, getPartialList, containsValue } from '../../../shared/utility';

// function that returns the initial list of orders
export function getInitialOrdersFacade(state, action) {
    const { orders } = action.payload;
    const partialList = getPartialList(0, state.pageSize, orders);
    return updateObject(state, {
        numTotalOrders: orders.length,
        currentPage: 0,
        searchText: "",
        allOrders: orders,
        searchOrders: [],
        currentOrders: partialList
    });
}

// function that returns the 3 latest orders
export function getLatestOrdersFacade(state, action) {
    const { orders } = action.payload;
    return updateObject(state, { currentOrders: orders });
}

// function that returns 10 orders based on the selected page number
export function getOrdFromNumPageFacade(state, action) {
    const { currentPage } = action.payload;
    const { allOrders, pageSize, searchOrders } = state;
    let ordersForPaging = [];
    if (searchOrders.length > 0 &&
        searchOrders.length !== allOrders.length) {
        ordersForPaging = [...searchOrders];
    } else {
        ordersForPaging = [...allOrders];
    }
    const partialList = getPartialList(currentPage, pageSize, ordersForPaging);
    return updateObject(state, {
        numTotalOrders: ordersForPaging.length,
        currentPage,
        currentOrders: partialList
    });
}

/*
function that returns a list of orders based on 
the parameter entered in the search 
*/
export function getOrdFromSearchFacade(state, action) {
    const { searchText } = action.payload;
    const { allOrders, pageSize } = state;
    const searchOrders = allOrders.filter(order =>
        containsValue(order.id, searchText));
    const partialList = getPartialList(0, pageSize, searchOrders);
    return updateObject(state, {
        numTotalOrders: searchOrders.length,
        currentPage: 0,
        searchOrders,
        searchText,
        currentOrders: partialList,
    });
}

export function errorOrdersFacade(state, action) {
    const { error } = action.payload;
    return updateObject(state, { error });
}