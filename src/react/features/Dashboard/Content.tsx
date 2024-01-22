import { Header } from './Header';
import { TotalPoints } from './TotalPoints';
import { ActivityMetrics } from './ActivityMetrics';
 
export const Content = () => {
  return (
    <div className='content'>
      <Header />
      <TotalPoints />
      <ActivityMetrics />
    </div>
  )
}
