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

            <svg width="100%" height="14" className="mylist-divider" viewBox="0 0 1000 14" preserveAspectRatio="none">
        <path
          d="M0,7 Q12,0 25,7 T50,7 T75,7 T100,7 T125,7 T150,7 T175,7 T200,7 T225,7 T250,7 T275,7 T300,7 T325,7 T350,7 T375,7 T400,7 T425,7 T450,7 T475,7 T500,7 T525,7 T550,7 T575,7 T600,7 T625,7 T650,7 T675,7 T700,7 T725,7 T750,7 T775,7 T800,7 T825,7 T850,7 T875,7 T900,7 T925,7 T950,7 T975,7 T1000,7"
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="2"
        />
      </svg>

            <div className ="mylist-grid" >
                {filtered.length === 0 && <p className ="mylist-empty">Nothing here yet!</p>}
                {filtered.map((attendance)=> (
                    <Link 
                    key={attendance._id}
                    to={`/attendances/${attendance._id}`}
                    className="mylist-card"
                    >
                        <div>
                            <span className="tag">{attendance.event?.genre}</span>
                            <p className="mylist-card-name">{attendance.event?.artistName}</p>
                            <p className="mylist-card-venue">{attendance.event?.venueCity}, {attendance.event?.venueCountry}</p>

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