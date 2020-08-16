import React from "react";
import {connect} from "react-redux";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import ProgressBar from "react-bootstrap/ProgressBar";
import LastUpdated from "./lastUpdated";
import Grade from "./Grade";

const TestList = React.forwardRef(({tests, timestamp}, ref) => {
  const tableRows = [];

  tests.forEach(test => {
    tableRows.push(
      <tr>
        <td>{test.name}</td>
        <td>{test.reached}</td>
        <td>{test.max}</td>
        <td><Grade value={test.grade}/></td>
        <td><ProgressBar now={test.percent}/></td>
      </tr>
    );
  });

  return (
    <Card ref={ref}>
      <Card.Header>Schularbeiten</Card.Header>
      <Card.Body>
        <Table bordered hover>
          <thead>
          <tr>
            <th className="col-2">Name</th>
            <th className="col-1">Erreicht</th>
            <th className="col-1">Von</th>
            <th className="col-1">Note</th>
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
  tests: state.dashboard.data.tests,
  timestamp: state.dashboard.timestamp
});

export default connect(
  mapStateToProps,
  null,
  null,
  {forwardRef: true}
)(TestList);
