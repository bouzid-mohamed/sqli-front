import React, { useEffect, useState } from 'react'
// Import Img
import searchImg from '../../assets/img/svg/search.svg'
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
    const [list, setList] = React.useState([]);
    const [pChecked, setPChecked] = React.useState(0);
    let choosenCat = useSelector((state) => state.products.choosenCat);
    const [ch, setch] = React.useState([]);
    const [price, setPrice] = useState(0)
    const [isLoading, setIsloading] = React.useState(true);
    const params = useParams();
    const [search, setSearch] = useState('');

    useEffect(
        () => {
            if (query.get('search') != null) {
                setSearch(query.get('search'))
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
                res.data[0].filter((c) => {
                    if (c.catPere == null) {
                        c.num = i;
                        if (list.indexOf(parseInt(c.id)) > -1) {
                            ch.push({ in: true, id: c.id })
                        }
                        else {
                            ch.push({ in: false, id: c.id })
                        }
                        i = i + 1;
                        var a1 = [];
                        if (c.catFils.length > 0) {

                            c.catFils.filter((fils1) => {

                                fils1.num = i;
                                if (list.indexOf(parseInt(fils1.id)) > -1 || ch[i - 1].in === true) {
                                    ch.push({ in: true, id: fils1.id })
                                }
                                else {
                                    ch.push({ in: false, id: fils1.id })
                                }

                                i = i + 1;
                                var a2 = [];
                                if (fils1.catFils.length > 0) {
                                    fils1.catFils.filter((fils2) => {
                                        fils2.num = i;
                                        if (list.indexOf(parseInt(fils2.id)) > -1 || ch[i - 1].in === true) {
                                            ch.push({ in: true, id: fils2.id })
                                        }
                                        else {
                                            ch.push({ in: false, id: fils2.id })
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

    useEffect(() => {
        let l = []
        ch.forEach((c) => {
            c.in = false
        })
        if (query.get("filter") && choosenCat > 0) {
            var myArray = query.get("filter").split(',');
            myArray.filter((e) => {
                l.push(parseInt(e))
                ch.forEach((c) => {
                    if (c.id === parseInt(e)) {
                        c.in = true
                    }
                })

            })

            props.refrchOrderFilter(l, price)
        }

    }, [choosenCat])


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
    const handleChangeParent = (e, item, fother, grandF) => {
        console.log(grandF)
        if (ch[item.num].in === false) {
            const updatedArray = [...ch];
            updatedArray[item.num].in = true;
            list.push(e.target.value)
            if (item.catFils.length > 0) {
                item.catFils.map((enfant) => {
                    updatedArray[enfant.num].in = true;
                    if (enfant.catFils.length > 0) {
                        enfant.catFils.map((enfant2) => {
                            updatedArray[enfant2.num].in = true;
                        })
                    }
                })
            }

            setch(updatedArray);
        }
        else {
            const updatedArray = [...ch];
            updatedArray[item.num].in = false;
            if (item.catFils.length > 0) {
                item.catFils.map((enfant) => {
                    updatedArray[enfant.num].in = false;
                    if (enfant.catFils.length > 0) {
                        enfant.catFils.map((enfant2) => {
                            updatedArray[enfant2.num].in = false;
                        })
                    }

                })
            }
            if (item.catPere != null) {
                updatedArray.forEach((p) => {

                    if (p.id === item.catPere) {
                        p.in = false
                        if (grandF != null) {

                            updatedArray.forEach((gf) => {
                                if (gf.id === grandF.id) {
                                    gf.in = false
                                }
                            })
                        }

                    }
                })

            }

            setch(updatedArray);
            list.splice(list.indexOf(e.target.value))
        }
    }

    const handleClicFilter = () => {
        var l = []
        ch.filter((elem) => {
            if (elem.in == true)
                l.push(elem.id)
        })
        props.refrchOrderFilter(l, price)

    }
    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            props.refrchSearch(search)
        }
    }
    return (
        <>
            <div className="col-lg-3" >
                <div className="shop_sidebar_wrapper">
                    <div className="shop_Search">
                        <form action='#'>
                            <input type="text" className="form-control" placeholder="Chercher..." value={search}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyDown} />
                            <button type="button" onClick={() => { props.refrchSearch(search) }} ><img src={searchImg} alt="img" /></button>
                        </form>
                    </div>
                    <div className="shop_sidebar_boxed">
                        <div >
                            <h4>Catégories </h4>
                            {isLoading ? (<LinearProgress color="primary" />
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
                                                        onChange={(e, i) => handleChangeParent(e, item, null, null)}
                                                        checked={ch[item.num].in}
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
                                                                            onChange={(e, item) => handleChangeParent(e, fils, item, null)}
                                                                            checked={ch[fils.num].in}
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
                                                                                    onChange={(e, item) => handleChangeParent(e, f, fils, rows[index])}
                                                                                    checked={ch[f.num].in}
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
