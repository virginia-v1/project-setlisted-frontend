import {useState, useEffect } from 'react'
import {useParams, useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'


export default function AttendanceDetailPage() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [attendances, setAttendance] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({notes: '', rating: ''})
    const [saving, setSaving]= useState(false)

    useEffect(() => {
        const fetchAttendance = async() => {
            try{
                const response = await api.get (`/attendances/${id}`)
                setAttendance (response.data)
                setFormData({
                    notes:response.data.notes || '',
                    rating:response.data.rating || '',
                })
            }catch (error) {
                console.log(error)
            }
        }
        fetchAttendance()
    }, [id])

    const handleDelete = async () => {
        const confirmed = window.confirm('Remove this from your list?')
        if(!confirmed) return

        try{
            await api.delete(`/attendances/${id}`)
            navigate('/my-list')
        } catch (error){
            console.log (error)
        }
    }

    if(!attendances) return <p className="detail-page">Loading</p>

    return (
        <div className="detail-page">
            <Link to="/my-list" className="details-back"> &larr; Back to my list </Link>

            <div className="card detail-card">
                <span className="tag">{attendances.event?.genre} </span>
                <p className="detail-name">{attendances.event?.artistName} </p>
                <p className="detail-venue">
                    {attendances.event?.venueCity}, {attendances.event?.venueCountry} .{''}
                    {new Date(attendances.event?.date).toLocaleDateString()}
                </p>

                <div className="detail-info">
                    {attendances.status === 'attended' && (
                        <>

                        <p className="detail-label" Your Rating ></p>
                        <p className="detail-rating">
                            {attendances.rating ? '*'.repeat(attendances.rating): 'Not rated'}
                        </p>
                        
                        </>
                    )}

                    <p className="detail-label">Notes</p>
                    <p className="detail-notes">{attendances.notes || 'No notes yet' } </p>
                </div>

                <div className="detail-actions">
                    <Link to={`/attendances/${id}/edit`} className="button-secondary">
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