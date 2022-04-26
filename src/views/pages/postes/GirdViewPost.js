import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
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
import postServices from 'services/post-services/postServices';
import { useLocation } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





function useQuery() {
    return new URLSearchParams(useLocation().search);
}


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





export default function GirdViewPromotion() {
    let query = useQuery();
    const [numberPages, setNumberPages] = useState(0);
    const history = createBrowserHistory();
    const [rows, setRows] = useState([]);
    const [page, setPage] = React.useState(parseInt(query.get("page")));
    const [isLoading, setIsloading] = useState(true);

    const handleChange = (event, value) => {
        setPage(value);
        const history = createBrowserHistory();
        history.push("/post/list?page=" + value);
        window.location.reload();
    };

    useEffect(() => {
        postServices.getAll(query.get("page")).then((res) => {
            setRows(res.data[0]);
            setNumberPages(res.data["pagination"])
            setIsloading(false);
        })
        //setTimeout(() => { setLoading(false); }, 2000);

    }, []);







    if (AuthService.getCurrentUser().roles.indexOf("ROLE_POSTE") > -1)


        return (
            <>
                <MainCard title="Liste des promotions">

                    <Stack
                        direction="row"
                        flexWrap="wrap-reverse"
                        alignItems="center"
                        justifyContent="flex-end"
                        sx={{ mb: 5 }}
                    >

                        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>

                            <Stack direction="row" spacing={3} flexShrink={0} sx={{ my: 1 }}>
                                <Button href='/post/add' variant="outlined" startIcon={<AddIcon />}>
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
                                        <StyledTableCell>Image</StyledTableCell>
                                        <StyledTableCell align="right">Gouvernerat</StyledTableCell>
                                        <StyledTableCell align="right">Délegation</StyledTableCell>
                                        <StyledTableCell align="right">NumTel</StyledTableCell>
                                        <StyledTableCell align="right">Email</StyledTableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (




                                        <StyledTableRow key={row.id} >


                                            <StyledTableCell align="right" scope="row">
                                                <Avatar sx={{ width: 150, height: 100 }} src={`http://localhost:8000/uploads/` + row.photo} variant="square" />
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{row.gouvernerat}</StyledTableCell>
                                            <StyledTableCell align="right">{row.delegation}%</StyledTableCell>
                                            <StyledTableCell align="right">{row.numTel}</StyledTableCell>
                                            <StyledTableCell align="right">{row.email}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                        <Stack direction="row-reverse" marginTop={"2%"}>
                            <Pagination color="primary" defaultPage={page} count={numberPages} variant="outlined" onChange={handleChange} />
                        </Stack>
                    </TableContainer>
                    <ToastContainer />
                </MainCard>

            </>

        );
    else {
        history.push('/login');
        window.location.reload();
    }
}
