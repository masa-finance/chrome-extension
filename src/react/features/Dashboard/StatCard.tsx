import { ReactNode } from "react"
import { PercentChange } from "./PercentChange"

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
  columnWidth: number,
  percentChange: number,
  stats: Stat[],
  link?: Link
}

export const StatCard = ({
  title,
  subTitle,
  columnWidth,
  percentChange,
  stats,
  link,
}: StatCardProps) => {
  return (
    <div className='stat-card' style={{gridColumn: `span ${columnWidth}`}}>
      <header>
        <h3 className='stat-card-title'>{title}</h3>
        <div className='percent-change-pill'>
          <PercentChange value={percentChange}/>
        </div>
      </header>
      <h4 className='stat-card-subtitle'>{subTitle}</h4>
      <section className='stats'>
        {stats.map(statData => {
          return (
            <div className='stat'>
              <h5 className='stat-label'>{statData.label}</h5>
              <p className='stat-value'>{statData.value}</p>
            </div>
          )
        })}
        {link && <a className='stat-card-link' href={link.url}>{link.label}</a>}
      </section>
    </div>
  )
}
