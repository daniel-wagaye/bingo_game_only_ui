import MasterCallingSheet from '../MasterCallingSheet'

export default function MasterCallingSheetExample() {
  return (
    <MasterCallingSheet 
      calledNumbers={[5, 12, 23, 34, 45, 56, 67]}
      currentNumber={67}
    />
  )
}
