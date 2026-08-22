import {useState, useEffect, useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import api from '../api/axios'

export default function UserPage () {
    const {user, logout} = useContext(AuthContext)
    const [attendance, setAttendance] = useState ([])

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await api.get('/attendance')
                setAttendance(response.data)
            } catch (error){
                console.log(error)
            }
        }
        fetchAttendance()
    }, [])

    const attendedCount = attendance.filter((a) => a.status === 'attended').length
    const wishlistCount = attendance.filter((a) => a.status === 'wishlist').length

    return (
        <div className="user-page">
            <div className="user-card">
                <h1>Hello! Welcome {user.username} </h1>
            
            <div className="user-avatar">
              <div className="user-stats">
                <div className="stat-box stat-attended">
                    <p className="stat-number"> {attendedCount}</p>
                    <p className="stat-label">Attended</p>
                </div>
                <div className="stat-box stat-wishlist">
                    <p className="stat-number"> {wishlistCount}</p>
                    <p className="stat-label">Wishlist</p>
                  </div>
                 </div>
                 <button className="button-signout" onClick={logout}>
                    Sign Out
                 </button>
                </div>
            </div>
        </div>
    )
}