import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes, BrowserRouter } from 'react-router-dom'

import { AuthController } from './contexts/AuthContext.js';
import MainPage from './components/MainPage/MainPage';
import Header from "./components/Header/Header";
import { CheckAuth } from './hocs/CheckAuth.js';

import { collections, lastAddedItems } from './test/collections';
import UserPage from './components/UserPage/UserPage.js';
import CreateCollection from './components/CreateCollection/CreateCollection.js';
import ShowCollection from './components/ShowCollection/ShowCollection.js';

function App() {
    return (
        <AuthController>
            <BrowserRouter>
                <Header />

                <Routes>
                    <Route path='/' element={
                        <MainPage collections={collections} lastAddedItems={lastAddedItems}/>
                    }/>
                    <Route path='user/*' element={ 
                        <CheckAuth>
                            <Routes>
                                <Route path='/' element={<UserPage />} />
                                <Route path='create_collection' element={<CreateCollection />} />
                            </Routes>
                        </CheckAuth>
                    } />
                    <Route path='collection/:id' element={
                        <ShowCollection />
                    } />
                </Routes>
            </BrowserRouter>
        </AuthController>
    );
}

export default App;
