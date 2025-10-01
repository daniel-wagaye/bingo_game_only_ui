import WinnerPopup from '../WinnerPopup'
import { useState } from 'react'

export default function WinnerPopupExample() {
  const [show, setShow] = useState(true)
  
  const sampleCard = [
    1, 16, 31, 46, 61,
    2, 17, 32, 47, 62,
    3, 18, 0, 48, 63,
    4, 19, 33, 49, 64,
    5, 20, 34, 50, 65
  ]
  
  if (!show) return <button onClick={() => setShow(true)} className="p-4 bg-primary text-white rounded">Show Popup</button>
  
  return (
    <WinnerPopup 
      winners={["John Doe"]}
      winningCard={sampleCard}
      prize={1000}
      countdown={10}
      onClose={() => setShow(false)}
    />
  )
}
