import React from 'react'
import { Header } from './Header';
import { TotalPoints } from './TotalPoints';
import { ActivityMetrics } from './ActivityMetrics';
import { useRouter } from '../../hooks/useRouter';

export const Content = () => {
  const { page } = useRouter()
  
  return (
    <div className='content'>
      <Header />

      {!page && <>
        <TotalPoints />
        <ActivityMetrics />
      </>}

      {page === "referrals" && <><h2>Referrals</h2></>}

    </div>
  )
}
