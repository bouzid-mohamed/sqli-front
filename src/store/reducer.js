import { configureStore } from '@reduxjs/toolkit';
// reducer import
import customizationReducer from './customizationReducer';
import notificationsReducer from './slices/notifications';
import productsReducer from './slices/products';
import settingsReducer from './slices/settings';
import userReducer from './slices/user';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = configureStore({
    reducer: {
        customization: customizationReducer,
        products: productsReducer,
        user: userReducer,
        settings: settingsReducer,
        notifications: notificationsReducer
    },
});


export default reducer;
