import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from "react-redux"
import { deleteBudget, loadBudgets } from '../redux/actions';
import { useHistory } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const Home = () => {
    let dispatch = useDispatch();
    let history = useHistory();
    /* data => root reducer ==> data */
    const { budgets } = useSelector(state => state.budgetsData)
    useEffect(() => {
        /*  on avait utilisé l'action loadBudgets qui est associé au reducer budgetsReducers */
        dispatch(loadBudgets())
    }, []);
    const handleDelete = (id) => {
        if (window.confirm(" Are you sure about user delete ?")) {
            dispatch(deleteBudget(id))
        }
    }
    return (
        <div>
            <div>
                <Button variant="contained" color="primary" onClick={() => history.push("/addBudget")}>Add Budget</Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700, marginTop: 20 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Designation budget</StyledTableCell>
                            <StyledTableCell align="center">code saisie</StyledTableCell>
                            <StyledTableCell align="center">designation</StyledTableCell>
                            <StyledTableCell align="center">designation secondaire</StyledTableCell>
                            <StyledTableCell align="center">Crée Le</StyledTableCell>
                            <StyledTableCell align="center">Crée par</StyledTableCell>
                            <StyledTableCell align="center">Date du</StyledTableCell>
                            <StyledTableCell align="center">Date au</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {budgets && budgets.map((budget) => (
                            <StyledTableRow key={budget.code}>
                                <StyledTableCell component="th" scope="row">
                                    {budget.typeBudget.designation}
                                </StyledTableCell>
                                <StyledTableCell align="center">{budget.codeSaisi}</StyledTableCell>
                                <StyledTableCell align="center">{budget.designation}</StyledTableCell>
                                <StyledTableCell align="center">{budget.designationSec}</StyledTableCell>
                                <StyledTableCell align="center">{budget.dateCreate}</StyledTableCell>
                                <StyledTableCell align="center">{budget.userCreate}</StyledTableCell>
                                <StyledTableCell align="center">{budget.dateDu}</StyledTableCell>
                                <StyledTableCell align="center">{budget.dateAu}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                        <Button color="secondary" onClick={() => handleDelete(budget.code)}>Delete</Button>
                                        <Button color="primary" onClick={() => history.push(`/editBudget/${budget.code}`)}>Edit</Button>
                                    </ButtonGroup></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Home
