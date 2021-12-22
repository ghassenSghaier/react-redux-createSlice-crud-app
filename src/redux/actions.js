import * as types from "./actionType";
import axios from "axios"
/*************************************************************************************************************************/
const getBudgets = (budgets) => ({
    type: types.GET_BUDGETS,
    payload: budgets,
});
const budgetDeleted = () => ({
    type: types.DELETE_BUDGET,
})
const budgetAdded = () => ({
    type: types.ADD_BUDGET,
})
const getBudget = (budget) => ({
    type: types.GET_SINGLE_BUDGET,
    payload: budget
})
const BudgetToBuild = (budget) => ({
    type: types.BUILD_BUDGET,
    payload: budget
})
const errorToSet = (error) => ({
    type: types.SET_ERROR,
    payload: error
})
export const loadBudgets = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}/budgets`).then((resp) => {
            console.log("budgets", resp)
            dispatch(getBudgets(resp.data));
        }).catch((error) => console.log(error));
    };
};
export const deleteBudget = (id) => {
    return function (dispatch) {
        axios.delete(`${process.env.REACT_APP_API}/budgets/${id}`).then((resp) => {
            console.log("resp", resp)
            dispatch(budgetDeleted());
            dispatch(loadBudgets());
        }).catch((error) => console.log(error));
    };
};
export const addBudget = (budget) => {
    return function (dispatch) {
        axios.post(`${process.env.REACT_APP_API}/budgets`, budget).then((resp) => {
            console.log("resp", resp)
            dispatch(budgetAdded());
            dispatch(loadBudgets());
        }).catch((error) => console.log(error));
    };
};
export const buildBudget = (budget) => {
    return function (dispatch) {
        dispatch(BudgetToBuild(budget));
    };
}
export const setError = (budget) => {
    return function (dispatch) {
        dispatch(errorToSet(budget));
    };
}
export const getSingleBudget = (id) => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}/budgets/${id}`).then((resp) => {
            console.log("resp", resp)
            dispatch(getBudget(resp));
        }).catch((error) => console.log(error));
    };
};
/***********************************************************************************************************************/
export const getTypeBudgets = (typeBudgets) => ({
    type: types.GET_TYPE_BUDGETS,
    payload: typeBudgets,
});
export const loadTypeBudgets = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}/typebudgets`).then((resp) => {
            console.log("types budgets", resp)
            dispatch(getTypeBudgets(resp.data));
        }).catch((error) => console.log(error));
    };
};
/**********************************************************************************************************************/
export const getTypeBudgetisationSansActe = (typeBudgetisationSansActe) => ({
    type: types.GET_TYPE_BUDGETISATION_SANS_ACTE,
    payload: typeBudgetisationSansActe,
});
export const loadTypeBudgetisationSansActe = () => {
    return function (dispatch) {
        axios.get(`${process.env.REACT_APP_API}/type-budgetisation-sans-actes`).then((resp) => {
            console.log("type budgetisation sans acte", resp)
            dispatch(getTypeBudgetisationSansActe(resp.data));
        }).catch((error) => console.log(error));
    };
};
/**********************************************************************************************************************/