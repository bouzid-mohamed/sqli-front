import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import MainCard from 'ui-component/cards/MainCard';
import { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import GirdSkeleton from 'ui-component/cards/Skeleton/GirdSkeleton';
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#5a33aa",
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

function createData(code, reduction) {
    return { code, reduction };
}

const rows = [
    createData('AMD1066', '20'),
    createData('ASQ555', '30'),
    createData('GDFG88', '40'),
    createData('CDFGT22', '50'),
    createData('CDEDD4422', '60'),
    createData('C55820', '70'),
    createData('15kgd55', '80'),
    createData('DSJFJDFK', '90'),
    createData('DJGDFJ', '100'),
    createData('FJGJFGJFG', '110'),
];


export default function GirdViewBon() {
    const [open, setOpen] = React.useState(false);
    const history = createBrowserHistory();
    const handleClose = () => {
        setOpen(false);
    };

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        //setTimeout(() => { setLoading(false); }, 2000);
        setLoading(false);
    }, []);
    if (AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1)
        return (
            <>
                <MainCard title="Liste des Bons">


                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Code</StyledTableCell>
                                    <StyledTableCell align="right">Réduction</StyledTableCell>
                                    <StyledTableCell align="right">Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (<>

                                    {isLoading ? (
                                        <GirdSkeleton loading={isLoading}> </GirdSkeleton>
                                    ) : (


                                        <StyledTableRow key={row.nom} >

                                            <StyledTableCell >{row.code}</StyledTableCell>
                                            <StyledTableCell align="right">{row.reduction}dt</StyledTableCell>

                                            <StyledTableCell align="right" scope="row"  >
                                                <IconButton aria-label="show" size="large" color="primary" href="/products/show" >
                                                    <VisibilityIcon />
                                                </IconButton>
                                                <IconButton aria-label="edit" size="large" color="success">
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete" size="large" color="error" onClick={() => { setOpen(true) }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </StyledTableCell>
                                        </StyledTableRow>

                                    )}
                                </>
                                ))}
                            </TableBody>
                        </Table>
                        {
                            open ? (<div>

                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {"Voulez-vous supprimer ce bon"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Let Google help apps determine location. This means sending anonymous
                                            location data to Google, even when no apps are running.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Annuler</Button>
                                        <Button onClick={handleClose} autoFocus>
                                            Confirmer
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>) : (null)}
                        <Stack direction="row-reverse" marginTop={"2%"}>
                            <Pagination color="primary" count={10} variant="outlined" />
                        </Stack>
                    </TableContainer>
                </MainCard>

            </>

        );
    else {
        history.push('/login');
        window.location.reload();
    }

}
