import React from 'react';
import {connect} from 'react-redux';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import LastUpdated from './lastUpdated';

const SmuepList = React.forwardRef(({smueps, timestamp}, ref) => {
  const tableRows = [];

  smueps.forEach(smuep => {
    tableRows.push(
      <tr key={smuep.name}>
        <td>{smuep.name}</td>
        <td>{smuep.reached}</td>
        <td>{smuep.max}</td>
        <td><ProgressBar now={smuep.percent}/></td>
      </tr>
    );
  });

  return (
    <Card ref={ref}>
      <Card.Header>SMÜPs</Card.Header>
      <Card.Body>
        <Table bordered hover>
          <thead>
          <tr>
            <th className="col-2">Name</th>
            <th className="col-1">Erreicht</th>
            <th className="col-1">Maximal</th>
            <th className="col-3">Prozent</th>
          </tr>
          </thead>
          <tbody>
          {tableRows}
          </tbody>
        </Table>
      </Card.Body>
      <Card.Footer>Last updated: <LastUpdated lastUpdated={timestamp}/></Card.Footer>
    </Card>
  );
});

const mapStateToProps = state => ({
  smueps: state.dashboard.data.smueps,
  timestamp: state.dashboard.timestamp
});

export default connect(
  mapStateToProps,
  null,
  null,
  {forwardRef: true}
)(SmuepList);
