import { useSelector } from 'react-redux'

import { Navigate, Route, Routes } from "react-router-dom";
import constants from '../../config/constants';
import ForgetPasswordController from '../controllers/auth/ForgetPasswordController';
import SignInController from '../controllers/auth/SignInController';
import SignUpController from '../controllers/auth/SignUpController';

import DashboardController from '../controllers/dashboard/DashboardController';
import SaleBoardMain from '../controllers/dashboard/salesBoard/SaleBoardMain';
import UserDashboardController from '../controllers/dashboard/UserDashboardController';
import MassTransferController from '../controllers/masstransfer/MassTransferController';
import ProductController from '../controllers/product/ProductController';
import ProfileController from '../controllers/profile/ProfileController';
import UserController from '../controllers/users/UserController';
import Err404 from '../pages/errorscreens/Err404';
import Header from '../pages/header/Header';

const IndexRoute = () => {
    const user = useSelector((state) => { return state.user })
    return (
        <>
            <Routes>
                {
                    user.isLoggedIn ?
                        <>
                            <Route path='' element={<Header />}>
                                <Route path='dashboard' element={<DashboardController />} >
                                    <Route path='' element={<Navigate replace to={"/dashboard/" + user.data.usercode +"/sold"} />} />
                                    <Route path=':usercode/users' element={<UserController />} />
                                    <Route path=':usercode/sold' element={<SaleBoardMain type={'sold'} />} />
                                    <Route path=':usercode/stock' element={<SaleBoardMain type={'stock'} />} />
                                    <Route path=':usercode/channel' element={<SaleBoardMain type={'channel'} />} />
                                    {user.data.role != constants.user_role.RETELLER_ROLE &&
                                        <Route path=':usercode/all/mass-transfer' element={<MassTransferController />} />}
                                   
                                </Route>

                                {(user.role == constants.user_role.ADMIN || user.role == constants.user_role.SUPER_ADMIN) && <Route path='product' element={<ProductController />} />}
                                <Route path='profile' element={<ProfileController />} />
                                <Route path='' element={<Navigate replace to={"/dashboard/" +  user.data.usercode +"/sold"} />} />
                            </Route>
                        </>
                        :
                        <>
                            <Route path='sign-in' element={<SignInController />} />
                            <Route path='sign-up' element={<SignUpController />} />
                            <Route path='forget-password' element={<ForgetPasswordController />} />
                            <Route path='*' element={<Navigate replace to={"/sign-in"} />} />
                        </>
                }
                <Route path='*' element={<Err404 />} />

            </Routes>
        </>
    )
}
export default IndexRoute