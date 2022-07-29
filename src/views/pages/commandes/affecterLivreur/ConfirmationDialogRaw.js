import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import LivreurServices from 'services/livreur-services/LivreurServices';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';



ConfirmationDialogRaw.propTypes = {
    onClose: PropTypes.func.isRequired,
    handleOk: PropTypes.func.isRequired,
    setVal: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    openAlert: PropTypes.bool.isRequired,
};

export default function ConfirmationDialogRaw(props) {
    const { onClose, setVal, handleOk, openAlert, value: valueProp, open, ...other } = props;
    const [value, setValue] = React.useState(valueProp);
    const radioGroupRef = React.useRef(null);
    const [options, setOptions] = React.useState([]);
    const [loading, setLoading] = React.useState(true);


    React.useEffect(
        () => {

            LivreurServices.getList().then((res) => {
                setOptions(res.data)
                setLoading(false);
            });


        }, [], () => {
            if (!open) {
                setValue(valueProp);
            }
        }, [valueProp, open]

    );



    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleCancel = () => {
        onClose();
    };



    const handleChange = (event) => {
        setValue(event.target.value);
        setVal(event.target.value)
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            TransitionProps={{ onEntering: handleEntering }}
            open={open}
            {...other}
        >
            <DialogTitle>Choisir un livreur</DialogTitle>
            <DialogContent dividers>
                {loading ? (<Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>) : (
                    options[0] == null ? ('vous n avez pas des livreurs') : (<RadioGroup
                        ref={radioGroupRef}
                        aria-label="ringtone"
                        name="ringtone"
                        value={value}
                        onChange={handleChange}
                    >
                        {options.map((option) => (
                            <FormControlLabel
                                value={option.id}
                                key={option.id}
                                control={<Radio />}
                                label={option.nom + ' ' + option.prenom}
                            />
                        ))}
                    </RadioGroup>)
                )}
                {openAlert ? (<Alert severity="error">Il faut choisir un livreur !</Alert>) : (null)}



            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}