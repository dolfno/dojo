import { useState, FormEvent } from 'react'
import './RSVPForm.css'

// Configuration for Google Forms integration
// To set up:
// 1. Create a Google Form with fields: Name, Email, Attending (Yes/No), Number of Guests, Dietary Requirements, Message
// 2. Get the form action URL (from the form's HTML source or use the pre-filled link trick)
// 3. Get the entry IDs for each field (e.g., entry.123456789)
// 4. Update the GOOGLE_FORM_CONFIG below

const GOOGLE_FORM_CONFIG = {
  // Replace with your Google Form action URL
  actionUrl: '',
  // Replace with your form's entry IDs
  fields: {
    name: 'entry.XXXXXXXXX',
    email: 'entry.XXXXXXXXX',
    attending: 'entry.XXXXXXXXX',
    guests: 'entry.XXXXXXXXX',
    dietary: 'entry.XXXXXXXXX',
    message: 'entry.XXXXXXXXX',
  },
}

interface FormData {
  name: string
  email: string
  attending: 'yes' | 'no' | ''
  guests: string
  dietary: string
  message: string
}

function RSVPForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    attending: '',
    guests: '1',
    dietary: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // If Google Form is configured, submit to it
    if (GOOGLE_FORM_CONFIG.actionUrl) {
      const googleFormData = new FormData()
      googleFormData.append(GOOGLE_FORM_CONFIG.fields.name, formData.name)
      googleFormData.append(GOOGLE_FORM_CONFIG.fields.email, formData.email)
      googleFormData.append(GOOGLE_FORM_CONFIG.fields.attending, formData.attending)
      googleFormData.append(GOOGLE_FORM_CONFIG.fields.guests, formData.guests)
      googleFormData.append(GOOGLE_FORM_CONFIG.fields.dietary, formData.dietary)
      googleFormData.append(GOOGLE_FORM_CONFIG.fields.message, formData.message)

      try {
        await fetch(GOOGLE_FORM_CONFIG.actionUrl, {
          method: 'POST',
          mode: 'no-cors',
          body: googleFormData,
        })
      } catch {
        // Google Forms doesn't return a proper response due to CORS
        // but the submission still works
      }
    } else {
      // Demo mode - just log to console
      console.log('RSVP Submitted (demo mode):', formData)
    }

    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="rsvp-section">
        <div className="rsvp-container">
          <div className="rsvp-success">
            <h2>Thank You!</h2>
            <p>
              {formData.attending === 'yes'
                ? "We're so excited to celebrate with you!"
                : "We're sorry you can't make it, but thank you for letting us know."}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="rsvp-section">
      <div className="rsvp-container">
        <h2>RSVP</h2>
        <p className="rsvp-subtitle">Please let us know if you can join us</p>

        <form onSubmit={handleSubmit} className="rsvp-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label>Will you be attending? *</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={formData.attending === 'yes'}
                  onChange={handleChange}
                  required
                />
                <span>Joyfully Accept</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={formData.attending === 'no'}
                  onChange={handleChange}
                />
                <span>Regretfully Decline</span>
              </label>
            </div>
          </div>

          {formData.attending === 'yes' && (
            <>
              <div className="form-group">
                <label htmlFor="guests">Number of Guests</label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="dietary">Dietary Requirements</label>
                <input
                  type="text"
                  id="dietary"
                  name="dietary"
                  value={formData.dietary}
                  onChange={handleChange}
                  placeholder="Vegetarian, vegan, allergies, etc."
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="message">Message for the Couple</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Share your well wishes..."
              rows={4}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send RSVP'}
          </button>
        </form>

        {!GOOGLE_FORM_CONFIG.actionUrl && (
          <p className="demo-notice">
            Demo mode: Configure Google Forms in RSVPForm.tsx to enable submissions
          </p>
        )}
      </div>
    </section>
  )
}

export default RSVPForm
