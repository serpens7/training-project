import { Link } from 'react-router-dom';
import { useTheme } from '@/app/providers/ThemeProvider/lib/useTheme';
import { classNames } from '@/shared/lib/classNames';
import './styles/index.scss';
import { AppRouter } from './providers/router';

const App = () => {
    const { theme, toggleTheme } = useTheme();
    const bool = true;

    return (
        <div className={classNames('app', {}, [theme])}>
            <button onClick={toggleTheme}>Toggle</button>
            <Link to='/'>Главная</Link>
            <Link to='/about'>About</Link>
            <AppRouter />
        </div>
    );
};

export default App;