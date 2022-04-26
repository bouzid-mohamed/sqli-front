import { useState } from 'react';
// material
import { Menu, Button, MenuItem, Typography } from '@mui/material';
// component
import HeightRoundedIcon from '@mui/icons-material/HeightRounded';
import { createBrowserHistory } from 'history';

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [

    { value: 'recent', label: 'Le plus récent', href: 'products?page=1' },
    { value: '1', label: 'Prix : haut-bas', href: 'products?page=1&order=2' },
    { value: '2', label: 'Prix : bas-haut', href: 'products?page=1&order=1' }
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
                    <a href={option.href} style={{ 'textDecoration': 'none' }} key={option.value}>
                        <MenuItem

                            selected={option.value === 'recent'}
                            onClick={() => {
                                handleClose();
                                const history = createBrowserHistory();
                                history.push("products");
                                window.location.reload();

                            }}
                            sx={{ typography: 'body2' }}

                        >
                            {option.label}
                        </MenuItem>
                    </a>
                ))}
            </Menu>
        </>
    );
}
