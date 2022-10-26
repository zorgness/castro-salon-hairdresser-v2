import React, {useState, Fragment} from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import MyVerticallyCenteredModal from './Modal';
import { userLoginAttempt, closeModal} from '../Redux/actions/loginAction';

const Login = ({apiData, loginUser, closeModal}) => {



  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();
    const options = {email: email, password: password }
    loginUser(options)

  };

  const handleEmail = event =>  setEmail(event.target.value);

  const handlePassword = event => setPassword(event.target.value);


  return (

    <Fragment>

      <MyVerticallyCenteredModal
              show={apiData.modal}
              user={user}
              onHide={() => closeModal()}
            />

    <Container>

        {
          apiData?.error && <p className='text-white position-absolute bg-dark'>{apiData?.error}</p>
        }

        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={handleEmail}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" autoComplete='false' onChange={handlePassword} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button style={{backgroundColor: 'hotpink', border: '1px solid hotpink'}} type="submit">
          Submit
        </Button>
      </Form>
    </Container>

    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    apiData: state.loginUser
  }
}


const mapDispatchToProps = dispatch => {
  return {
      loginUser: options => dispatch(userLoginAttempt(options)),
      closeModal: () => dispatch(closeModal())

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
