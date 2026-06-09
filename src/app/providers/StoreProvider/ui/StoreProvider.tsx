import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from '../config/StateSchema';
import { useNavigate } from 'react-router-dom';

interface StoreProviderProps {
    children?: React.ReactNode;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider = ({
    children,
    initialState,
    asyncReducers,
}: StoreProviderProps) => {
    const navigate = useNavigate();

    const store = createReduxStore(
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>,
        navigate
    );

    return <Provider store={store}>{children}</Provider>;
};
