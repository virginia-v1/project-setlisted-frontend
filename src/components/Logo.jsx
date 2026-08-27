import logoImg from '../assets/logo.png'


export default function Logo({ auth }) {
  return (
    <img src={logoImg} alt="Setlisted" className={auth? "auth-logo-image" : "logo-image"}/>

  )
}