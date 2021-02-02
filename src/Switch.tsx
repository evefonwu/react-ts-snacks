/* Source: https://upmostly.com/tutorials/build-a-react-switch-toggle-component */

import './switch.css'

type SwitchProps = {
  isOn: boolean;
  handleToggle: () => void;
  onColor: string;
}
const Switch = ({ isOn, handleToggle, onColor }: SwitchProps) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: onColor }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;