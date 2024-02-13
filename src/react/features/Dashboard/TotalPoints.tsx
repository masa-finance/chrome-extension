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
  const percentChange = metrics?.progresses?.averageProgress;

    return (
    <div className='total-points'>
      <h2>Points Earned</h2>
      <h1 className={`${isLoading ? "skeleton" : ''}`}>{metrics?.points?.totalPoints}</h1>
      {percentChange && percentChange !== 0 ? <Changeline value={percentChange} /> : null}
    </div>
  )
}
