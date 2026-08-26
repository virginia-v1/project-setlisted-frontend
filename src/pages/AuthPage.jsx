import {useState, useContext} from "react"
import {AuthContext } from "../context/AuthContext"
import Logo from "../components/Logo"

export default function AuthPage() {
    const {login, signup } = useContext (AuthContext);
    const [logginIn, setLogginIn] = useState(true);
    const [error, setError] = useState ('');
    const [userInfo, setUserInfo] = useState({
        email: "",
        username: "",
        password: "",
    })

   const handleChange = (e) => {
    setUserInfo ((prev) => ({...prev, [e.target.name]: e.target.value}))
   }
   if (logginIn) {
    return (
        <div className = "auth-page">
            <div className="auth-logo-image"> 
                <Logo/>
                </div>
            <form 
            className="auth-card card"
            onSubmit= {(e) => {
                e.preventDefault ()
                const body = {
                    email: userInfo.email,
                    password: userInfo.password,
                }
                login(body);
            }}
            >
                <p className="auth-switch">
                    Don't have an account? {""}
                    <button type ="button" onClick ={() => setLogginIn(false)}>
                        Sign Up 
                        </button>
                </p>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                    type ="text"
                    name="email"
                    onChange={handleChange}
                    value={userInfo.email} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                     type="password"
                     name="password"
                     onChange={handleChange}
                     value={userInfo.password}/>

                </div>

                <button type="submit" className="button-primary">Login</button>

            </form>
        </div>
    )
   }
   return (
    <div className="auth-page">
        <form 
        className="auth-card card"
        onSubmit={(e) => {
            e.preventDefault()
            signup(
                {
                    email: userInfo.email,
                    username: userInfo.username,
                    password: userInfo.password,
                },
                setLogginIn,
                setUserInfo,
            )
            if (result && !result.success) {
      setError(result.error)
    } else {
      setError('')
    }
        }}
        >
            <p className="auth-switch">
                Already have an account? {""}
                <button type="button" onClick={() => setLogginIn(true)}>
                    Login
                </button>
            </p>

            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input 
                type="text"
                name="username"
                onChange={handleChange}
                value={userInfo.username} />

            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                type="email"
                name="email"
                onChange={handleChange}
                value={userInfo.email}/>
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                type="password"
                name="password"
                onChange={handleChange}
                value={userInfo.password}/>
            </div>

            <button type="submit" className="button-primary">Signup</button>
        
              {error && <p className="signup-error">{error}</p>}
        </form>
    </div>
   )
}