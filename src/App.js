import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes, BrowserRouter } from 'react-router-dom'

import { AuthController } from './contexts/AuthContext.js';
import MainPage from './components/MainPage/MainPage';
import Header from "./components/Header/Header";
import { CheckAuth } from './hocs/CheckAuth.js';

import { collections, lastAddedItems } from './test/collections';
import UserPage from './components/UserPage/UserPage.js';

function App() {
    return (
        <AuthController>
            <BrowserRouter>
                <Header />

                <Routes>
                    <Route path='/' element={
                        <MainPage collections={collections} lastAddedItems={lastAddedItems}/>
                    }/>
                    <Route path='user' element={ 
                        <CheckAuth>
                            <UserPage /> 
                        </CheckAuth>
                    } />
                </Routes>
            </BrowserRouter>
        </AuthController>
    );
}

export default App;
