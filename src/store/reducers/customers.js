import {
    genericActionsCustomers,
    getCustomersFromNumberPage,
    getCustomersFromSearch,
    getInitialCustomers,
    getLoyalCustomers,
    getCustomer,
    deleteCustomer
} from '../actions';
import { createReducer } from '../../shared/utility';
import {
    getInitialCustomersFacade,
    getLoyalCustomersFacade,
    getCustomerFacade,
    getCustFromNumPageFacade,
    getCustFromSearchFacade,
    deleteCustomerFacade,
    errorCustomersFacade,
} from '../reducers/facade/customers';


const initialState = {
    loading: false,
    currentPage: 0,
    pageSize: 10,
    numTotalCustomers: 0,
    allCustomers: [],
    searchText: "",
    searchCustomers: [],
    currentCustomers: [],
    detailCustomer: {},
    error: {}
};

/*
I used the facade pattern because there are functions that manage 
client side both paging and filtering
*/
const customersReducer = createReducer(initialState, {
    [getInitialCustomers.SUCCESS]: getInitialCustomersFacade,
    [getLoyalCustomers.SUCCESS]: getLoyalCustomersFacade,
    [getCustomersFromNumberPage.TRIGGER]: getCustFromNumPageFacade,
    [getCustomersFromSearch.TRIGGER]: getCustFromSearchFacade,
    [getCustomer.SUCCESS]: getCustomerFacade,
    [deleteCustomer.SUCCESS]: deleteCustomerFacade,
    [genericActionsCustomers.FAILURE]: errorCustomersFacade
});

export default customersReducer;
