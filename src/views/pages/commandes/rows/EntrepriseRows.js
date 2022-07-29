import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Avatar, Button, Chip, Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import Swal from 'sweetalert2';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import CheckIcon from '@mui/icons-material/Check';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';


const ITEM_HEIGHT = 48;


export default function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openA = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>

                </TableCell>
                <TableCell align="left">{row.id}</TableCell>
                <TableCell component="th" scope="row">
                    {row.client.nom + ' ' + row.client.prenom}
                </TableCell>
                <TableCell align="center">{row.client.email}</TableCell>
                <TableCell align="right">{row.numTel}</TableCell>
                <TableCell align="right">{row.addresse}</TableCell>
                <TableCell align="right">{row.gouvernerat}</TableCell>
                <TableCell align="right">{row.delegation}</TableCell>
                <TableCell align="right">{row.prix}</TableCell>
                <TableCell align="right">{(row.status === 'nouvelle') ? (
                    <Chip icon={<FiberNewIcon />} label="Nouvelle" color="success" variant="outlined" />
                )
                    : (null)}
                    {(row.status === 'confirmationClient') ? (
                        <Chip icon={<CheckIcon />} label="Confirmée par le client" color="primary" variant="outlined" />
                    )
                        : (null)}

                    {(row.status === 'confirmationPoste') ? (
                        <Chip icon={<AssuredWorkloadIcon />} label="Confirmée par la poste" color="primary" />
                    )
                        : (null)}
                    {(row.status === 'affectationPoste') ? (
                        <Chip icon={<AssignmentTurnedInIcon />} label="Affectée a la poste" color="success" />
                    )
                        : (null)}
                    {(row.status === 'finie') ? (
                        <Chip icon={<ThumbUpOffAltIcon />} label="Finie" color="success" />
                    )
                        : (null)}
                    {(row.status === 'annulee') ? (
                        <Chip icon={<CancelIcon style={{ color: "white" }} />} label="Annulée" style={{ backgroundColor: "red", color: "white" }} />
                    )
                        : (null)}

                    {(row.status === 'affecterLivreur') ? (
                        <Chip icon={<DeliveryDiningIcon />} label="Affecter à un livreur " color="success" />
                    )
                        : (null)}
                    {(row.status === 'retour') ? (
                        <Chip icon={<CancelIcon style={{ color: "white" }} />} label="Retour" style={{ backgroundColor: "red", color: "white" }} />
                    )
                        : (null)}

                </TableCell>

                <TableCell align="right">
                    {(row.status === ('confirmationClient') || row.status === ('affectationPoste') || row.status === ('nouvelle')) ? (
                        <div>
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? 'long-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <SettingsApplicationsIcon color="primary" fontSize="large" />
                            </IconButton>
                            <Menu
                                id="long-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'long-button',
                                }}
                                anchorEl={anchorEl}
                                open={openA}
                                onClose={handleClose}
                                PaperProps={{
                                    style: {
                                        maxHeight: ITEM_HEIGHT * 4.5,
                                        width: '20ch',
                                    },
                                }}
                            >
                                {(row.status === 'confirmationClient') ? (
                                    <div>
                                        <MenuItem onClick={() => { props.handleaffecterposte(row) }}>
                                            Affectation Poste
                                        </MenuItem>
                                        <MenuItem onClick={() => { props.handleAnnulee(row) }}>
                                            Annulée
                                        </MenuItem></div>)
                                    : (null)}

                                {(row.status === 'affectationPoste') ? (
                                    <div>

                                        <MenuItem onClick={() => { props.handleAnnulee(row) }}>
                                            Annulée
                                        </MenuItem></div>)
                                    : (null)}
                                {(row.status === 'nouvelle') ? (
                                    <div>

                                        <MenuItem onClick={() => { props.handleConfirmation(row) }}>
                                            Confirmer
                                        </MenuItem></div>)
                                    : (null)}


                            </Menu>
                        </div>
                    )
                        : <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                            disabled>

                            <SettingsApplicationsIcon fontSize="large" />
                        </IconButton>}

                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Détail commande
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell align="right">Nom</TableCell>
                                        <TableCell align="right">Couleur</TableCell>
                                        <TableCell align="right">Taille</TableCell>
                                        <TableCell align="right">quantité</TableCell>
                                        <TableCell align="right">prix pièce </TableCell>
                                        <TableCell align="right">prix total </TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.lignesCommandes.map((l) => (
                                        <TableRow key={l.id}>
                                            <TableCell align="right" scope="row">
                                                <Avatar sx={{ width: 150, height: 100 }} src={"http://localhost:8000/uploads/" + l?.stock?.produit?.images[0].nom} variant="square" />
                                            </TableCell>
                                            <TableCell align="right">{l?.stock?.produit?.nom}</TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" style={{ "backgroundColor": l?.stock?.couleur, "color": l?.stock?.couleur }} >
                                                    .
                                                </Button>
                                            </TableCell>
                                            <TableCell align="right">{l?.stock?.taille}</TableCell>
                                            <TableCell align="right">{l?.quantite}</TableCell>
                                            {l?.stock?.produit.promotion ? (
                                                <>
                                                    <TableCell align="right">
                                                        <Box sx={{ display: 'inline-flex' }} variant="subtitle1">
                                                            <>
                                                                <Typography
                                                                    component="span"
                                                                    variant="body1"
                                                                    sx={{
                                                                        color: 'text.disabled',
                                                                        textDecoration: 'line-through'
                                                                    }}
                                                                >
                                                                    {l?.stock?.produit.prix} dt
                                                                </Typography>
                                                                &nbsp;
                                                                {Math.trunc(l?.stock?.produit.prix - (l?.stock?.produit.prix * l?.stock?.produit.promotion?.pourcentage / 100))} dt
                                                            </>
                                                        </Box>

                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Box sx={{ display: 'inline-flex' }} variant="subtitle1">
                                                            <>
                                                                <Typography
                                                                    component="span"
                                                                    variant="body1"
                                                                    sx={{
                                                                        color: 'text.disabled',
                                                                        textDecoration: 'line-through'
                                                                    }}
                                                                >
                                                                    {l?.stock?.produit.prix * l?.quantite} dt



                                                                </Typography>
                                                                &nbsp;
                                                                {Math.trunc((l?.stock?.produit.prix - (l?.stock?.produit.prix * l?.stock?.produit.promotion?.pourcentage / 100)) * l.quantite)} dt
                                                            </>
                                                        </Box>

                                                    </TableCell>
                                                </>

                                            ) : (
                                                <TableCell align="right">
                                                    <Typography
                                                        component="span"
                                                        variant="body1"
                                                        sx={{
                                                            color: 'text.disabled',
                                                        }}
                                                    >
                                                        {l?.stock?.produit.prix}dt
                                                    </Typography>
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    ))
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}