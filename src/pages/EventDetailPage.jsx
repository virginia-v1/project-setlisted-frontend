import { useState, useEffect, createElement } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'

export default function EventDetailPage() {
    const { id } = useParams()
    const [event, setEvent] = useState(null)
    const [toast, setToast] = useState(' ')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await api.get(`/events/${id}`)
                setEvent(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchEvent()
    }, [id])

    const handleAdd = async (status) => {
        try {
            await api.post('/attendances', {event:id, status:status})
            setToast(status === 'attended'? 'Marked as attended!' : 'Added to your wishlist!')
            setTimeout(() => {
                setToast('')
                navigate('/my-list')
                
            }, 1200)
        } catch (error) {
            setToast(error.response?.data?.message || 'Could not add')
            setTimeout(() => setToast(''), 2500)
        }
    }

    if(!event) return <p className="event-detail-page" >loading</p>

    return (

        <div className="event-detail-page">
            <Link to="/events" className="detail-back">&larr; Back </Link>

            {toast && <div className="toast">{toast}</div>}

            <div className="card event-detail-card">
                <span className="tag">{event.genre}</span>
                <p className="event-detail-name">{event.artistName}</p>
                <p className="event-detail-venue">
                    {event.venueName} - {event.venueCity}, {event.venueCountry}

                </p>

                <p className="event-detail-date">
                    {new Date(event.date).toLocaleDateString(undefined, {
                        weekday: 'long',
                        year: 'numeric',
                        month:'long',
                        day:'numeric',
                    })}
                </p>

                <div className="event-detail-actions">
                    <button className="button-secondary" onClick={() => handleAdd('wishlist')}>
                        Add to wishlist
                    </button>
                    <button className="button-primary" onClick={() => handleAdd('attended')}>
                        Mark as attended
                    </button>
                </div>
            </div>
        </div>
    )
    }