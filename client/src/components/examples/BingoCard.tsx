import BingoCard from '../BingoCard'

export default function BingoCardExample() {
  const sampleNumbers = [
    1, 16, 31, 46, 61,
    2, 17, 32, 47, 62,
    3, 18, 0, 48, 63,
    4, 19, 33, 49, 64,
    5, 20, 34, 50, 65
  ]
  
  return (
    <div className="space-y-4">
      <BingoCard numbers={sampleNumbers} daubed={[1, 17, 33, 49, 65]} size="sm" />
    </div>
  )
}
