import React from 'react';
import { Content } from './Content';
import { Sidebar } from './Sidebar';

export const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Sidebar />
      <Content />
    </div>
  )
}
