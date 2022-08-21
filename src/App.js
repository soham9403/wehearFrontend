
import IndexRoute from './app/routes/Index';
import { useState } from 'react';
import Loader from './component/common/Loader';
import { accessToken, logOut } from './config/helper';

import { useLayoutEffect } from 'react';
import { getUserInfo } from './app/apis/authApis';
import { useDispatch } from 'react-redux';
import { signInAction, signOutAction } from './store/actions/userReducerAction';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Modal } from '@mui/material';
import CustomModal from './component/common/CustomModal';

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    (async () => {
      if (accessToken.get()) {
        const response = await getUserInfo()
        if (response.status === 1) {
          dispatch(signInAction(response.data,true))
        } else {
          dispatch(signOutAction())
          navigate("/sign-in", { replace: true })
        }
        
      } else {
        dispatch(signOutAction())
        // navigate("/sign-in", { replace: true })
      }
      setLoading(false)
    })()
  }, [])

  if (loading) {
    return <Loader />
  } else {
    return (
      <>
        <CustomModal />
        <IndexRoute />
      </>
    );
  }

}

export default App;
