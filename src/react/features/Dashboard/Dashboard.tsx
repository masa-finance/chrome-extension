import React from 'react';
import { Content } from './Content';
import { Sidebar } from './Sidebar';
import { useDashboardContext } from '../../contexts/DashboardContextProvider';
import { Header } from './Header';

export const Dashboard = () => {
    const { account, isLoading } = useDashboardContext()
    return (

        <div className='dashboard'>
            <Sidebar />
            {isLoading && <p>IS LOADING</p>}
            {!isLoading && account && <Content />}
            {!isLoading && !account && <div className='content'>
                <Header /><p>Hey connect your account</p></div>}
        </div>

    )
}
