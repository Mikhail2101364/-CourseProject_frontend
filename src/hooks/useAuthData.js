import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.js';

export function useAuthData() {
    return useContext(AuthContext);
}