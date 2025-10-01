import PhoneNumberRequest from '../PhoneNumberRequest'

export default function PhoneNumberRequestExample() {
  return (
    <PhoneNumberRequest 
      onRequest={() => console.log('Phone number requested')}
    />
  )
}
