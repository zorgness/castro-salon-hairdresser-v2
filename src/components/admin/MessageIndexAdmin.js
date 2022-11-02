import React, { useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { fetchData } from '../../Api/FecthData'

const MessageIndexAdmin = () => {

  const urlMain = process.env.REACT_APP_URL_MAIN
  const urlContact = `${urlMain}/api/messages`

  const [messages, setMessages] = useState([])
  const [load, setLoad] = useState(true)

  useEffect(() =>{

    const getMessages = async () => {

      const response = await fetchData(urlContact)

      setMessages(response['hydra:member'])

    }

    if(load) {
      return (() => {
        getMessages()
        setLoad(false)
      })
    }

  }, [load, messages, urlContact])


  const dateFormater = (date) => {
    const formatedDate = new Date(date)
    return formatedDate.toLocaleDateString()
  }


  return (
    <div className="index-item1">

      <div className='d-flex justify-content-around flex-wrap gap-4 m-5'>
        {
          messages.map(({id, email, object, text, created_at}) => {
            return (

              <Card key={id} style={{ width: '18rem', border: '2px solid chocolate' }}>
                <Card.Header>{email}</Card.Header>
                <Card.Body>
                  <Card.Title>{object}</Card.Title>
                  <Card.Text>
                    { text }
                  </Card.Text>
                  <Card.Text className='text-end'>{dateFormater(created_at)}</Card.Text>
                </Card.Body>
                <Button variant="danger">Supprimer</Button>
              </Card>
            )
          })
        }
      </div>
    </div>
  )
}

export default MessageIndexAdmin
