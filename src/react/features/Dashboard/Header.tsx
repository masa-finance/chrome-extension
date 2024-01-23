import React from 'react';
import { Button } from '../../components/Button';
import { useDashboardContext } from '../../contexts/DashboardContextProvider';
import { Row } from '../../components/Row';

export const Header = () => {

  const { initiateConnection, account } = useDashboardContext()

  let shortAccount = account;
  if (account) {
    shortAccount = account.slice(0, 6) + '...' + account.slice(-4);
  }

  return (
    <header className='dashboard-header'>
      <h1>Dashboard</h1>
      {account && <Row className='account-container'><img src="/icons/wallet-connected.png" alt="wallet-connected" />{shortAccount}</Row>}
      {!account && <Button className='btn-connect' onClick={initiateConnection}>Connect wallet</Button>}
    </header>
  )
}
