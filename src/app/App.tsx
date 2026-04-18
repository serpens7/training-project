import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import { useTheme } from '@/app/providers/ThemeProvider/lib/useTheme';
import { classNames } from '@/shared/lib/classNames';
import './styles/index.scss';
import { AboutPage } from '@/pages/AboutPage';
import { MainPage } from '@/pages/MainPage';

const App = () => {
    const { theme, toggleTheme } = useTheme();
    const bool = true;

    return (
        <div className={classNames('app', {}, [theme])}>
            <button onClick={toggleTheme}>Toggle</button>
            <Link to='/'>Главная</Link>
            <Link to='/about'>About</Link>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                        <Route path='/about' element={<AboutPage />} />
                        <Route path='/' element={<MainPage />} />
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;