import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'

import serwerRequest from './components/ServerRequest'
import MainPage from './pages/MainPage';

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' >
        <Route index element={
            <MainPage />
        } loader={serwerRequest}/>
    </Route>
))

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
