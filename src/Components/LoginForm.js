import React, {useRef} from 'react';
import {connect} from 'react-redux';

import {login} from '../Redux/logic';
import Fade from 'react-bootstrap/Fade';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';

//TODO: Better loading animation
const LoginForm = ({loading, error, tryLogin}) => {
  const username = useRef(), password = useRef();

  const loginClicked = e => {
    e.preventDefault();
    tryLogin(username.current.value, password.current.value);
  };

  return (
    <Fade in={!loading}>
      <Card>
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <Collapse in={(error !== null)}>
            <div>
              <Alert variant="danger">{error}</Alert>
            </div>
          </Collapse>
          <Form>
            <Form.Group>
              <label htmlFor="#username">Username</label>
              <Form.Control id="#username" placeholder="Username" ref={username}/>
            </Form.Group>
            <Form.Group>
              <label htmlFor="#password">Password</label>
              <Form.Control type="password" id="#password" placeholder="Password" ref={password}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={loginClicked}>Login</Button>
          </Form>
        </Card.Body>
      </Card>
    </Fade>
  );
};

const mapStateToProps = state => ({
  error: state.login.error,
  loading: state.login.loading
});

const mapDispatchToProps = dispatch => ({
  tryLogin: (username, password) => dispatch(login(username, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
