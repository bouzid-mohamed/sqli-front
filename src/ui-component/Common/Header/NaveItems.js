import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// import Img

const NaveItems = (props) => {
    let dispatch = useDispatch();

    const changeCtegory = () => {
        dispatch({ type: "products/changeCategorie", payload: 1 })
    }
    return (
        <>
            {props.item.mega_menu ? (
                <li className="has-dropdown has-megaitem">
                    <Link to={props.item.href}>{props.item.name} <i className="fa fa-angle-down"></i></Link>
                    <div className="mega-menu">
                        <ul className="mega-menu-inner">
                            {props.item.children.map((item, index) => (
                                <li className="mega-menu-item" key={index}>
                                    <p className="mega-menu-item-title" > <Link onClick={changeCtegory} to={item.href}>{item.name}</Link></p>
                                    <ul className="mega-menu-sub">
                                        {item.children.map((datas, index) => (
                                            <li key={index}><Link onClick={changeCtegory} to={datas.href}>{datas.name}</Link></li>
                                        ))}

                                    </ul>
                                </li>
                            ))}

                        </ul>
                    </div>
                </li>
            ) : (
                <>
                    {props.item.children.length > 0 ? (
                        <li className="has-dropdown">
                            <a href="#!" className="main-menu-link">{props.item.name} <i className="fa fa-angle-down"></i></a>
                            <ul className="sub-menu">
                                {props.item.children.map((data, index) => (
                                    <li key={index}>
                                        <Link onClick={changeCtegory} to={data.href}>{data.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </li>) : (<li className="has-dropdown">
                            <Link onClick={changeCtegory} to={props.item.href} className="main-menu-link">{props.item.name} </Link>

                        </li>)}

                </>

            )}

        </>
    )
}

export default NaveItems
