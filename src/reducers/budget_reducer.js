import {
    CATEGORY_CHANGED,
    CREATE_BUDGET,
    INCOME_CHANGED,
    GET_BUDGET,
    CREATE_BUDGET_FAIL,
    GET_BUDGET_FAIL,
    GET_BUDGET_SUCCESS,
    CREATE_BUDGET_SUCCESS,
    GET_INITIAL_BUDGET_STATE,
    GET_ACCOUNT_DATA,
    EDIT_BUDGET,
    EDIT_BUDGET_SUCCESS,
    EDIT_BUDGET_FAIL,
    GET_BUDGET_ID_SUCCESS,
    GET_BUDGET_ID_FAIL
} from "../actions/types";

const INITIAL_STATE = {
    budgetID: '',
    income: 0,
    budgetError: '',
    budgetLoading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_INITIAL_BUDGET_STATE:
            return INITIAL_STATE;
        case GET_BUDGET_ID_SUCCESS:
            return {...state, budgetID: action.payload};
        case GET_BUDGET_ID_FAIL:
            return {...state, budgetError: action.payload};
        case CREATE_BUDGET:
            return {...state, budgetLoading: true, budgetError: ''};
        case CREATE_BUDGET_SUCCESS:
            return {
                ...state,
                budgetLoading: false,
                income: action.payload
            };
        case CREATE_BUDGET_FAIL:
            return {...state, ...INITIAL_STATE, budgetError: action.payload};
        case GET_BUDGET:
            return {...state, budgetLoading: true, budgetError: ''};
        case GET_BUDGET_SUCCESS:
            return {
                ...state,
                budgetLoading: false,
                income: action.payload
            };
        case GET_BUDGET_FAIL:
            return {...state, budgetError: action.payload};
        case INCOME_CHANGED:
            return {...state, income: action.payload};
        case EDIT_BUDGET:
            return {...state, budgetLoading: true, budgetError: ''};
        case EDIT_BUDGET_SUCCESS:
            return {
                ...state,
                budgetLoading: false,
                income: action.payload
            };
        case EDIT_BUDGET_FAIL:
            return {...state, budgetError: action.payload};
        case GET_ACCOUNT_DATA:
            return state;
        default:
            return state;
    }
}
