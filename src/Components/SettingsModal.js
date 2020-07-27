import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import {settingsUpdated} from '../Redux/actions';
import defaultState from '../Redux/persistance';

const SettingsModal = ({show, onClose, settings, saveChanges}) => {
  const [grapiEndpoint, pollingInterval] = [useRef(), useRef()];
  const [selectedSettings, setSelectedSettings] = useState(settings);

  useEffect(() => {
    if(!show) {
      setSelectedSettings(settings);
    }
  }, [show, settings]);

  useEffect(() => {
    if(
      grapiEndpoint.current === undefined ||
      pollingInterval.current === undefined)
      return;

    grapiEndpoint.current.value = selectedSettings.grapi.host;
    pollingInterval.current.value = selectedSettings.grapi.pollingInterval / 1000;
  }, [selectedSettings, grapiEndpoint, pollingInterval]);

  const updateSelectedSettings = () => {
    setSelectedSettings({
      grapi: {
        host: grapiEndpoint.current.value,
        pollingInterval: pollingInterval.current.value * 1000
      }
    });
  };

  const saveAndClose = e => {
    e.preventDefault();
    saveChanges(selectedSettings);
    onClose();
  };

  const reset = e => {
    e.target.blur();
    setSelectedSettings(defaultState.settings);
  };

  return (
    <Form>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Einstellungen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label className="mb-1">GrAPI Endpoint</Form.Label>
            <Form.Text muted className="mb-1 mt-0">
              Die <a href="https://github.com/profiluefter/GrAPI">GrAPI</a> ist die API, die zur Kommunikation mit dem
              GraM-Server verwendet wird da dieser keine passenden CORS-Header und keine JSON-API hat.
            </Form.Text>
            <Form.Control type="url" placeholder="Enter GrAPI endpoint URL" ref={grapiEndpoint}
                          defaultValue={selectedSettings.grapi.host}
                          onChange={updateSelectedSettings} className="bg-dark text-light"/>
          </Form.Group>
          <Form.Group>
            <Form.Label className="mb-1">GrAPI Polling Interval</Form.Label>
            <Form.Text muted className="mb-1 mt-0">
              Das Polling Interval gibt die Zeitspanne an, die zwischen den Aktualisierungen gewartet wird.
            </Form.Text>
            <InputGroup>
              <Form.Control type="text" inputMode="numeric" placeholder="Enter Polling Interval" ref={pollingInterval}
                            defaultValue={selectedSettings.grapi.pollingInterval / 1000}
                            onChange={updateSelectedSettings} className="bg-dark text-light"/>
              <InputGroup.Append>
                <InputGroup.Text>Sekunden</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={reset} className="mr-auto">Reset</Button>
          <Button variant="secondary" onClick={onClose}>Abbrechen</Button>
          <Button variant="primary" onClick={saveAndClose} type="submit">Speichern</Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  saveChanges: settings => dispatch(settingsUpdated(settings))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsModal);
