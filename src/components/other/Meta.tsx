import Styling from './styles/meta.module.css'

export default function Meta() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const current = new Date()
  const date = `${months[current.getMonth()]} ${current.getDate()}`

  return (
    <div className={Styling.container}>
      <div className={Styling.left}>
        <div className={Styling.locale}>
          <i className="fa fa-location-arrow" />
          Sarreguemines
        </div>
        <div>{date}</div>
      </div>
      <div className={Styling.locale}>
        <i className="fa fa-globe" />
        <b>EN</b>
      </div>
    </div>
  )
}
