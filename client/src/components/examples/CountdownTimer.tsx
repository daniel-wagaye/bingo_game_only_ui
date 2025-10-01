import CountdownTimer from '../CountdownTimer'

export default function CountdownTimerExample() {
  return (
    <CountdownTimer 
      seconds={30}
      onComplete={() => console.log('Countdown complete!')}
    />
  )
}
