import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Select } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { buildBudget, addBudget, loadTypeBudgetisationSansActe, loadTypeBudgets, setError } from '../redux/actions';

function AddBudget() {
    let budget = {
        typeBudget: {
            code: '',
        },
        designation: '',
        designationSec: '',
        dateCreate: '',
        codeTypeBudgetisationSansActe: '',
        dateDuReference: '',
        dateAuReference: '',
        dateDu: '',
        dateAu: '',
    }
    let history = useHistory();
    let dispatch = useDispatch();
    const { typeBudgets } = useSelector(state => state.typeBudgetsData)
    const { typeBudgetisationSansActes } = useSelector(state => state.typeBudgetisationSansActesData)
    const { budgetA } = useSelector(state => state.budgetA)
    useEffect(() => {
        dispatch(loadTypeBudgets())
        dispatch(loadTypeBudgetisationSansActe())
    }, []);
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        dispatch(buildBudget({ name: value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        /*         if (!budgetA.designation || !budgetA.designationSec || !budgetA.typeBudget || !budgetA.codeTypeBudgetisationSansActe || !budgetA.dateDuReference || !budgetA.dateAuReference || !budgetA.dateDu || !budgetA.dateAu) {
                    dispatch(setError("please input all input Field"))
                } else { */
        dispatch(addBudget(budget));
        dispatch(setError(""))
        history.push("/");
    }
    /*     }; */
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
                <TextField id="standard-basic" label="designation" variant="standard" name="designation" value={budgetA.designation || ''} type="text" onChange={handleInputChange} />
                <br />
                <TextField id="standard-basic" label="designation secondaire" variant="standard" name="designationSec" value={budgetA.designationSec || ''} type="text" onChange={handleInputChange} />
                <br />
                <Select
                    labelId="type de budget"
                    id="demo-type-budget-select"
                    name="typeBudget"
                    value={budgetA.typeBudget || ''}
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
                    value={budgetA.codeTypeBudgetisationSansActe || ''}
                    label="Type Budgetisation sans acte"
                    onChange={handleInputChange}>
                    <MenuItem key={''} value={''}>-------</MenuItem>
                    {typeBudgetisationSansActes && typeBudgetisationSansActes.map((t) => (
                        <MenuItem key={t.code} value={t.code}>{t.designation}</MenuItem>
                    ))}
                </Select>
                <br />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="date du ref"
                        name="dateDuReference"
                        value={budgetA.dateDuReference || ''}
                        onChange={(newValue) => {
                            budget.dateDuReference = newValue;
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <br />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="date au ref"
                        name="dateAuReference"
                        value={budgetA.dateAuReference || ''}
                        onChange={(newValue) => {
                            budget.dateAuReference = newValue;
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <br />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="date du"
                        name="dateDu"
                        value={budgetA.dateDu || ''}
                        onChange={(newValue) => {
                            budget.dateDu = newValue
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <br />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="date au"
                        name="dateAu"
                        value={budgetA.dateAu || ''}
                        onChange={(newValue) => {
                            budget.dateAu = newValue
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <br />
                <Button variant="contained" color="primary" type="submit"> submit </Button>
            </Box>
        </div>
    )
}

export default AddBudget
