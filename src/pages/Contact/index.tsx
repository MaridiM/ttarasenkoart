import { FC, useState } from 'react'
import emailjs from 'emailjs-com'

import {
    MAIL_JS_USER_ID,
    MAIL_JS_SERVICE_ID,
    MAIL_JS_TEMPLATE_ID
} from 'config'

const Contact: FC = () => {
    const [ form, setForm ] = useState({
        project_name: 'Tetiana Tarasenko',
        user_name: '',
        user_email: '',
        user_message: '',
    }) 

    const handleInput = (e) => {
        const { value, name } = e.target
        setForm(state => ({
            ...state,
            [name]: value
        }))
    }
    
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.send(
            MAIL_JS_SERVICE_ID, 
            MAIL_JS_TEMPLATE_ID, 
            form, 
            MAIL_JS_USER_ID
        )
        .then((result) => {
            setForm({
                project_name: 'Tetiana Tarasenko',
                user_name: '',
                user_email: '',
                user_message: '',
            })
        }, (error) => {
           console.log(error.text)
        });
    }
    return (
        <div className="contact-page">
            <div className="contact">
                <h1>Contact Me</h1>
                <form>
                    <input type="text" name="user_name" placeholder="Your name" value={form.user_name} onChange={handleInput} required/><br/>
                    <input type="email" name="user_email" placeholder="Your email" value={form.user_email} onChange={handleInput} required/><br/>
                    {/* <input type="text" name="user_subject" placeholder="Your subject" value={form.user_subject} onChange={handleInput} required/><br/> */}
                    <textarea name="user_message" placeholder="Your message" value={form.user_message} onChange={handleInput} required></textarea><br/>
                    <button type='submit' onClick={sendEmail}>SEND</button>
                </form>
            </div>
        </div>
    )
}

export default Contact
