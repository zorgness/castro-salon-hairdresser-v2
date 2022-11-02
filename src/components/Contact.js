import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { fetchDataWithMethod } from '../Api/FetchDataWithMethod';
import { notify } from './admin/notify'


const Contact = () => {

  const urlMain = process.env.REACT_APP_URL_MAIN
  const urlContact = `${urlMain}/api/messages`

  const [email, setEmail] = useState('')
  const [object, setObject] = useState('')
  const [text, setText] = useState('')


  const handleEmail = (e) => setEmail(e.target.value)
  const handleObject = (e) => setObject(e.target.value)
  const handleText = (e) => setText(e.target.value)


  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {email: email, object: object, text: text}
    const response = await fetchDataWithMethod(urlContact, 'POST', options)
    if(response.hasOwnProperty('@id')) {

      setEmail('')
      setObject('')
      setText('')
      notify(`message envoyé ${response.email}`, 'login')

    } else {
      notify(`erreur à l'envoie`, 'login')
    }

  }

  return (
    <div className='index-item1'>

    <h1 className='pattaya text-center m-3' style={{fontSize: "48px", textDecoration: " black  underline"}}>Contactez-moi</h1>

    <Container className='mb-5' onSubmit={handleSubmit}>
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="" value={email} onChange={handleEmail} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Object</Form.Label>
        <Form.Control type="text" placeholder="" value={object} onChange={handleObject} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Texte</Form.Label>
        <Form.Control as="textarea" rows={3} value={text} onChange={handleText} />
      </Form.Group>
      <Form.Group className='text-center'>
        <Button style={{backgroundColor: 'hotpink', border: '1px solid hotpink'}} className="my-5" type="submit">
              Envoyer
        </Button>
      </Form.Group>
    </Form>
    </Container>

    </div>
  )
}

export default Contact
