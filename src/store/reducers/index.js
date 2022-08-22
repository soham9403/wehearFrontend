import { combineReducers } from "@reduxjs/toolkit"
import breadCrumbReducer from "./breadCrumbReducer";
import CategoryReducer from "./CategoryReducer";
import CurrentUserReducer from "./CurrentUserReducer";
import destributorListReducer from "./destributorListReducer";
import ModalReducer from "./ModalReducer";
import userAnalyticInfoReducer from "./userAnalyticInfo";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  currentUser:CurrentUserReducer,
  destributor_list: destributorListReducer,
  breadcrumb: breadCrumbReducer,
  userAnalytic: userAnalyticInfoReducer,
  modal: ModalReducer,
  category:CategoryReducer
})
export default rootReducer;