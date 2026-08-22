import {useState, useEffect } from 'react'
import {useParams, useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'


export default function AttendanceDetailPage() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [attendance, setAttendance] = useState(null)

    useEffect(() => {
        const fetchAttendance = async() => {
            try{
                const response = await api.get (`/attendance/${id}`)
                setAttendance (response.data)
            }catch (error) {
                console.loh(error)
            }
        }
        fetchAttendance()
    }, [id])

    const handleDelete = async () => {
        const confirmed = window.confirm('Remove this from your list?')
        if(!confirmed) return

        try{
            await api.delete(`/attendance/${id}`)
            navigate('/my-list')
        } catch (error){
            console.log (error)
        }
    }

    if(!attendance) return <p className="detail-page">Loading</p>

    return (
        <div className="detail-page">
            <Link to="/my-list" className="details-back"> &larr; Back to my list </Link>

            <div className="card detail-card">
                <span className="tag">{attendance.event?.genre} </span>
                <p className="detail-name">{attendance.event?.artistName} </p>
                <p className="detail-venue">
                    {attendance.event?.venueCity}, {attendance.event?.venueCountry} .{''}
                    {new Date(attendance.event?.date).toLocaleDateString()}
                </p>

                <div className="detail-info">
                    {attendance.status === 'attended' && (
                        <>

                        <p className="detail-label" Your Rating ></p>
                        <p className="detail-rating">
                            {attendance.rating ? '*'.repeat(attendance.rating): 'Not rated'}
                        </p>
                        
                        </>
                    )}

                    <p className="detail-label">Notes</p>
                    <p className="detail-notes">{attendance.noted || 'No notes yet' } </p>
                </div>

                <div className="detail-actions">
                    <Link to={`/attendance/${id}/edit`} className="button-secondary">
                      Edit
                    </Link>

                    <button className="button-delete" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}