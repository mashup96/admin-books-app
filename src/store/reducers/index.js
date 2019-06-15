import { combineReducers } from "redux";
import manageLoading from "./manageLoading";
import authReducer from "./auth"
import ordersReducer from "./orders";
import notificationsReducer from "./notifications";
import customersReducer from "./customers";
import booksReducer from "./books";
import listsToSelectReducer from "./listsToSelect";

const rootReducer = combineReducers({
  manageLoading: manageLoading,
  authData: authReducer,
  ordersData: ordersReducer,
  notificationsData: notificationsReducer,
  customersData: customersReducer,
  booksData: booksReducer,
  listsToSelectData: listsToSelectReducer
});

export default rootReducer;
