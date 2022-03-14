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

function createData(nom, fils) {
    return { nom, fils };
}

const rows = [
    createData('CAT1', ['fils1', 'fils2']),
    createData('CAT2', ['fils3', 'fils4']),
    createData('CAT3', ['fils5', 'fils6']),
    createData('CAT4', ['fils7', 'fils8']),
    createData('CAT5', ['fils9', 'fils10']),
    createData('CAT6', ['fils11', 'fils12']),
    createData('CAT7', ['fils13', 'fils14']),
    createData('CAT8', ['fils15', 'fils16']),
    createData('CAT9', ['fils17', 'fils18']),
    createData('CAT10', ['fils19', 'fils20']),
];


export default function GirdViewCategorie() {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        //setTimeout(() => { setLoading(false); }, 2000);
        setLoading(false);
    }, []);
    return (
        <>
            <MainCard title="Liste des Categories">


                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Nom Ctaegorie</StyledTableCell>
                                <StyledTableCell align="left">Sous categorie</StyledTableCell>
                                <StyledTableCell align="right">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (<>

                                {isLoading ? (
                                    <GirdSkeleton loading={isLoading}> </GirdSkeleton>
                                ) : (


                                    <StyledTableRow key={row.nom} >

                                        <StyledTableCell >{row.nom}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            <TreeView
                                                aria-label="file system navigator"
                                                defaultCollapseIcon={<ExpandMoreIcon />}
                                                defaultExpandIcon={<ChevronRightIcon />}
                                                sx={{ height: 80, flexGrow: 1, maxWidth: 120, overflowY: 'auto' }}
                                            >

                                                <TreeItem nodeId="1" label={row.nom}>
                                                    <TreeItem nodeId="2" label={row.fils[0]} >
                                                        <TreeItem nodeId="3" label={row.fils[1]} ></TreeItem >
                                                    </TreeItem >
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
}
