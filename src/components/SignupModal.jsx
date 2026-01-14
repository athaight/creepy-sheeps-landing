import { useState } from 'react'
import { supabase } from '../lib/supabase'
import './SignupModal.css'

function SignupModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comments: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.name || formData.name.trim().length < 1) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return
    
    setIsSubmitting(true)
    setErrors({})
    
    try {
      const { error } = await supabase
        .from('signups')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            comments: formData.comments.trim() || null
          }
        ])

      if (error) {
        if (error.code === '23505') {
          // Unique constraint violation (duplicate email)
          setErrors({ email: 'This email is already signed up!' })
        } else {
          throw error
        }
        return
      }
      
      setSubmitSuccess(true)
      setFormData({ name: '', email: '', comments: '' })
      
      setTimeout(() => {
        setSubmitSuccess(false)
        onClose()
      }, 2000)
    } catch (error) {
      console.error('Submission error:', error)
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({ name: '', email: '', comments: '' })
    setErrors({})
    setSubmitSuccess(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
        
        <h2 className="modal-title">Sign up for Creepy Sheeps</h2>
        
        {submitSuccess ? (
          <div className="success-message">
            <svg viewBox="0 0 24 24" fill="currentColor" className="success-icon">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <p>Thanks for signing up! We'll be in touch.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="comments">Comments (optional)</label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                placeholder="Any questions or thoughts?"
                rows="3"
              />
            </div>
            
            {errors.submit && <p className="error-text submit-error">{errors.submit}</p>}
            
            <div className="form-buttons">
              <button type="button" className="btn btn-cancel" onClick={handleClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default SignupModal