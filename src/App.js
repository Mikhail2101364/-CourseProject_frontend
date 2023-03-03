import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes, BrowserRouter } from 'react-router-dom'

import { AuthController } from './contexts/AuthContext.js';
import MainPage from './components/MainPage/MainPage';
import Header from "./components/Header/Header";
import { CheckAuth } from './hocs/CheckAuth.js';

import UserPage from './components/UserPage/UserPage.js';
import CreateCollection from './components/CreateCollection/CreateCollection.js';
import ModifyCollection from './components/CreateCollection/ModifyCollection.js';
import ShowCollection from './components/ShowCollection/ShowCollection.js';
import CreateItem from './components/CreateItem/CreateItem.js';
import ModifyItem from './components/CreateItem/ModifyItem.js';
import ShowItem from './components/ShowItem/ShowItem.js';

function App() {
    return (
        <AuthController>
            <BrowserRouter>
                <Header />

                <Routes>
                    <Route path='/' element={
                        <MainPage />
                    }/>

                    <Route path='user/*' element={ 
                        <CheckAuth>
                            <Routes>
                                <Route path='/' element={<UserPage />} />
                                <Route path='create_collection' element={<CreateCollection />} />
                            </Routes>
                        </CheckAuth>
                    } />

                    <Route path='collection/:id/*' element={
                        <Routes>
                            <Route path='/' element={<ShowCollection />} />
                            <Route path='modify' element={<ModifyCollection />} />
                        </Routes>
                    } />

                    <Route path='item/*' element={
                        <Routes>
                            <Route path='add' element={<CreateItem />} />
                            <Route path=':id/*' element={
                                <Routes>
                                    <Route path='/' element={<ShowItem />} />
                                    <Route path='modify' element={<ModifyItem />} />
                                </Routes>
                            } />
                        </Routes>
                    } />
                </Routes>
            </BrowserRouter>
        </AuthController>
    );
}

export default App;
