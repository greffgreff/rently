import Styling from '../styles/input.module.css';
import { v4 as uuid } from 'uuid';

export default function Input({ options }) {
  return (
    <select className={`${Styling.input} ${Styling.primary}`}>
      {options.map((t) => {
        return <option key={uuid()}>{t}</option>;
      })}
    </select>
  );
}
