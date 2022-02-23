import Styling from '../styles/logo.module.css'

export default function Logo() {
  return (
    <Link href="/about">
      <div className={Styling.logo}>
          <div className={Styling.text}>Rently</div>
      </div>
    </Link>
  )
}
