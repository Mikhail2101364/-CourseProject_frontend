import { useLocation, Navigate } from 'react-router-dom';
//import { useAuthData } from '../hooks/useAuthData'

const CheckAuth = ({children}) => {
    const location = useLocation();
    //const { isAuth } = useAuthData();

    console.log('CheckAuth !!')

    if (!localStorage.getItem('token')) {
        return <Navigate to='/' state={{from: location}} />
    }

  return children;
}

export {CheckAuth};