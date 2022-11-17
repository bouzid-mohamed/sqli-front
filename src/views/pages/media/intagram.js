import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import MainCard from 'ui-component/cards/MainCard';
import { useEffect, useState } from 'react';
import GirdSkeleton from 'ui-component/cards/Skeleton/MediaGirdSkeleton';
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';
import MediaServices from 'services/media-services/MediaServices';
import { Link } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from '@mui/material';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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





export default function Instagram() {
    const [rows, setRows] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const history = createBrowserHistory();
    const [open, setOpen] = useState(false);
    const [idDelete, setIdDelete] = useState(0);

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        MediaServices.getInstagramList().then((res) => {
            setRows(res.data);
            setIsloading(false)
        })

    }, []);

    const deleteInstagramFeed = () => {
        setOpen(false);
        setIsloading(true);
        MediaServices.deleteInstagram(idDelete.id).then(() => {

            MediaServices.getInstagramList().then((res) => {
                setRows(res.data);
                setIsloading(false)
                toast(" Lien instagram est supprimer avec succès");
            })

        })
    }
    if (AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1)

        return (
            <>
                <MainCard title="Instagram section">
                    <Stack
                        direction="row"
                        flexWrap="wrap-reverse"
                        alignItems="center"
                        justifyContent="flex-end"
                        sx={{ mb: 5 }}
                    >

                        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>

                            <Stack direction="row" spacing={3} flexShrink={0} sx={{ my: 1 }}>
                                <Link to={'/instagram/add'} style={{ textDecoration: 'none' }}>
                                    <Button variant="outlined" startIcon={<AddIcon />}>
                                        Ajouter</Button>
                                </Link>
                            </Stack>


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
                                        <StyledTableCell align="center">Url</StyledTableCell>
                                        <StyledTableCell align="center">Actions</StyledTableCell>


                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.id} >
                                            <StyledTableCell align="center" scope="row">
                                                <Avatar sx={{ width: 160, height: 150 }} src={"http://localhost:8000/uploads/" + row.image} variant="square" />
                                            </StyledTableCell>

                                            {row.url === null ? (<StyledTableCell align="center">--</StyledTableCell>) : (<StyledTableCell align="center">{row.url}</StyledTableCell>)}

                                            <StyledTableCell align="center" scope="row"  >
                                                <Link to={"/media/edit/" + row.id} style={{ textDecoration: 'none' }}>
                                                    <IconButton aria-label="edit" size="large" color="success">
                                                        <EditIcon />
                                                    </IconButton>
                                                </Link>
                                                <IconButton aria-label="delete" size="large" color="error" onClick={() => { setOpen(true); setIdDelete(row) }}>
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

                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {"Voulez-vous supprimer ce lien "}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Let Google help apps determine location. This means sending anonymous
                                            location data to Google, even when no apps are running.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Annuler</Button>
                                        <Button onClick={deleteInstagramFeed} autoFocus>
                                            Confirmer
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>) : (null)}


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
