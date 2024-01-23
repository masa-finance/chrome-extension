import React from 'react';
import { StatCard } from './StatCard';
import { useDashboardContext } from '../../contexts/DashboardContextProvider';

export const ActivityMetrics = () => {
  const { metricsData } = useDashboardContext()

  if (!metricsData) {
    return <div>Loading</div>
  }
  return (
    <section className='activity-metrics'>
      <header className='metrics-header'>
        <section>
          <h2 className='metrics-title'>
            Activity Metrics
          </h2>
          <h3 className='metrics-subtitle'>
            Earn 1 point for every event tracked in the metrics below
          </h3>
        </section>
        <section className='coming-soon'>
          <div className='coming-soon-badge'>
            Coming soon
          </div>
          <p>Claim Rewards</p>
        </section>
      </header>

      <section className='stats-section'>
        {metricsData.map(cardData => {
          return <StatCard {...cardData} />
        })}
      </section>
    </section>
  )
}
