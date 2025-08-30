import './index.scss';
import { Route, Routes } from 'react-router-dom';
import AboutPage from 'pages/AboutPage/AboutPage';
import MainPage from 'pages/MainPage/MainPage';
import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import { useTheme } from 'theme/useTheme';
import { classNames } from 'helpers/classNames/classNames';

const App = () => {
    const {theme, toggleTheme} = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <button onClick={toggleTheme}>Toggle</button>
            <Link to='/'>Главная</Link>
            <Link to='/about'>About</Link>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                 <Route path='/about' element={<AboutPage />} />
                 <Route path='/main' element={<MainPage />} />
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;