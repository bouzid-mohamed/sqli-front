import { configureStore } from '@reduxjs/toolkit';
import { createStore } from 'redux';
import reducer from './reducer';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = reducer;
const persister = 'Free';

export { store, persister };
