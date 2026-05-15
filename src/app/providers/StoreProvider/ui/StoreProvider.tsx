import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';
import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from '../config/StateSchema';

interface StoreProviderProps {
    children?: any;
    initialState?: DeepPartial<StateSchema>;
}

export const StoreProvider = ({
    children,
    initialState,
}: StoreProviderProps) => {
    const store = createReduxStore(initialState as StateSchema);
    return <Provider store={store}>{children}</Provider>;
};
