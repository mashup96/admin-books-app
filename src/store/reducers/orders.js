import {
    genericActionsOrders,
    getInitialOrders,
    getLatestOrders,
    getOrdersFromNumberPage,
    getOrdersFromSearch
} from '../actions';
import { createReducer } from '../../shared/utility';
import {
    errorOrdersFacade,
    getOrdFromSearchFacade,
    getOrdFromNumPageFacade,
    getLatestOrdersFacade,
    getInitialOrdersFacade,
} from '../reducers/facade/orders';


const initialState = {
    loading: false,
    currentPage: 0,
    pageSize: 10,
    numTotalOrders: 0,
    searchText: "",
    allOrders: [],
    searchOrders: [],
    currentOrders: [],
    error: {}
};

/*
I used the facade pattern because there are functions that manage 
client side both paging and filtering
*/
const ordersReducer = createReducer(initialState, {
    [getInitialOrders.SUCCESS]: getInitialOrdersFacade,
    [getLatestOrders.SUCCESS]: getLatestOrdersFacade,
    [getOrdersFromNumberPage.TRIGGER]: getOrdFromNumPageFacade,
    [getOrdersFromSearch.TRIGGER]: getOrdFromSearchFacade,
    [genericActionsOrders.FAILURE]: errorOrdersFacade
});

export default ordersReducer;
