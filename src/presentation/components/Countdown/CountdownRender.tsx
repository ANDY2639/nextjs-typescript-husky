import { CountdownRenderProps, zeroPad } from "react-countdown"

const CountdownRender: React.FC<CountdownRenderProps> = ({ minutes, seconds }) => {
  return <>{zeroPad(minutes)}:{zeroPad(seconds)}</>
}

export default CountdownRender
