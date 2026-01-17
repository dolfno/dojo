import { useState, FormEvent } from 'react'
import './RSVPForm.css'

interface FormData {
  name: string
  email: string
  attending: 'yes' | 'no' | ''
  guests: string
  events: {
    fridayBorrel: boolean
    saturdayCeremony: boolean
    saturdayDinner: boolean
    saturdayParty: boolean
    sundayBreakfast: boolean
  }
  camping: boolean
  dietary: string
  message: string
}

function RSVPForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    attending: '',
    guests: '1',
    events: {
      fridayBorrel: false,
      saturdayCeremony: false,
      saturdayDinner: false,
      saturdayParty: false,
      sundayBreakfast: false,
    },
    camping: false,
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

  const handleEventChange = (event: keyof FormData['events']) => {
    setFormData((prev) => ({
      ...prev,
      events: {
        ...prev.events,
        [event]: !prev.events[event],
      },
    }))
  }

  const handleCampingChange = () => {
    setFormData((prev) => ({ ...prev, camping: !prev.camping }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Log the submission (replace with actual backend later)
    console.log('RSVP Submitted:', formData)

    // Simulate a short delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="rsvp-section">
        <div className="rsvp-container">
          <div className="rsvp-success">
            <h2>Dankjewel!</h2>
            <p>
              {formData.attending === 'yes'
                ? 'Wat fijn dat je erbij bent! We kijken ernaar uit om samen te vieren.'
                : 'Jammer dat je er niet bij kunt zijn. Bedankt voor het laten weten.'}
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
        <p className="rsvp-subtitle">Laat ons weten of je erbij kunt zijn</p>

        <form onSubmit={handleSubmit} className="rsvp-form">
          <div className="form-group">
            <label htmlFor="name">Naam *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Je volledige naam"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="je@email.com"
            />
          </div>

          <div className="form-group">
            <label>Kun je erbij zijn? *</label>
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
                <span>Ja, ik ben erbij!</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={formData.attending === 'no'}
                  onChange={handleChange}
                />
                <span>Helaas kan ik niet</span>
              </label>
            </div>
          </div>

          {formData.attending === 'yes' && (
            <>
              <div className="form-group">
                <label htmlFor="guests">Aantal personen</label>
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
                <label>Bij welke onderdelen ben je aanwezig?</label>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.events.fridayBorrel}
                      onChange={() => handleEventChange('fridayBorrel')}
                    />
                    <span>Vrijdag - Borrel</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.events.saturdayCeremony}
                      onChange={() => handleEventChange('saturdayCeremony')}
                    />
                    <span>Zaterdag - Ceremonie</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.events.saturdayDinner}
                      onChange={() => handleEventChange('saturdayDinner')}
                    />
                    <span>Zaterdag - Diner</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.events.saturdayParty}
                      onChange={() => handleEventChange('saturdayParty')}
                    />
                    <span>Zaterdag - Feest</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.events.sundayBreakfast}
                      onChange={() => handleEventChange('sundayBreakfast')}
                    />
                    <span>Zondag - Ontbijt</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Wil je gebruik maken van de camping?</label>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.camping}
                      onChange={handleCampingChange}
                    />
                    <span>Ja, ik wil graag kamperen</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="dietary">Dieetwensen of allergieën</label>
                <input
                  type="text"
                  id="dietary"
                  name="dietary"
                  value={formData.dietary}
                  onChange={handleChange}
                  placeholder="Vegetarisch, vegan, allergieën, etc."
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="message">Bericht voor het bruidspaar</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Deel je gelukwensen..."
              rows={4}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Verzenden...' : 'Verstuur RSVP'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default RSVPForm
