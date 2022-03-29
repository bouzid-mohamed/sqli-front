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
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';
import CategorieServices from 'services/categories-services/CategorieServices';
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




export default function GirdViewCategorie() {
    let query = useQuery();

    const history = createBrowserHistory();
    const a = () => {
        return true;
    }
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = useState([]);
    const [page, setPage] = React.useState(parseInt(query.get("page")));
    const [isLoading, setIsloading] = useState(true);
    const [numberPages, setNumberPages] = useState(0);
    const handleChange = (event, value) => {
        setPage(value);
        const history = createBrowserHistory();
        history.push("/tableView/bons?page=" + value);
        window.location.reload();
    };

    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {

        CategorieServices.getAllPagination(query.get("page")).then((res) => {
            setRows(res.data[0]);
            setNumberPages(res.data["pagination"])
            setIsloading(false);
        })

    }, []);
    if (AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1) {

        return (
            <>
                <MainCard title="Liste des Categories">


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
                                        <StyledTableCell>Nom Ctaegorie</StyledTableCell>
                                        <StyledTableCell align="left">Famille</StyledTableCell>
                                        <StyledTableCell align="right">Actions</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (<>





                                        <StyledTableRow key={row.id} >

                                            <StyledTableCell >{row.nom}</StyledTableCell>
                                            <StyledTableCell align="right">
                                                <TreeView
                                                    aria-label="file system navigator"
                                                    defaultCollapseIcon={<ExpandMoreIcon />}
                                                    defaultExpandIcon={<ChevronRightIcon />}
                                                    sx={{ height: 80, flexGrow: 1, maxWidth: 120, overflowY: 'auto' }}
                                                >

                                                    <TreeItem nodeId={Math.random().toString(36)} key={Math.random().toString(36).substr(2, 9)} label={row.nom}>

                                                        {row.catFils[0] != null ? (
                                                            row.catFils.map((fr) => (
                                                                <TreeItem key={fr.id} nodeId={Math.random().toString(36)} label={fr.nom}>
                                                                    {fr.catFils[0] != null ? (
                                                                        fr.catFils.map((fr1) => (
                                                                            <TreeItem key={fr1.id} nodeId={Math.random().toString(36)} label={fr1.nom} />
                                                                        ))

                                                                    ) : (null)}

                                                                </TreeItem>

                                                            ))

                                                        ) : (null)}
                                                    </TreeItem>
                                                </TreeView>

                                            </StyledTableCell>

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
    }
    else {
        history.push('/login');
        window.location.reload();
    }
}
