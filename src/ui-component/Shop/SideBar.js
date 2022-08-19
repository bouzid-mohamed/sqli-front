import React, { useEffect, useState } from 'react'
// Import Img
import search from '../../assets/img/svg/search.svg'
import { useSelector } from "react-redux";
import { useLocation, useParams } from 'react-router';
import { Checkbox, CircularProgress, createMuiTheme, FormControlLabel, FormGroup, LinearProgress, Radio, RadioGroup } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import CategorieServices from 'services/categories-services/CategorieServices';
import { Box } from '@mui/system';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import CircleChecked from '@material-ui/icons/CheckCircleOutline';
import { createBrowserHistory } from 'history';
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export const FILTER_PRICE_OPTIONS = [
    { value: '1', label: 'Prix : bas-élevé' },
    { value: '2', label: 'Prix: élevé-bas' },

];

const commonStyles = {
    color: 'green',
    ml: 4,

};
const commonStyles3 = {
    color: '#5a33aa',
    ml: 8,

};

const commonStyles2 = {
    bgcolor: 'background.paper',
    marginBottom: 1,
    border: 1,
    width: '100%',
    borderRadius: '14px',
    borderStyle: 'dotted'
};
const SideBar = (props) => {

    const [rows, setRows] = React.useState([]);
    let query = useQuery();
    const [list] = React.useState([]);
    const [pChecked, setPChecked] = React.useState(0);

    const [ch, setch] = React.useState([]);
    const [price, setPrice] = useState(0)
    const [isLoading, setIsloading] = React.useState(true);
    const params = useParams();
    const [searchValue, setSearchValue] = useState('');

    useEffect(
        () => {
            if (query.get('search') != null) {
                setSearchValue(query.get('search'))
            }
            if (query.get("filter")) {
                var myArray = query.get("filter").split(',');
                myArray.filter((e) => {
                    list.push(parseInt(e))
                })
            }
            if (query.get("order")) {
                setPChecked(parseInt(query.get("order")))
            }
            var i = 0;
            CategorieServices.getAllFront(params.idE).then((res) => {
                var a = [];
                res.data.filter((c) => {

                    if (c.catPere == null) {
                        c.num = i;
                        if (list.indexOf(parseInt(c.id)) > -1) {
                            ch.push(true)
                        }
                        else {
                            ch.push(false)
                        }
                        i = i + 1;
                        var a1 = [];
                        if (c.catFils.length > 0) {
                            c.catFils.filter((fils1) => {
                                fils1.num = i;
                                if (list.indexOf(parseInt(fils1.id)) > -1) {
                                    ch.push(true)
                                }
                                else {
                                    ch.push(false)
                                }

                                i = i + 1;
                                var a2 = [];
                                if (fils1.catFils.length > 0) {
                                    fils1.catFils.filter((fils2) => {
                                        fils2.num = i;
                                        if (list.indexOf(parseInt(fils2.id)) > -1) {
                                            ch.push(true)
                                        }
                                        else {
                                            ch.push(false)
                                        }

                                        i = i + 1;
                                        a2.push(fils2)
                                    })
                                    fils1.catFils = a2

                                }
                                a1.push(fils1)
                            })
                            c.catFils = a1

                        }
                        c.catFils = a1
                        a.push(c)
                    }

                })
                setRows(a);
                setIsloading(false);

            })
        }, [],
    )


    const handleChangePrice = (e) => {
        if (price === 1) {

            setPrice(2)
            setPChecked(2)
        }
        else {
            setPrice(1)
            setPChecked(1)
        }
    }
    const handleChangeParent = (e, item) => {
        if (ch[item.num] === false) {
            const updatedArray = [...ch];
            updatedArray[item.num] = true;
            //  setch(updatedArray);
            list.push(e.target.value)
            if (item.catFils.length > 0) {
                item.catFils.map((enfant) => {
                    updatedArray[enfant.num] = true;
                    if (enfant.catFils.length > 0) {
                        enfant.catFils.map((enfant2) => {
                            updatedArray[enfant2.num] = true;
                        })
                    }
                })
            }
            setch(updatedArray);
            console.log(ch)
        }
        else {
            const updatedArray = [...ch];
            updatedArray[item.num] = false;
            setch(updatedArray);
            console.log(ch)
            list.splice(list.indexOf(e.target.value))
        }
    }
    const handleClicFilter = () => {
        const history = createBrowserHistory();
        if (price === 0) {
            history.push(params.idE + '?page=1&filter=' + list);

        } else {
            history.push(params.idE + '?page=1&filter=' + list + '&order=' + price);

        }
        window.location.reload();
    }
    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const history = createBrowserHistory();
            history.push(params.idE + "?page=1&search=" + searchValue);
            window.location.reload();
        }
    }
    return (
        <>
            <div className="col-lg-3">
                <div className="shop_sidebar_wrapper">
                    <div className="shop_Search">
                        <form>
                            <input type="text" className="form-control" placeholder="Chercher..." value={searchValue}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown} />
                            <button onClick={(e) => { e.preventDefault(); window.location.href = params.idE + "?page=1&search=" + searchValue }} ><img src={search} alt="img" /></button>
                        </form>
                    </div>
                    <div className="shop_sidebar_boxed">
                        <div >
                            <h4>Catégories de produits</h4>
                            {isLoading ? (<LinearProgress color="inherit" />
                            ) : (<FormGroup >
                                {rows.map((item, index) => (
                                    item.catPere == null ? (
                                        <Box key={index} sx={{ ...commonStyles2, borderColor: '#9e9e9e' }}  >
                                            < FormControlLabel
                                                sx={{ ml: 0.2, color: 'primary.main' }}
                                                control={
                                                    < Checkbox
                                                        icon={<CircleUnchecked />}
                                                        checkedIcon={<RadioButtonCheckedIcon style={{ color: '#ff7004' }} />}
                                                        value={item.id}
                                                        onChange={(e, i) => handleChangeParent(e, item)}
                                                        checked={ch[item.num]}
                                                    />
                                                }
                                                label={item.nom}
                                            />
                                            <div key={item.id}  >
                                                {
                                                    item.catFils.length > 0 ?
                                                        item.catFils.map((fils) =>
                                                            <div key={fils.id}>

                                                                < FormControlLabel sx={{ ...commonStyles }}
                                                                    control={
                                                                        < Checkbox
                                                                            icon={<CircleUnchecked />}
                                                                            checkedIcon={<RadioButtonCheckedIcon style={{ color: '#ff7004' }} />}
                                                                            value={fils.id}
                                                                            onChange={(e, item) => handleChangeParent(e, fils)}
                                                                            checked={ch[fils.num]}
                                                                        />
                                                                    }
                                                                    label={fils.nom}
                                                                />
                                                                {fils.catFils.length > 0 ? fils.catFils.map((f) =>
                                                                    <div key={f.id}>
                                                                        < FormControlLabel sx={{ ...commonStyles3 }}
                                                                            control={
                                                                                < Checkbox
                                                                                    icon={<CircleUnchecked />}
                                                                                    checkedIcon={<RadioButtonCheckedIcon style={{ color: '#ff7004' }} />}
                                                                                    value={f.id}
                                                                                    onChange={(e, item) => handleChangeParent(e, f)}
                                                                                    checked={ch[f.num]}
                                                                                />
                                                                            }
                                                                            label={f.nom}
                                                                        />
                                                                    </div>) : (null)}
                                                            </div>
                                                        ) : (null)
                                                }
                                            </div>
                                        </Box>
                                    ) : (null)
                                ))}
                                <div className="shop_sidebar_boxed">
                                    <h4>Prix</h4>
                                    <div className="price_filter" >
                                        <RadioGroup   >
                                            < FormControlLabel
                                                value={1}
                                                control={<Checkbox icon={<CircleUnchecked />}
                                                    checkedIcon={<RadioButtonCheckedIcon style={{ color: '#ff7004' }} />} />}
                                                label='Prix : bas-élevé'
                                                onChange={handleChangePrice}
                                                checked={true ? pChecked === 1 : false}
                                            />
                                            < FormControlLabel
                                                value={2}
                                                control={<Checkbox icon={<CircleUnchecked />}
                                                    checkedIcon={<RadioButtonCheckedIcon style={{ color: '#ff7004' }} />} />}
                                                label='Prix: élevé-bas'
                                                onChange={handleChangePrice}
                                                checked={true ? pChecked === 2 : false}

                                            />
                                        </RadioGroup>
                                    </div>
                                </div>
                                <div className="clear_button" style={{ marginTop: '15px' }} >
                                    <button className="theme-btn-one btn_sm btn-black-overlay" type="button" onClick={handleClicFilter}>Filtrer les résultats</button>
                                </div>
                            </FormGroup>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar
