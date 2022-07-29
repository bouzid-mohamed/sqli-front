import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import productsReducer from './slices/products';
import settingsReducer from './slices/settings';
import userReducer from './slices/user';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = configureStore({
    reducer: {
        customization: customizationReducer,
        products: productsReducer,
        user: userReducer,
        settings: settingsReducer
    },
});


export default reducer;
