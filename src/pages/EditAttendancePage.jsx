import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function EditAttendancePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    status: 'wishlist',
    rating: '',
    notes: '',
  })

  const [artistName, setArtistName] = useState('')

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await api.get(`/attendances/${id}`)
        setFormData({
          status: response.data.status,
          rating: response.data.rating || '',
          notes: response.data.notes || '',
        })

        setArtistName(response.data.event?.artistName || '')
      } catch (error) {
        console.log(error)
      }
    }

    fetchAttendance()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleStarClick = (star) => {
    setFormData((prev) => ({
      ...prev,
      rating: star,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.put(`/attendances/${id}`, formData)
      navigate(`/attendances/${id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="edit-page">
      <div className="card edit-card">
        <h2>Edit {artistName}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="wishlist">Wishlist</option>
              <option value="attended">Attended</option>
            </select>
          </div>

          {formData.status === 'attended' && (
            <div className="form-group">
              <label>Rating</label>
              <div className="star-picker">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= Number(formData.rating) ? 'star filled' : 'star'}
                    onClick={() => handleStarClick(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <button type="submit" className="button-primary">Save changes</button>
        </form>
      </div>
    </div>
  )
}