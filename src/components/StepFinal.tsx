import { Snack } from '../models/snack.model'

type StepFinalProps = {
  snacks: Snack[];
  onRestart: () => void;
}
function StepFinal({ snacks, onRestart }: StepFinalProps) {
  return (
    <section>        
      <h1 className="animate__animated animate__lightSpeedInRight">{snacks[0]?.name}</h1>
      <h1 className="animate__animated animate__lightSpeedInRight">{snacks[1]?.name}</h1>
      <h1 className="animate__animated animate__lightSpeedInRight">{snacks[2]?.name}</h1>
      <button className="button secondary" onClick={onRestart}>RePlay</button>
    </section>
  )
}

export default StepFinal;