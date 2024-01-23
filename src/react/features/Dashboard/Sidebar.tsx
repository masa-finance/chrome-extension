import React from 'react';
import { Column } from '../../components/Column';
import { SidebarItem } from './SidebarItem';
import { useRouter } from '../../hooks/useRouter';

export const Sidebar = () => {
  const { page } = useRouter()

  return (
    <div className='sidebar'>
      <img src='/masalogo.png' className='sidebar-logo' width='100' />

      <Column className='sidebar-item-container'>
        <SidebarItem to="" currentPage={page} icon="dashboard-icon.png" title="Dashboard" />
        {/* <SidebarItem to="referral" currentPage={page} icon="referral-icon.png" title="Referrals" /> */}
      </Column>
    </div>
  )
}
