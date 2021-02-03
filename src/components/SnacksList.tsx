import { Snack } from '../models/snack.model'

type SnacksListProps = { 
  snacks: Snack[]
}

const SnacksList = ({ snacks }: SnacksListProps) => {
  return (
    <ul>
      {snacks && snacks.map((snack, index) => (
        <li key={index}>{snack.name}</li>
      ))}
    </ul>         
  )
}

export default SnacksList