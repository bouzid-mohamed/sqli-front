import PropTypes from 'prop-types';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
});

const IconStyle = styled('div')(({ theme }) => ({
    marginLeft: -4,
    borderRadius: '50%',
    width: theme.spacing(2),
    height: theme.spacing(2),
    border: `solid 2px ${theme.palette.background.paper}`,
    boxShadow: `inset -1px 1px 2px ${alpha(theme.palette.common.black, 0.24)}`
}));

// ----------------------------------------------------------------------

ColorPreview.propTypes = {
    limit: PropTypes.number,
    product: PropTypes.object

};

export default function ColorPreview({ product, limit = 3, ...other }) {
    const showColor = product.stoks?.slice(0, limit);
    const moreColor = product.stoks?.length - limit;


    return (
        <RootStyle component="span" {...other}>
            {showColor?.map((s, index) => (
                <IconStyle key={s.id + index} sx={{ bgcolor: s.couleur }} />
            ))}

            {product.stoks?.length > limit && <Typography variant="subtitle2">{`+${moreColor}`}</Typography>}
        </RootStyle>
    );
}
