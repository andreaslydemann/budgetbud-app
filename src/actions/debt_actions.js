import axios from 'axios';
import firebase from 'firebase';
import {budgetBudFunctionsURL} from "../config/firebase_config";

import {
    RESET_DEBT_FORM,
    DEBT_NAME_CHANGED,
    DEBT_AMOUNT_CHANGED,
    DEBT_EXPIRATION_DATE_CHANGED,
    GET_DEBTS,
    GET_DEBTS_SUCCESS,
    GET_DEBTS_FAIL,
    CREATE_DEBT,
    CREATE_DEBT_SUCCESS,
    EDIT_DEBT,
    EDIT_DEBT_SUCCESS,
    DEBT_SELECTED,
    DELETE_DEBT
} from './types';

const ROOT_URL = budgetBudFunctionsURL;

export const resetDebtForm = (callback) => async dispatch => {
    dispatch({
        type: RESET_DEBT_FORM
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

export const debtSelected = (debt) => {
    return {
        type: DEBT_SELECTED,
        payload: debt
    };
};

export const getDebts = (budgetID) => async dispatch => {
    try {
        dispatch({type: GET_DEBTS});
        let token = await firebase.auth().currentUser.getIdToken();

        let {data} = await axios.get(`${ROOT_URL}/getDebts?budgetID=${budgetID}`, {
            headers: {Authorization: 'Bearer ' + token}
        });

        dispatch({type: GET_DEBTS_SUCCESS, payload: data});
    } catch (err) {
        let {data} = err.response;
        getDebtsFail(dispatch, data.error);
    }
};

const getDebtsFail = (dispatch, error) => {
    dispatch({type: GET_DEBTS_FAIL, payload: error});
};

export const createDebt =
    ({name, totalAmount, expirationDate, categoryDebtItems, budgetID}) => async dispatch => {
        dispatch({type: CREATE_DEBT});

        try {
            const categories = [];

            categoryDebtItems.forEach(c => {
                categories.push({
                    categoryID: c.categoryID,
                    newAmount: c.afterAmount,
                    amountToSubtract: c.amountToSubtract
                });
            });

            let token = await firebase.auth().currentUser.getIdToken();

            await axios.post(`${ROOT_URL}/createDebt`,
                {name, totalAmount, expirationDate, budgetID, categories}, {
                    headers: {Authorization: 'Bearer ' + token}
                });

            dispatch({type: CREATE_DEBT_SUCCESS});
        } catch (err) {
            let {data} = err.response;
            console.log(data.error);
        }
    };

export const editDebt =
    ({name, totalAmount, expirationDate, categoryDebtItems, selectedDebt, budgetID}) =>
        async dispatch => {
            dispatch({type: EDIT_DEBT});

            try {
                const categories = [];

                categoryDebtItems.forEach(c => {
                    categories.push({
                        categoryID: c.categoryID,
                        newAmount: c.afterAmount,
                        amountToSubtract: c.amountToSubtract
                    });
                });

                let token = await firebase.auth().currentUser.getIdToken();

                await axios.post(`${ROOT_URL}/editDebt`,
                    {name, totalAmount, expirationDate, debtID: selectedDebt.id, budgetID, categories}, {
                        headers: {Authorization: 'Bearer ' + token}
                    });

                dispatch({type: EDIT_DEBT_SUCCESS});
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
