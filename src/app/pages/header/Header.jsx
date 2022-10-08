import { Breadcrumbs, Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import Logo from '../../../component/common/Logo'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';

import { _lang } from '../../../config/helper'
import { signOutAction } from '../../../store/actions/userReducerAction';

import { AccountCircle } from '@mui/icons-material';
const Header = props => {
  const { user, currentUser } = useSelector(state => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const logOut = () => {
    dispatch(signOutAction())
  }
  console.log('currentUser',currentUser)
  return (
    <>
      <div className='df flex-1 row column p-relative'>

        <header className=' header-outer row column bg-gray'>
          <div className='bg-light header df row'>


            <div className='we_container df row row-center space-between'>
              <div className='df flex-1'>
                <div className='header-logo  df m-r-3 pointer' onClick={() => { navigate('/') }}>
                  <Logo />
                </div>
              </div>

              <div className='flex-1 df center column'>
                {/* <h1 className='h3  text-gradient-primary'>{
                  _lang('role_' + user.role)
                }</h1> */}

                {currentUser && Object.keys(currentUser.data).length > 0 && <>
                  <h6 className='h3  text-gradient-primary'>
                  {currentUser.data.name}

                  </h6>

                  <h6 className='h6'>
                  {_lang('role_' + currentUser.data.role)}

                  </h6>
                </>}

              </div>
              <div className='flex-1 df flex-end'>
                <button className='df  bg-gradient-primary radius-curved p-btn'>
                  {location.pathname != '/profile' &&
                    <Link to='/profile'>
                      <span className='df letter-space-2 flex-1 row-center  df text-light h4 btn'>
                        {user.data.name.length > 10 ? user.data.name.slice(0, 8) + '...' : user.data.name}
                        {/* <IconButton   iconStyle={{ largeIcon: { height: '2.344vw', width: "2.344vw" } }}> */}
                        <AccountCircle
                          style={{ height: '2.344vw', width: "2.344vw", fontSize: '2.344vw' }}
                          fontSize={'large'}
                          className='ml-3' color='white'

                        />
                        {/* </IconButton> */}

                      </span>
                    </Link>}
                  {location.pathname == '/profile' && <a className='pointer' onClick={logOut}>
                    <span className='df letter-space-2 flex-1 row-center  df text-light h4 btn'>
                      <LogoutIcon
                        className='mr-3'
                        fontSize={'large'}
                        color='white'
                      />
                      {_lang('logout')}

                    </span>
                  </a>}
                </button>
              </div>

            </div>
          </div>
        </header>


        {/* <div className="df we_container m-v-primary row row-center  center" >
                    <Breadcrumbs maxItems={2} separator={<Typography variant="h4" className="" color={"dark"}>/</Typography>} aria-label="breadcrumb">
                        {
                            breadcrumb.data && breadcrumb.data.map((data, index) => {
                                if (data.isLink) {
                                    return (
                                        <Link to={data.redirect} key={index} style={{ color: 'red' }}>
                                            <Typography variant="h4" className="" color={"primary"}>{data.label}</Typography>
                                        </Link>

                                    )
                                } else {
                                    return <Typography variant="h4" key={index} className="" color={"dark"}>{data.label}</Typography>
                                }

                            })
                        }

                    </Breadcrumbs>
                </div> */}
        <Outlet />
      </div>
    </>
  )
}
export default Header
