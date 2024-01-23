import { StatCard } from './StatCard';

const DATA = [
  {
    title: 'Browsing',
    subTitle: 'vs last week',
    percentChange: 40,
    columnWidth: 1,
    stats: [
      {
        label: 'Page views',
        value: '3,248'
      },
    ],
  },
  {
    title: 'Masa',
    subTitle: 'All time',
    percentChange: 12,
    columnWidth: 1,
    stats: [
      {
        label: 'Logins',
        value: '133'
      },
      {
        label: (
          <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-xsmall)'}}>
            7 day 10x
            <div className="help-icon">
              <img src='icons/question-mark-in-circle.svg' width='19' height='19' />
              <div className='tooltip'>
                <h5 className='tooltip-title'>Weekly 10X login</h5>
                <p className='tooltip-body'>Login everyday of the week to Masa and 10X all your points for that week.</p>
              </div>
            </div>
          </div>
        ),
        value: '1 of 7'
      },
    ],
  },
  {
    title: 'Wallet activity',
    subTitle: 'vs last week',
    columnWidth: 2,
    percentChange: 200,
    stats: [
      {
        label: 'Swap',
        value: '133'
      },
      {
        label: 'Bridge',
        value: '44'
      },
      {
        label: 'Wallet',
        value: '55'
      },
    ],
  },
  {
    title: 'Referred friends',
    subTitle: 'vs last week',
    columnWidth: 2,
    percentChange: -12,
    link: {
      label: 'Invite more friends',
      url: '#',
    },
    stats: [
      {
        label: 'Invites',
        value: '67'
      },
      {
        label: 'Registered',
        value: '29'
      },
    ],
  },
  {
    title: 'Minted',
    subTitle: 'vs last week',
    columnWidth: 2,
    link: {
      label: 'Mint another soul',
      url: '#',
    },
    percentChange: 77,
    stats: [
      {
        label: 'Tokens',
        value: '67'
      },
      {
        label: 'Souls',
        value: '29'
      },
    ],
  },
  {
    title: 'Dex trade',
    subTitle: 'vs last week',
    columnWidth: 1,
    percentChange: 40,
    stats: [
      {
        label: 'Trades',
        value: '3,248'
      },
    ],
  },
  
]

export const ActivityMetrics = () => {
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
        {DATA.map(cardData => {
          return <StatCard {...cardData}/>
        })}
      </section>
    </section>
  )
}
