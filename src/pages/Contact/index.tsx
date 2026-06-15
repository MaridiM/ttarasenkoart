import { FC, useState, FormEvent, ChangeEvent } from 'react'
import emailjs from '@emailjs/browser'

import {
  MAIL_JS_USER_ID,
  MAIL_JS_SERVICE_ID,
  MAIL_JS_TEMPLATE_ID,
} from 'config'

type ContactForm = {
  project_name: string
  user_name: string
  user_email: string
  user_message: string
}

const initialForm: ContactForm = {
  project_name: 'Tetiana Tarasenko',
  user_name: '',
  user_email: '',
  user_message: '',
}

const Contact: FC = () => {
  const [form, setForm] = useState<ContactForm>(initialForm)

  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target
    setForm((state) => ({
      ...state,
      [name]: value,
    }))
  }

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    emailjs
      .send(MAIL_JS_SERVICE_ID, MAIL_JS_TEMPLATE_ID, form, {
        publicKey: MAIL_JS_USER_ID,
      })
      .then(() => {
        setForm(initialForm)
      })
      .catch((error) => {
        console.log(error.text)
      })
  }

  return (
    <div className="contact-page">
      <div className="contact">
        <h1>Contact Me</h1>
        <form onSubmit={sendEmail}>
          <input
            type="text"
            name="user_name"
            placeholder="Your name"
            value={form.user_name}
            onChange={handleInput}
            required
          />
          <br />
          <input
            type="email"
            name="user_email"
            placeholder="Your email"
            value={form.user_email}
            onChange={handleInput}
            required
          />
          <br />
          <textarea
            name="user_message"
            placeholder="Your message"
            value={form.user_message}
            onChange={handleInput}
            required
          ></textarea>
          <br />
          <button type="submit">SEND</button>
        </form>
      </div>
    </div>
  )
}

export default Contact
