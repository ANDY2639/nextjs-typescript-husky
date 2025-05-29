import ReactCountdown from 'react-countdown'
import CountdownRender from './CountdownRender'
import { CountdownProps } from './CountdownConfig'

const Countdown: React.FC<CountdownProps> = ({ date, onComplete }) => {
  return (
    <ReactCountdown
      date={date}
      onComplete={onComplete}
      renderer={(props) => <CountdownRender {...props} />}
    />
  )
}

export default Countdown
