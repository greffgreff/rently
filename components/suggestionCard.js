import Styling from '../styles/suggestionCard.module.css';

export default function SuggestionCard({ isNew }) {
  return <div className={Styling.container} style={{ background: (isNew == null) | (isNew == '') ? 'grey' : 'blue' }}></div>;
}
