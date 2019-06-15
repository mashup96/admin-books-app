import {
    updateObject,
    getPartialList,
    containsValue
} from '../../../shared/utility';

// function that returns the initial list of customers
export function getInitialCustomersFacade(state, action) {
    const { customers } = action.payload;
    const partialList = getPartialList(0, state.pageSize, customers);
    return updateObject(state, {
        numTotalCustomers: customers.length,
        currentPage: 0,
        searchText: "",
        allCustomers: customers,
        searchCustomers: [],
        currentCustomers: partialList
    });
}

// function that returns the 3 customers who bought more books
export function getLoyalCustomersFacade(state, action) {
    const { customers } = action.payload;
    return updateObject(state, { currentCustomers: customers });
}

export function getCustomerFacade(state, action) {
    const { customer } = action.payload;
    return updateObject(state, { detailCustomer: customer });
}

// function that returns 10 customers based on the selected page number
export function getCustFromNumPageFacade(state, action) {
    const { currentPage } = action.payload;
    const { allCustomers, pageSize, searchCustomers } = state;
    let customersForPaging = [];
    if (searchCustomers.length > 0 &&
        searchCustomers.length !== allCustomers.length) {
        customersForPaging = [...searchCustomers];
    } else {
        customersForPaging = [...allCustomers];
    }
    const partialList = getPartialList(currentPage, pageSize, customersForPaging);
    return updateObject(state, {
        numTotalCustomers: customersForPaging.length,
        currentPage,
        currentCustomers: partialList
    });
}


/*
function that returns a list of customers based on 
the parameter entered in the search 
*/
export function getCustFromSearchFacade(state, action) {
    const { searchText } = action.payload;
    const { allCustomers, pageSize } = state;
    const searchCustomers = allCustomers.filter(customer =>
        containsValue(customer.name, searchText));
    const partialList = getPartialList(0, pageSize, searchCustomers);
    return updateObject(state, {
        numTotalCustomers: searchCustomers.length,
        currentPage: 0,
        searchCustomers,
        searchText,
        currentCustomers: partialList,
    });
}

/*
function that removes the selected customer considering the total list 
of customers and the list of customers searched to derive the current list 
of customers
*/
export function deleteCustomerFacade(state, action) {
    const { id } = action.payload;
    const { allCustomers, pageSize, searchCustomers } = state;
    let customersForPaging = [];
    let currentSearchCustomers = [...searchCustomers];
    let searchText = state.searchText;
    const allCustomersFilter = allCustomers.filter((customer) => customer.id !== id);
    if (searchCustomers.length > 0 &&
        searchCustomers.length !== allCustomers.length) {
        customersForPaging = searchCustomers.filter((customer) => customer.id !== id);
        if (customersForPaging.length === 0) {
            customersForPaging = [...allCustomersFilter];
            searchText = "";
            currentSearchCustomers = [];
        }
    } else {
        customersForPaging = [...allCustomersFilter];
        searchText = "";
    }
    let partialList = getPartialList(0, pageSize, customersForPaging);
    let currentPage = 0;
    if (customersForPaging.length) {
        currentPage = state.currentPage;
        partialList = getPartialList(currentPage, pageSize, customersForPaging);
    }
    return updateObject(state, {
        numTotalCustomers: customersForPaging.length,
        currentPage,
        searchText,
        searchCustomers: currentSearchCustomers,
        allCustomers: allCustomersFilter,
        currentCustomers: partialList
    });
}

export function errorCustomersFacade(state, action) {
    const { error } = action.payload;
    return updateObject(state, { error });
}