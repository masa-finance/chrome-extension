import React from 'react';
import { Column } from '../../components/Column';
import { Row } from '../../components/Row';

export const Sidebar = () => {
  return (
    <div className='sidebar'>
      <img src='/masalogo.png' className='sidebar-logo' width='100' />

      <Column className='sidebar-item-container'>
        <Row className='sidebar-item'><img src="/icons/dashboard-icon.png" alt="dashboard-icon"></img><p>Dashboard</p></Row>
        <Row className='sidebar-item'><img src="/icons/referral-icon.png" alt="referral-icon"></img><p>Referrals</p></Row>
      </Column>
    </div>
  )
}
