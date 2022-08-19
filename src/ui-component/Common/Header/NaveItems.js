import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

// import Img
import banner from '../../../assets/img/common/nav_banner.png'

const NaveItems = (props) => {

    return (
        <>
            {props.item.mega_menu ? (
                <li className="has-dropdown has-megaitem">
                    <a href={props.item.href}>{props.item.name} <i className="fa fa-angle-down"></i></a>
                    <div className="mega-menu">
                        <ul className="mega-menu-inner">
                            {props.item.children.map((item, index) => (
                                <li className="mega-menu-item" key={index}>
                                    <p className="mega-menu-item-title" > <a href={item.href}>{item.name}</a></p>
                                    <ul className="mega-menu-sub">
                                        {item.children.map((datas, index) => (
                                            <li key={index}><a href={datas.href}>{datas.name}</a></li>
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
                                        <a to={data.href}>{data.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </li>) : (<li className="has-dropdown">
                            <a href={props.item.href} className="main-menu-link">{props.item.name} </a>

                        </li>)}

                </>

            )}

        </>
    )
}

export default NaveItems
