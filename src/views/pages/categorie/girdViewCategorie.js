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
import Button from '@mui/material/Button';
import MainCard from 'ui-component/cards/MainCard';
import { useEffect, useState } from 'react';
import { Divider, InputBase, Pagination } from '@mui/material';
import GirdSkeleton from 'ui-component/cards/Skeleton/GirdSkeleton';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';
import CategorieServices from 'services/categories-services/CategorieServices';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

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



function ChildModal(props) {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
        props.onclose();
    }
    const confirm = () => {
        setOpen(false);
        props.onclose();
        props.onConfirm();
    }
    useEffect(() => {
        setOpen(props.open)
    }, [props.open])

    return (
        <React.Fragment>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: "50%" }}>
                    <h2 id="child-modal-title">voulez vous vraiment supprimer la categorie {props.catDelete?.nom}</h2>
                    <p id="child-modal-description">
                        La suppression d'une catégorie supprimera tous ses produits !

                    </p>
                    <Button onClick={confirm}>Confirmer</Button>
                    <Button onClick={handleClose}>Annuler</Button>

                </Box>
            </Modal>
        </React.Fragment>
    );
}
export default function GirdViewCategorie() {
    let query = useQuery();

    const history = createBrowserHistory();

    const [open, setOpen] = React.useState(false);
    const [openChild, setOpenChild] = React.useState(false);

    const [rows, setRows] = useState([]);
    const [page, setPage] = React.useState(query.get("page") != null ? parseInt(query.get("page")) : 1);
    const [isLoading, setIsloading] = useState(true);
    const [numberPages, setNumberPages] = useState(0);
    const [idDelete, setIdDelete] = useState(0);
    const [catDelete, setCatDelete] = useState(null);
    const [searchValue, setSearchValue] = useState('');


    const handleChange = (event, value) => {
        setPage(value);
        const history = createBrowserHistory();
        if (query.get('search') != null) {
            history.push("/girdView/categories?page=" + value + "&search=" + searchValue);
        } else {
            history.push("/girdView/categories?page=" + value);
        }

        window.location.reload();
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseChild = () => {
        setOpenChild(false);
    };


    useEffect(() => {
        if (query.get('search') != null) {
            setSearchValue(query.get('search'))
        }
        CategorieServices.getAllPagination(query.get("page"), query.get("search")).then((res) => {
            setRows(res.data[0]);
            setNumberPages(res.data["pagination"])
            setIsloading(false);
        })

    }, []);

    const deleteCategorie = () => {
        setOpen(false);
        setIsloading(true);
        CategorieServices.deleteCategorie(catDelete.id).then(() => {
            if (query.get('search') != null) {
                setSearchValue(query.get('search'))
            }
            CategorieServices.getAllPagination(query.get("page"), query.get("search")).then((res) => {
                setRows(res.data[0]);
                setNumberPages(res.data["pagination"])
                setIsloading(false);
                toast(" categorie " + catDelete.nom + " " + "est supprimer avec succès");

            })


        })
    }

    const handleCatDelete = (cat) => {
        setCatDelete(cat);
        setOpenChild(true);
        console.log(cat.id)


    }
    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const history = createBrowserHistory();
            history.push("/girdView/categories?page=1&search=" + searchValue);
            window.location.reload();
        }
    }
    if (AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1) {

        return (
            <>
                <MainCard title="Liste des Categories">
                    <Stack
                        direction="row"
                        flexWrap="wrap-reverse"
                        alignItems="center"
                        justifyContent="flex-end"
                        sx={{ mb: 5 }}

                    >


                        <Stack direction="row" spacing={3} flexShrink={0} sx={{ my: 1 }}>
                            <Button href={'/categorie/add'} variant="outlined" startIcon={<AddIcon />}>
                                Ajouter</Button>
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
                                <IconButton onClick={event => window.location.href = "/girdView/categories?page=1&search=" + searchValue
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
                                    {rows.map((row) => (
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


                                                <IconButton aria-label="delete" size="large" color="error" onClick={() => { handleOpen(); setIdDelete(row) }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </StyledTableCell>
                                        </StyledTableRow>


                                    ))}
                                </TableBody>
                            </Table>
                        )}
                        {
                            open ? (<div>

                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="parent-modal-title"
                                    aria-describedby="parent-modal-description"
                                >
                                    <Box sx={{ ...style, width: "35%" }} >
                                        <Grid
                                            container
                                            direction="column"
                                            alignItems="flex-start"
                                        >
                                            <h2 id="parent-modal-title">Choisissez la catégorie que vous souhaitez supprimer : </h2>

                                            <Button color="error" key={Math.random().toString(36).substr(2, 9)} onClick={() => { handleCatDelete(idDelete) }}>{idDelete.nom}</Button>

                                            {idDelete.catFils[0] != null ? (
                                                idDelete.catFils.map((fr) => (
                                                    <>
                                                        <Button color="error" key={fr.id} onClick={(id) => { handleCatDelete(fr) }}>{fr.nom}</Button>

                                                        {fr.catFils[0] != null ? (
                                                            fr.catFils.map((fr1) => (
                                                                <Button color="error" key={fr1.id} onClick={() => { handleCatDelete(fr1) }}>{fr1.nom}</Button>

                                                            ))

                                                        ) : (null)}



                                                    </>))

                                            ) : (null)}

                                            <ChildModal open={openChild} onclose={handleCloseChild} onConfirm={deleteCategorie} catDelete={catDelete} />
                                        </Grid>
                                    </Box>
                                </Modal>
                            </div>) : (null)}
                        <Stack direction="row-reverse" marginTop={"2%"}>
                            <Pagination color="primary" defaultPage={page} count={numberPages} variant="outlined" onChange={handleChange} />
                        </Stack>
                    </TableContainer>
                    <ToastContainer />

                </MainCard>

            </>

        );
    }
    else {
        history.push('/login');
        window.location.reload();
    }
}
