import CurrentCallDisplay from '../CurrentCallDisplay'

export default function CurrentCallDisplayExample() {
  return (
    <CurrentCallDisplay 
      currentCall="N34"
      recentCalls={["B5", "I23", "G56"]}
      status="Started"
    />
  )
}
