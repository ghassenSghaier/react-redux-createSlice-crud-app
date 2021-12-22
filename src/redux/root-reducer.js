import { combineReducers } from "redux";
import { budgetsReducers, typeBudgetisationSansActesReducers, typeBudgetsReducers } from "./reducer";

const rootReducer = combineReducers({
    budgetsData: budgetsReducers,
    typeBudgetsData: typeBudgetsReducers,
    typeBudgetisationSansActesData: typeBudgetisationSansActesReducers
});

export default rootReducer;