import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Select } from '@mui/material';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { buildBudget, updateBudget, loadTypeBudgetisationSansActe, loadTypeBudgets, setError, getSingleBudget } from '../redux/actions';
import { useParams } from "react-router-dom";

function EditBudget() {

    //use history to switch up component while keeping up navigation history.
    let history = useHistory();

    // useDispatch  to dispatch actions to the store.
    let dispatch = useDispatch();

    // selector to fetch typeBudgets from the store
    const { typeBudgets } = useSelector(state => state.typeBudgetsData)

    // selector to fetch type of budgets sans actes
    const { typeBudgetisationSansActes } = useSelector(state => state.typeBudgetisationSansActesData)

    // selector to hook up the budget state on the store
    const budget = useSelector(state => state.budgetsData.budget)

    // param to get the id prop from the component.
    let { id } = useParams()

    useEffect(() => {
        dispatch(loadTypeBudgets())
        dispatch(loadTypeBudgetisationSansActe())
    }, []);

    useEffect(() => {
        dispatch(getSingleBudget(id))
    }, []);

    const handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        dispatch(buildBudget({ k: name, v: value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        budget["typeBudget"] = typeBudgets.find(b => b.code === budget.typeBudget);
        dispatch(updateBudget(budget, id));
        history.push("/");
    }
    return (
        <div>
            <Button variant="contained" color="secondary" type="submit" onClick={() => history.push("/")}> Go Back </Button>
            <h2>Add Budget</h2>
            {/*             {error && <h3 style={{ color: "red" }}>{error}</h3>} */}
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}>
                <TextField id="standard-basic" label="designation" variant="standard" name="designation" value={budget.designation || ''} type="text" onChange={handleInputChange} />
                <br />
                <TextField id="standard-basic" label="designation secondaire" variant="standard" name="designationSec" value={budget.designationSec || ''} type="text" onChange={handleInputChange} />
                <br />
                <Select
                    labelId="type de budget"
                    id="demo-type-budget-select"
                    name="typeBudget"
                    value={budget.typeBudget || ''}
                    label="type de budget"
                    onChange={handleInputChange}>
                    <MenuItem key={''} value={''}>--------</MenuItem>
                    {typeBudgets && typeBudgets.map((t) => (
                        <MenuItem key={t.code} value={t.code}>{t.designation}</MenuItem>
                    ))}
                </Select>
                <br />
                <Select
                    labelId="type de budgetisation"
                    id="demo-creation-date-budget-select"
                    name="codeTypeBudgetisationSansActe"
                    value={budget.codeTypeBudgetisationSansActe || ''}
                    label="Type Budgetisation sans acte"
                    onChange={handleInputChange}>
                    <MenuItem key={''} value={''}>-------</MenuItem>
                    {typeBudgetisationSansActes && typeBudgetisationSansActes.map((t) => (
                        <MenuItem key={t.code} value={t.code}>{t.designation}</MenuItem>
                    ))}
                </Select>
                <br />
                {/*                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="date du ref"
                        name="dateDuReference"
                        value={budget.budget.dateDuReference || ''}
                        onChange={handleInputChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider> */}
                <input type="date" name="dateDuReference" value={budget.dateDuReference || ''} onChange={handleInputChange} />
                <br />
                {/*                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="date au ref"
                        name="dateAuReference"
                        value={budget.budget.dateAuReference || ''}
                        onChange={handleInputChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider> */}
                <input type="date" name="dateAuReference" value={budget.dateAuReference || ''} onChange={handleInputChange} />
                <br />
                {/*                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="date du"
                        name="dateDu"
                        value={budget.budget.dateDu || ''}
                        onChange={handleInputChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider> */}
                <input type="date" name="dateDu" value={budget.dateDu || ''} onChange={handleInputChange} />
                <br />
                {/*                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="date au"
                        name="dateAu"
                        value={budget.budget.dateAu || ''}
                        onChange={(newValue) => {

                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider> */}
                <input type="date" name="dateAu" value={budget.dateAu || ''} onChange={handleInputChange} />
                <br />
                <Button variant="contained" color="primary" type="submit"> submit </Button>
            </Box>
        </div>
    )
}

export default EditBudget