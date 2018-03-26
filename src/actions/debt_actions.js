import axios from 'axios';
import firebase from 'firebase';
import {cloudFunctionsURL} from "../config/firebase_config";

import {
    GET_INITIAL_AUTH_STATE,
    DEBT_NAME_CHANGED,
    DEBT_AMOUNT_CHANGED,
    DEBT_EXPIRATION_DATE_CHANGED,
    DEBT_CATEGORIES_SELECTED,
    GET_DEBTS,
    GET_DEBTS_SUCCESS,
    GET_DEBTS_FAIL,
    CREATE_DEBT,
    CREATE_DEBT_SUCCESS,
    DEBT_SELECTED,
    DELETE_DEBT, RESET_DEBT_FORM
} from './types';

const ROOT_URL = cloudFunctionsURL;

export const resetDebtForm = (callback) => async dispatch => {
    dispatch({
        type: GET_INITIAL_AUTH_STATE
    });

    callback();
};

export const nameChanged = text => {
    return {
        type: DEBT_NAME_CHANGED,
        payload: text
    };
};

export const amountChanged = text => {
    return {
        type: DEBT_AMOUNT_CHANGED,
        payload: text
    };
};

export const expirationDateChanged = text => {
    return {
        type: DEBT_EXPIRATION_DATE_CHANGED,
        payload: text
    };
};

export const categoriesSelected = list => {
    return {
        type: DEBT_CATEGORIES_SELECTED,
        payload: list
    };
};

export const debtSelected = (key, debtID) => {
    return {
        type: DEBT_SELECTED,
        payload: {key, debtID}
    };
};

export const getDebts = (budgetID) => async dispatch => {
    try {
        dispatch({type: GET_DEBTS});
        let token = await firebase.auth().currentUser.getIdToken();

        let response = await axios.get(`${ROOT_URL}/getDebts?budgetID=${budgetID}`, {
            headers: {Authorization: 'Bearer ' + token}
        });

        dispatch({type: GET_DEBTS_SUCCESS, payload: response.data});
    } catch (err) {
        let {data} = err.response;
        getDebtsFail(dispatch, data.error);
    }
};

const getDebtsFail = (dispatch, error) => {
    dispatch({type: GET_DEBTS_FAIL, payload: error});
};

export const createDebt = ({name, amount, expirationDate, selectedCategories, budgetID}, callback) => async dispatch => {
    try {
        dispatch({type: CREATE_DEBT});

        let token = await firebase.auth().currentUser.getIdToken();

        await axios.post(`${ROOT_URL}/createDebt`,
            {name, amount, expirationDate, budgetID, categories: selectedCategories}, {
                headers: {Authorization: 'Bearer ' + token}
            });

        dispatch({type: RESET_DEBT_FORM});

        callback();
    } catch (err) {
        let {data} = err.response;
        console.log(data.error);
    }
};

export const deleteDebt = (debtID) => async dispatch => {
    try {
        dispatch({type: DELETE_DEBT});

        let token = await firebase.auth().currentUser.getIdToken();

        await axios.post(`${ROOT_URL}/deleteDebt`, {debtID: debtID}, {
            headers: {Authorization: 'Bearer ' + token}
        });
    } catch (err) {
        let {data} = err.response;
        console.log(data.error);
    }
};
