import Styling from '../styles/advertCard.module.css';

export default function AdvertCard({ urgent }) {
  return (
    <div className={`${Styling.container} ${urgent ? Styling.urgent : null}`}>
      <div className={Styling.placeholderImage} />
      <p></p>
    </div>
  );
}
