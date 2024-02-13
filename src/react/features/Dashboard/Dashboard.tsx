import React from 'react';
import { Content } from './Content';
import { Sidebar } from './Sidebar';
import { useDashboardContext } from '../../contexts/DashboardContextProvider';
import { Header } from './Header';
import IntroPage from './IntroPage';

export const Dashboard = () => {
  const { account, isLoading } = useDashboardContext()
  
  return (
    <div className='dashboard'>
      <Sidebar />
      {account && <Content />}
      {!isLoading && !account && (
        <div className='content'>
          <Header />
          <IntroPage />
        </div>
      )}
    </div>

  )
}
