import React from 'react';
import {connect} from 'react-redux';
import LoginForm from '../Components/LoginForm';
import {Redirect} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Login = ({loggedIn}) => (
  <div>
    {loggedIn ?
      <Redirect to={'/'}/> :
      <Container>
        <Row style={{height: '100vh'}}>
          <Col/>
          <Col className="my-auto" sm>
            <LoginForm/>
          </Col>
          <Col/>
        </Row>
      </Container>
    }
  </div>
);

const mapStateToProps = state => ({
  loggedIn: state.login.token != null
});

export default connect(
  mapStateToProps
)(Login);
