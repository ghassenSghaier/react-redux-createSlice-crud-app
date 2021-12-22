import * as types from "./actionType"
const initialState = {
    budgets: [],
    typeBudgets: [],
    typeBudgetisationSansActes: [],
    budgetA: {},
    budgetE: {},
    loading: true
}

export const budgetsReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_BUDGETS:
            return {
                ...state, budgets: action.payload, loading: false,
            }
        case types.DELETE_BUDGET:
            return {
                ...state, loading: false,
            }
        case types.ADD_BUDGET:
            return {
                ...state, loading: false,
            }
        case types.GET_SINGLE_BUDGET:
            return {
                ...state, budgets: action.payload, loading: false,
            }
        case types.BUILD_BUDGET:
            return {
                ...state, budgetA: action.payload, loading: false,
            }
        default:
            return state;
    }
}
export const typeBudgetsReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_TYPE_BUDGETS:
            return {
                ...state, typeBudgets: action.payload, loading: false,
            }
        default:
            return state;
    }
}
export const typeBudgetisationSansActesReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_TYPE_BUDGETISATION_SANS_ACTE:
            return {
                ...state, typeBudgetisationSansActes: action.payload, loading: false,
            }
        default:
            return state;
    }
}
