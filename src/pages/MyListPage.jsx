import {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import api from '../api/axios'

export default function MyListPage () {
    const [attendances, setAttendance] = useState([])
    const [filter, setFilter] = useState('attended')

    useEffect(() => {
        const fetchAttendance = async() => {
            try {
                const response = await api.get ('/attendances')
                setAttendance(response.data)

            }catch (error) {
                console.log(error)
            }
        }
        fetchAttendance()
    }, [])

    const filtered = attendances.filter((a)=> a.status === filter)

    return (
        <div className="mylist-page">
            <h1>My List</h1>

            <div className="mylist-filters">
                <span 
                className={filter === 'attended' ? 'filter-pill active': 'filter-pill'}
                onClick={() => setFilter ('attended')}>
                    Attendend . {attendances.filter ((a) => a.status === 'attended').length}
                </span>

                <span
                className={filter === 'wishlist' ? 'filter-pill active' : 'filter-pill'}
                onClick={() => setFilter ('wishlist')}>
                    Wishlist . {attendances.filter ((a) => a.status === 'wishlist').length}
                </span>

            </div>

            <div className ="mylist-items" >
                {filtered.length === 0 && <p className ="mylist-empty">Nothing here yet!</p>}
                {filtered.map((attendance)=> (
                    <Link 
                    key={attendance._id}
                    to={`/attendances/${attendance._id}`}
                    className="card mylist-item"
                    >
                        <div>
                            <p className="event-name">{attendance.event?.artistName}</p>
                            <p className="event-details">{attendance.event?.venueCity}, {attendance.event?.venueCountry}</p>

                                                    </div>
                                {attendance.status === 'attended' && attendance.rating && (
                                    <p className="mylist-rating">{'*'.repeat(attendance.rating)}</p>
                                )}
                    </Link>

                ))}
            </div>
            
        </div>
    )
}