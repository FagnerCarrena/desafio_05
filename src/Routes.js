import { Navigate, Outlet, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Main from './pages/Main';
import { getItem } from './utils/storage';

function ProtectedRoutes({ redirectTo }) {
    const token = getItem('token');

    return token ? <Outlet /> : <Navigate to={redirectTo} />
}




function MainRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/SignIn' element={<SignIn />} />
            <Route path='/SignUp' element={<SignUp />} />

            <Route element={<ProtectedRoutes redirectTo='/' />} >
                <Route path='/Home' element={<Home />} />
            </Route>


        </Routes>


    )
}
export default MainRoutes;