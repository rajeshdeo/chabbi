import {   legacy_createStore } from 'redux';

import authReducer from './authReducer';



export const store = legacy_createStore(authReducer);
