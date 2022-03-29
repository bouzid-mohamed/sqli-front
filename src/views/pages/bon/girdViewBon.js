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
import BonServices from 'services/bons-services/BonServices';
import { useLocation } from 'react-router';
import AddIcon from '@mui/icons-material/Add';


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





function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export default function GirdViewBon() {
    let query = useQuery();
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = useState([]);
    const [page, setPage] = React.useState(parseInt(query.get("page")));
    const [isLoading, setIsloading] = useState(true);
    const [numberPages, setNumberPages] = useState(0);
    const history = createBrowserHistory();
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event, value) => {
        setPage(value);
        const history = createBrowserHistory();
        history.push("/tableView/bons?page=" + value);
        window.location.reload();
    };

    useEffect(() => {

        BonServices.getAll(query.get("page")).then((res) => {
            setRows(res.data[0]);
            setNumberPages(res.data["pagination"])
            setIsloading(false);

        })

    }, []);
    if (AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1)
        return (
            <>
                <MainCard title="Liste des Bons">
                    <Stack
                        direction="row"
                        flexWrap="wrap-reverse"
                        alignItems="center"
                        justifyContent="flex-end"
                        sx={{ mb: 5 }}
                    >

                        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>

                            <Stack direction="row" spacing={3} flexShrink={0} sx={{ my: 1 }}>
                                <Button onClick={() => {
                                    history.push('/bon/add');
                                    window.location.reload();
                                }} variant="outlined" startIcon={<AddIcon />}>
                                    Ajouter</Button>
                            </Stack>


                        </Stack>
                    </Stack>


                    <TableContainer component={Paper}>
                        {isLoading ? (


                            <>
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((index) => (
                                    <GirdSkeleton key={index} />

                                ))}

                            </>
                        ) : (
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

                                        <StyledTableRow key={row.id} >

                                            <StyledTableCell >{row.code}</StyledTableCell>
                                            <StyledTableCell align="right">{row.reduction}dt</StyledTableCell>

                                            <StyledTableCell align="right" scope="row"  >

                                                <IconButton aria-label="edit" size="large" color="success">
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete" size="large" color="error" onClick={() => { setOpen(true) }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </StyledTableCell>
                                        </StyledTableRow>

                                    </>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
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
                            <Pagination color="primary" defaultPage={page} count={numberPages} variant="outlined" onChange={handleChange} />
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
