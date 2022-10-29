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
import Button from '@mui/material/Button';
import MainCard from 'ui-component/cards/MainCard';
import { useEffect, useState } from 'react';
import { Divider, InputBase, Pagination } from '@mui/material';
import GirdSkeleton from 'ui-component/cards/Skeleton/GirdSkeleton';
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';
import postServices from 'services/post-services/postServices';
import { useLocation } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';





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
    const [page, setPage] = React.useState(query.get("page") != null ? parseInt(query.get("page")) : 1);
    const [isLoading, setIsloading] = useState(true);
    const [searchValue, setSearchValue] = useState(query.get("search") != null ? (query.get("search")) : '');
    const [reload, setRelaoad] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        const history = createBrowserHistory();
        if (searchValue != '') {
            history.push("/post/list?page=" + value + "&search=" + searchValue);
        } else {
            history.push("/post/list?page=" + value);
        }
    };
    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const history = createBrowserHistory();
            history.push("/post/list?page=1&search=" + searchValue);
            setRelaoad(reload + 1)
        }
    }


    useEffect(() => {
        setIsloading(true);
        postServices.getAll(page, searchValue).then((res) => {
            setRows(res.data[0]);
            setNumberPages(res.data["pagination"])
            setIsloading(false);
        })

    }, [page, reload]);







    if (AuthService.getCurrentUser().roles.indexOf("ROLE_POSTE") > -1)


        return (
            <>
                <MainCard title="Liste des postes">



                    <Stack
                        direction="row"
                        flexWrap="wrap-reverse"
                        alignItems="center"
                        justifyContent="flex-end"
                        sx={{ mb: 5 }}
                    >

                        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                            <Stack direction="row" spacing={3} flexShrink={0} sx={{ my: 1 }}>
                                <Link to={'/post/add'} style={{ textDecoration: 'none' }}>
                                    <Button variant="outlined" startIcon={<AddIcon />}>
                                        Ajouter</Button>
                                </Link>
                            </Stack>


                        </Stack>
                    </Stack>

                    <Stack
                        direction="row"
                        flexWrap="wrap-reverse"
                        alignItems="center"
                        justifyContent="flex-end"
                        sx={{ mb: 5 }}

                    >


                        <Stack direction="row" spacing={3} flexShrink={0} sx={{ my: 1 }}>
                            <Paper style={{ 'border': "1px solid #5e35b1" }}
                                component="form"
                                sx={{ display: 'flex', alignItems: 'center', width: 400 }}
                            >

                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Rechercher"
                                    inputProps={{
                                        'aria-label': 'Rechercher'
                                    }}
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                    onKeyDown={handleKeyDown}


                                />
                                <IconButton onClick={event => {
                                    history.push("/post/list?page=1&search=" + searchValue)
                                    setRelaoad(reload + 1)
                                }
                                }
                                    aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                            </Paper>
                        </Stack>

                    </Stack>
                    <TableContainer component={Paper}>

                        {isLoading ? (


                            <>
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
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
                                            <StyledTableCell align="right">{row.delegation}</StyledTableCell>
                                            <StyledTableCell align="right">{row.numTel}</StyledTableCell>
                                            <StyledTableCell align="right">{row.email}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                        <Stack direction="row-reverse" marginTop={"2%"}>
                            <Pagination color="primary" page={page} count={numberPages} variant="outlined" onChange={handleChange} />
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
