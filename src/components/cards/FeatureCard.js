import Styling from './styles/featureCard.module.css';

export default function FeatureCard({ title, desc }) {
  return (
    <div className={Styling.container}>
      <div className={Styling.innerContainer}>
        <h1>{title}</h1>
        <h3 className={Styling.desc}>{desc}</h3>
      </div>
    </div>
  );
}
