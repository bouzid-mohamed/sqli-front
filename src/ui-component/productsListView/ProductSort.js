import { useState } from 'react';
// material
import { Menu, Button, MenuItem, Typography } from '@mui/material';
// component
import HeightRoundedIcon from '@mui/icons-material/HeightRounded';

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
    { value: 'categorie', label: 'Categorie' },
    { value: 'recent', label: 'Le plus récent' },
    { value: 'priceDesc', label: 'Prix : haut-bas' },
    { value: 'priceAsc', label: 'Prix : bas-élevé' }
];

export default function ShopProductSort() {
    const [open, setOpen] = useState(null);

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    return (
        <>
            <Button
                color="inherit"
                disableRipple
                onClick={handleOpen}
                endIcon={<HeightRoundedIcon />}
            >
                Trier par:&nbsp;
                <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    Le plus récent
                </Typography>
            </Button>
            <Menu
                keepMounted
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                {SORT_BY_OPTIONS.map((option) => (
                    <MenuItem
                        key={option.value}
                        selected={option.value === 'recent'}
                        onClick={handleClose}
                        sx={{ typography: 'body2' }}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
