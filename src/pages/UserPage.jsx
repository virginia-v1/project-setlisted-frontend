import {useState, useEffect, useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import api from '../api/axios'
import Loading from '../components/Loading'


export default function UserPage () {
    const {user, logout} = useContext(AuthContext)
    const [attendance, setAttendance] = useState ([])

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await api.get('/attendances')
                setAttendance(response.data)
            } catch (error){
                console.log(error)
            }
        }
        fetchAttendance()
    }, [])

    if(!user) return <Loading/>

    const attendedCount = attendance.filter((a) => a.status === 'attended').length
    const wishlistCount = attendance.filter((a) => a.status === 'wishlist').length

    return (
    <div className="user-page">
      <div className="user-card">
        <div className="user-avatar">
          {user.username?.charAt(0).toUpperCase()}
        </div>

        <h1>Hello! Welcome {user.username}</h1>

        <div className="user-stats">
          <div className="stat-box stat-attended">
            <p className="stat-number">{attendedCount}</p>
            <p className="stat-label">Attended</p>
          </div>
          <div className="stat-box stat-wishlist">
            <p className="stat-number">{wishlistCount}</p>
            <p className="stat-label">Wishlist</p>
          </div>
        </div>

        <button className="button-signout" onClick={logout}>
          Sign Out
        </button>
      </div>
    </div>
  )
}