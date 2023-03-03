import { useLocation, Navigate } from 'react-router-dom';
import { useAuthData } from '../hooks/useAuthData'

const CheckAuth = ({children}) => {
    const location = useLocation();
    const { isAuth, updateUserAuth } = useAuthData();
    if (!isAuth) {    
        return <Navigate to='/' state={{from: location}} />
    } else {
        updateUserAuth();
    }
    return children;
}

export {CheckAuth};