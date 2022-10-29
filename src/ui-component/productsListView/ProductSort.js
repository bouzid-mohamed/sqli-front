import { useState } from 'react';
// material
import { Menu, Button, MenuItem, Typography } from '@mui/material';
// component
import HeightRoundedIcon from '@mui/icons-material/HeightRounded';
import { createBrowserHistory } from 'history';
import { useLocation } from 'react-router';

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [

    { value: 'recent', label: 'Le plus récent', href: 'products?page=1' },
    { value: '1', label: 'Prix : haut-bas', href: 'products?page=1&order=2' },
    { value: '2', label: 'Prix : bas-haut', href: 'products?page=1&order=1' }
];

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export default function ShopProductSort(props) {
    const [open, setOpen] = useState(null);
    let query = useQuery();

    const [choice, setChoice] = useState(query.get("order") != null ? (query.get("order")) : 0)

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
                    {SORT_BY_OPTIONS[choice].label}
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
                {SORT_BY_OPTIONS.map((option, index) => (

                    <MenuItem

                        selected={option.value === SORT_BY_OPTIONS[choice].value}
                        onClick={() => {
                            setChoice(index)
                            handleClose();
                            props.handleOrder(option.value);

                        }}
                        sx={{ typography: 'body2' }}

                    >
                        {option.label}
                    </MenuItem>

                ))}
            </Menu>
        </>
    );
}
