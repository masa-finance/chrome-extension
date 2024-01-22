import { PercentChange } from './PercentChange';

const Changeline = () => {
  return (
    <div className='change-line'>
      <PercentChange value={-60}/>
      <span>vs last week</span>
    </div>
  )
}

export const TotalPoints = () => {
  return (
    <div className='total-points'>
      <h2>Points Earned</h2>
      <h1>12,390</h1>
      <Changeline />
    </div>
  )
}
