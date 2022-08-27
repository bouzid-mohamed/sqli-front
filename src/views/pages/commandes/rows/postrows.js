import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Chip, Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import CancelIcon from '@mui/icons-material/Cancel';

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
                <TableCell align="left">{row?.lignesCommandes[0]?.stock?.entreprise?.nom}</TableCell>
                <TableCell component="th" scope="row">
                    {row.client.nom + ' ' + row.client.prenom}
                </TableCell>
                <TableCell align="center">{row.client.email}</TableCell>
                <TableCell align="center">{row.numTel}</TableCell>
                <TableCell align="center">{row?.lignesCommandes[0]?.stock?.entreprise?.numTel}</TableCell>

                <TableCell align="right">{row.addresse}</TableCell>
                <TableCell align="right">{row.gouvernerat}</TableCell>
                <TableCell align="right">{row.delegation}</TableCell>
                <TableCell align="right">{row.prix}</TableCell>
                <TableCell align="right">

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
                    {(row.status === ('affectationPoste') || row.status === ('confirmationPoste') || row.status === ('retour')) ? (
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
                                {(row.status === 'affectationPoste') ? (
                                    <div>
                                        <MenuItem onClick={() => { props.handleConfirmationposte(row) }}>
                                            Confirmation Poste
                                        </MenuItem>
                                    </div>)
                                    : (null)}
                                {(row.status === 'confirmationPoste') ? (
                                    <div>
                                        <MenuItem onClick={() => { props.handleAffecterLivreur(row) }}>
                                            Affecter à un livreur
                                        </MenuItem></div>)
                                    : (null)}
                                {(row.status === 'retour') ? (
                                    <div>
                                        <MenuItem onClick={() => { props.handleAffecterLivreur(row) }}>
                                            Affecter à un livreur
                                        </MenuItem></div>)
                                    : (null)}
                                {(row.status === 'affecterLivreur') ? (
                                    <div>
                                        <MenuItem onClick={() => { props.handleConfirmation(row) }}>
                                            Affecter à un livreur
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
                            <Typography gutterBottom component="div">
                                <span style={{ color: 'red' }}> Addresse commande </span>  : {row.addresse + ' ' + row.delegation + ' ' + row.gouvernerat}
                            </Typography>
                            <Typography gutterBottom component="div">
                                {row.livreur != null ? (<>Remarque :  Votre commande attribué au livreur {row.livreur.nom + row.livreur.prenom}</>) : (<> Remarque :Commande non encore attribué à un livreur</>)}
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}