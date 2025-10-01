import NumberGrid from '../NumberGrid'
import { useState } from 'react'

export default function NumberGridExample() {
  const [selected, setSelected] = useState<number | null>(null)
  
  return (
    <NumberGrid 
      max={400} 
      selected={selected}
      othersSelected={[5, 12, 23, 45, 67, 89]}
      onSelect={(num) => {
        console.log('Selected:', num)
        setSelected(selected === num ? null : num)
      }}
    />
  )
}
