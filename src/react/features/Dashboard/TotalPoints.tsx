import React from 'react';
import { useDashboardContext } from '../../contexts/DashboardContextProvider';
import { PercentChange } from './PercentChange';

const Changeline = ({ value }) => {
  return (
    <div className='change-line'>
      <PercentChange value={value} />
      <span>vs last week</span>
    </div>
  )
}

export const TotalPoints = () => {

  const { metrics, isLoading } = useDashboardContext()
  return (
    <div className='total-points'>
      <h2>Points Earned</h2>
      <h1 className={`${isLoading ? "skeleton" : ''}`}>{metrics?.totalCount}</h1>
      {metrics?.average_progress && <Changeline value={metrics?.average_progress} />}
    </div>
  )
}
