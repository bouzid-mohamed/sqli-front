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

import MainCard from 'ui-component/cards/MainCard';
import { useEffect, useState } from 'react';
import GirdSkeleton from 'ui-component/cards/Skeleton/MediaGirdSkeleton';
import AuthService from 'services/auth-services/AuthService';
import { createBrowserHistory } from 'history';
import MediaServices from 'services/media-services/MediaServices';








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





export default function MediaGird() {
    const [rows, setRows] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const history = createBrowserHistory();





    useEffect(() => {


        MediaServices.getList().then((res) => {
            setRows(res.data);
            setIsloading(false)
        })

    }, []);
    if (AuthService.getCurrentUser().roles.indexOf("ROLE_ENTREPRISE") > -1)

        return (
            <>
                <MainCard title="Liste des médias">






                    <TableContainer component={Paper}>
                        {isLoading ? (


                            <>
                                {[0, 1, 2].map((index) => (
                                    <GirdSkeleton key={index} />

                                ))}

                            </>
                        ) : (
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Image</StyledTableCell>
                                        <StyledTableCell align="center">Nom</StyledTableCell>
                                        <StyledTableCell align="center">Titre</StyledTableCell>
                                        <StyledTableCell align="center">Texte</StyledTableCell>
                                        <StyledTableCell align="center">Url</StyledTableCell>
                                        <StyledTableCell align="center">Actions</StyledTableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.id} >
                                            <StyledTableCell align="center" scope="row">
                                                <Avatar sx={{ width: 360, height: 120 }} src={"http://localhost:8000/uploads/" + row.image} variant="square" />
                                            </StyledTableCell>
                                            {row.nom === 1 ? (<StyledTableCell align="center">photo de couverture</StyledTableCell>
                                            ) : row.nom === 2 ? (<StyledTableCell align="center">Bannière supérieur</StyledTableCell>) : (<StyledTableCell align="center">Bannière inférieur</StyledTableCell>)}
                                            {row.titre === null ? (<StyledTableCell align="center">--</StyledTableCell>) : (<StyledTableCell align="center">{row.titre}</StyledTableCell>)}

                                            {row.description === null ? (<StyledTableCell align="center">--</StyledTableCell>) : (<StyledTableCell align="center">{row.description}</StyledTableCell>)}
                                            {row.url === null ? (<StyledTableCell align="center">--</StyledTableCell>) : (<StyledTableCell align="center">{row.url}</StyledTableCell>)}



                                            <StyledTableCell align="center" scope="row"  >

                                                <IconButton aria-label="edit" size="large" color="success" href={"/media/edit/" + row.id}>
                                                    <EditIcon />
                                                </IconButton>

                                            </StyledTableCell>
                                        </StyledTableRow>


                                    ))}
                                </TableBody>
                            </Table>
                        )}


                    </TableContainer>

                </MainCard>

            </>

        );
    else {
        history.push('/login');
        window.location.reload();
    }

}
