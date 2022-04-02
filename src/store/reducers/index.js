import { combineReducers } from "@reduxjs/toolkit"
import breadCrumbReducer from "./breadCrumbReducer";
import destributorListReducer from "./destributorListReducer";
import ModalReducer from "./ModalReducer";
import userAnalyticInfoReducer from "./userAnalyticInfo";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  destributor_list: destributorListReducer,
  breadcrumb: breadCrumbReducer,
  userAnalytic: userAnalyticInfoReducer,
  modal: ModalReducer
})
export default rootReducer;