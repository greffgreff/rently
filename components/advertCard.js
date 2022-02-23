import styling from '../styles/advertCard.module.css'

export default function AdvertCard({ urgent }) {
  return (
    <div className={`${styling.container} ${urgent ? styling.urgent : null}`}>
      <div className={styling.placeholderImage} />
      <p>Some title</p>
    </div>
  )
}
