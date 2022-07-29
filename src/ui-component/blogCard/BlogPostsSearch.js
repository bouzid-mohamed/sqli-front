import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { TextField, Autocomplete, InputAdornment } from '@mui/material';
// component
import ElevatorIcon from '@mui/icons-material/Elevator';
import SearchIcon from '@mui/icons-material/Search';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    '& .MuiAutocomplete-root': {
        width: 200,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter
        }),
        '&.Mui-focused': {
            width: 240,
            '& .MuiAutocomplete-inputRoot': {
                boxShadow: theme.customShadows
            }
        }
    },
    '& .MuiAutocomplete-inputRoot': {
        '& fieldset': {
            borderWidth: `1px !important`,
            borderColor: `${theme.palette.grey[500_32]} !important`
        }
    },
    '& .MuiAutocomplete-option': {
        '&:not(:last-child)': {
            borderBottom: `solid 1px ${theme.palette.divider}`
        }
    }
}));

// ----------------------------------------------------------------------

BlogPostsSearch.propTypes = {
    posts: PropTypes.array.isRequired
};

export default function BlogPostsSearch({ posts }) {
    return (
        <RootStyle>
            <Autocomplete
                size="small"
                disablePortal
                popupIcon={null}
                options={posts}
                getOptionLabel={(post) => post.title}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Search post..."
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <>
                                    <InputAdornment position="start">
                                        < SearchIcon
                                            sx={{
                                                ml: 1,
                                                width: 20,
                                                height: 20,
                                                color: 'text.disabled'
                                            }}
                                        />
                                    </InputAdornment>
                                    {params.InputProps.startAdornment}
                                </>
                            )
                        }}
                    />
                )}
            />
        </RootStyle>
    );
}