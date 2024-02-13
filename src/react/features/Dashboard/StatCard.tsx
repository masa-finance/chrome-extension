import React from 'react';
import { ReactNode } from "react"
import { PercentChange } from "./PercentChange"
import { Tooltip } from './Tooltip';
import { EnableTracking } from '../../components/EnableTracking';

type Stat = {
  label: ReactNode,
  value: string,
}

type Link = {
  label: string,
  url: string,
}

type StatCardProps = {
  title: string,
  subTitle: string,
  percentChange: number,
  stats: Stat[],
  link?: Link,
  isLoading?: boolean,
  isComingSoon?: boolean,
  tooltip?: string,
  tooltipExtra: ReactNode,
  pointValue: number
}

export const StatCard = ({
  title,
  subTitle,
  percentChange,
  stats,
  link,
  isLoading,
  isComingSoon,
  tooltip,
  tooltipExtra,
  pointValue,
}: StatCardProps) => {
  if (isLoading) {
    return (
      <div className='stat-card skeleton' style={{ gridColumn: 'span 2' }}>
        <header>
          <h3 className='stat-card-title'>{title}</h3>
          {(!percentChange || percentChange === 0) && <div className='percent-change-pill-skeleton' />}
          {percentChange && percentChange !== 0 && <div className='percent-change-pill'>
            <PercentChange value={percentChange} />
          </div>}
        </header>
        <h4 className='stat-card-subtitle'>{subTitle}</h4>
        <section className='stats'>
          {stats.map(statData => {
            return (
              <div className='stat'>
                <h5 className='stat-label'>{statData.label}</h5>
                <p className='stat-value'>.</p>
              </div>
            )
          })}
        </section>
      </div>
    )
  }
  return (
    <div className='stat-card' style={{ gridColumn: 'span 2' }}>
      <header>
        <h3 className='stat-card-title'>
          {title}
          {tooltip && (
            <Tooltip
              title={title}
              description={tooltip}
              body={tooltipExtra}
              pointValue={`+${pointValue}`}
            />
          )}
        </h3>
        {!isComingSoon && <>{percentChange && percentChange !== 0 && <div className='percent-change-pill'>
          <PercentChange value={percentChange} />
        </div>}</>}

        {isComingSoon && <div className='coming-soon-badge'>
          Coming soon
        </div>}
      </header>
      {!isComingSoon && <h4 className='stat-card-subtitle'>{subTitle}</h4>}
      <section className='stats'>
        {stats.map(statData => {
          return (
            <div className='stat'>
              <h5 className='stat-label'>{statData.label}</h5>
              <p className={`stat-value ${isComingSoon ? "coming-soon" : ""}`}>{statData.value}</p>
            </div>
          )
        })}
        {link && <a className={`stat-card-link ${isComingSoon ? "coming-soon" : ""}`} target='_blank' href={link.url}>{link.label}</a>}
        {title === 'Browsing' && (
          <div className='tracking-toggle'>Enable to earn points <EnableTracking /></div>
        )}
      </section>
    </div>
  )
}
