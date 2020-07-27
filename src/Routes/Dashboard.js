import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Fade from 'react-bootstrap/Fade';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {dashboardStartPolling, dashboardStopPolling} from '../Redux/actions';
import {logout} from '../Redux/logic';

import HomeworkOverview from '../Components/HomeworkOverview';
import SmuepList from '../Components/SmuepList';
import TestList from '../Components/TestList';
import Summary from '../Components/Summary';
import SettingsModal from '../Components/SettingsModal';

//TODO: Loading spinner
const Dashboard = ({startPolling, stopPolling, loggedIn, logout, loading, loaded, fullName, className}) => {
  useEffect(() => {
    if(loggedIn) startPolling();
    return () => stopPolling();
  }, [loggedIn, startPolling, stopPolling]);

  const
    navBar = useRef(),
    homeworkOverview = useRef(),
    smuepList = useRef(),
    testList = useRef(),
    summary = useRef();

  const scrollToRef = ref => () => window.scrollTo(0, ref.current.offsetTop - navBar.current.offsetHeight);

  const [settingsVisible, setSettingsVisibile] = useState(false);
  const showSettings = () => setSettingsVisibile(true);
  const closeSettings = () => setSettingsVisibile(false);

  return (
    <div>
      {!loggedIn && <Redirect to={'/login'}/>}
      <Fade in={loaded}>
        {loaded ? (
          <div>
            <Navbar variant="dark" expand="sm" sticky="top" className="bg-dark" ref={navBar}>
              <Navbar.Brand>GraM</Navbar.Brand>
              <Navbar.Toggle/>
              <Navbar.Collapse>
                <Nav>
                  <Nav.Link onClick={scrollToRef(homeworkOverview)}>Hausübung</Nav.Link>
                  <Nav.Link onClick={scrollToRef(smuepList)}>Smüps</Nav.Link>
                  <Nav.Link onClick={scrollToRef(testList)}>Schularbeiten</Nav.Link>
                  <Nav.Link onClick={scrollToRef(summary)}>Zusammenfassung</Nav.Link>
                </Nav>
              </Navbar.Collapse>
              <Navbar.Collapse className="justify-content-end">
                <NavDropdown title={fullName} id="user-menu" as="button">
                  <NavDropdown.Item onClick={showSettings}>Einstellungen</NavDropdown.Item>
                  <NavDropdown.Divider/>
                  <NavDropdown.Item onClick={logout}>Abmelden</NavDropdown.Item>
                </NavDropdown>
              </Navbar.Collapse>
            </Navbar>

            <Jumbotron fluid>
              <Container>
                <h1>Dashboard von {fullName}</h1>
                <div>Deine Klasse: {className}</div>
              </Container>
            </Jumbotron>

            <Container className="p-0 p-md-3">
              <div className={'mb-4'}><HomeworkOverview ref={homeworkOverview}/></div>
              <div className={'mb-4'}><SmuepList ref={smuepList}/></div>
              <div className={'mb-4'}><TestList ref={testList}/></div>
              <div className={'mb-4'}><Summary ref={summary}/></div>
            </Container>

            <SettingsModal show={settingsVisible} onClose={closeSettings}/>

            <div style={{height: '100vh'}}/>
          </div>
        ) : <></>}
      </Fade>
    </div>
  );
};

const mapStateToProps = state => {
  return Object.assign({}, {
    loggedIn: state.login.token != null,
    loading: state.dashboard.loading,
    loaded: false
  }, state.dashboard.data !== null ? {
    fullName: state.dashboard.data.meta.fullName,
    className: state.dashboard.data.meta.className,
    loaded: true
  } : {});
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  startPolling: () => dispatch(dashboardStartPolling()),
  stopPolling: () => dispatch(dashboardStopPolling())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
