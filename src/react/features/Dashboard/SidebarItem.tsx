import React from 'react';
import { Row } from "../../components/Row"

export const SidebarItem = ({ currentPage, to, title, icon }) => {
    return <a href={`dashboard.html?page=${to}`} className='sidebar-item-link'>
        <Row className={`sidebar-item ${currentPage === to ? "selected" : ""}`}>
            <img src={`/icons/${icon}`} alt="referral-icon"></img>
            <p>{title}</p>
        </Row>
    </a>
}