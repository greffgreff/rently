import Styling from './styles/logo.module.css'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" passHref>
      <div className={Styling.logo}>
        <div className={Styling.text}>Rently.io</div>
      </div>
    </Link>
  )
}
