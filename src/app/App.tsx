import { classNames } from '@/shared/lib/classNames/classNames';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import './styles/index.scss';
import { useTheme } from './providers/ThemeProvider';
import { userActions } from '@/entities/User/model/slice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInited } from '@/entities/User';

function App() {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const itited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback=''>
                <Navbar />
                <div className='content-page'>
                    <Sidebar />
                    {itited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
}

export default App;
