import axios from 'axios';
import firebase from 'firebase';
import {
    INCOME_CHANGED,
    CREATE_BUDGET,
    CREATE_BUDGET_FAIL,
    GET_BUDGET,
    GET_BUDGET_FAIL,
    GET_BUDGET_SUCCESS,
    CREATE_BUDGET_SUCCESS,
    DELETE_BUDGET_SUCCESS,
    DELETE_BUDGET_FAIL,
    EDIT_BUDGET,
    EDIT_BUDGET_SUCCESS,
    EDIT_BUDGET_FAIL,
    GET_BUDGET_ID_FAIL,
    GET_BUDGET_ID_SUCCESS,
    RESET_BUDGET_ERROR,
    GET_INITIAL_STATE,
    DELETE_BUDGET
} from '../../strings/types';
import {BUDGETBUD_FUNCTIONS_URL} from "../../config/firebase_config";

export const resetBudgetError = () => {
    return {
        type: RESET_BUDGET_ERROR
    };
};

export const getBudgetID = (user, callback) => async dispatch => {
    try {
        let token = await user.getIdToken();

        const {data} = await axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getBudgetID?userID=${user.uid}`,
            {headers: {Authorization: 'Bearer ' + token}});

        dispatch({type: GET_BUDGET_ID_SUCCESS, payload: data});

        callback(data);
    } catch (err) {
        if (err.response) {
            callback();
            let {data} = err.response;
            dispatch({type: GET_BUDGET_ID_FAIL, payload: data.error});
        }
    }
};

export const createBudget = (tmpIncome, tmpDisposable, tmpTotalGoalsAmount, callback) =>
    async dispatch => {

        dispatch({type: CREATE_BUDGET});

        const income = Math.round(tmpIncome * 100) / 100;
        const disposable = tmpDisposable;
        const totalGoalsAmount = tmpTotalGoalsAmount;

        try {
            const token = await firebase.auth().currentUser.getIdToken();
            const userID = await firebase.auth().currentUser.uid;

            const {data} = await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/createBudget`,
                {userID, income, totalGoalsAmount, disposable},
                {headers: {Authorization: 'Bearer ' + token}});

            dispatch({
                type: CREATE_BUDGET_SUCCESS,
                payload: {income, totalGoalsAmount, disposable, budgetID: data.id}
            });
            callback(data.id)
        } catch (err) {
            const {data} = err.response;
            dispatch({type: CREATE_BUDGET_FAIL, payload: data.error});
        }
    };

export const getBudget = (budgetID) => async dispatch => {
    dispatch({type: GET_BUDGET});

    try {
        const token = await firebase.auth().currentUser.getIdToken();

        const {data} = await axios.get(`${BUDGETBUD_FUNCTIONS_URL}/getBudget?budgetID=${budgetID}`,
            {headers: {Authorization: 'Bearer ' + token}});

        const disposable = parseInt(data.budgetData.disposable);
        const totalGoalsAmount = parseInt(data.budgetData.totalGoalsAmount);
        const income = parseInt(data.budgetData.income);

        dispatch({
            type: GET_BUDGET_SUCCESS,
            payload: {income, totalGoalsAmount, disposable}
        });

    } catch (err) {
        const {data} = err.response;
        dispatch({type: GET_BUDGET_FAIL, payload: data.error});
    }
};

export const editBudget = (budgetID, tmpIncome, tmpDisposable, tmpTotalGoalsAmount) => async dispatch => {
    dispatch({type: EDIT_BUDGET});
    const token = await firebase.auth().currentUser.getIdToken();

    const income = Math.round(tmpIncome * 100) / 100;
    const disposable = tmpDisposable;
    const totalGoalsAmount = tmpTotalGoalsAmount;

    try {
        await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/editBudget`,
            {budgetID, income, disposable, totalGoalsAmount},
            {headers: {Authorization: 'Bearer ' + token}});

        dispatch({
            type: EDIT_BUDGET_SUCCESS,
            payload: {income, disposable, totalGoalsAmount}
        });
    } catch (err) {
        let {data} = err.response;
        dispatch({type: EDIT_BUDGET_FAIL, payload: data.error});
    }
};

export const deleteBudget = ({budgetID}) => async dispatch => {
    try {
        dispatch({type: DELETE_BUDGET});
        const token = await firebase.auth().currentUser.getIdToken();

        await axios.post(`${BUDGETBUD_FUNCTIONS_URL}/deleteBudget`,
            {budgetID},
            {headers: {Authorization: 'Bearer ' + token}
        });

        dispatch({type: DELETE_BUDGET_SUCCESS});
        dispatch({type: GET_INITIAL_STATE});
    } catch (err) {
        const {data} = err.response;
        dispatch({type: DELETE_BUDGET_FAIL, payload: data.error});
    }
};

export const incomeChanged = (newIncome, income) =>  {
    const incomeDiff = newIncome-income;

    return {
        type: INCOME_CHANGED,
        payload: {newIncome, incomeDiff}
    };
};
