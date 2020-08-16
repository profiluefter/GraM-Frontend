import React from "react";
import {connect} from "react-redux";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Grade from "./Grade";

const Summary = React.forwardRef(({homework, smuep, tests, grade, finalGrade}, ref) => (
  <Card ref={ref}>
    <Card.Header>Zusammenfassung</Card.Header>
    <Card.Body>
      <Container className="d-flex flex-column flex-sm-row justify-content-around flex-wrap">
        <div className="mb-3">
          <b>Hausübung</b><br/>
          {homework}
        </div>
        <div className="mb-3">
          <b>SMÜPs</b><br/>
          {smuep}
        </div>
        <div className="mb-3">
          <b>Schularbeiten</b><br/>
          {tests}
        </div>
        <div className="mb-3">
          <b>Berechnete Note</b><br/>
          {grade}
        </div>
        <div className="mb-3">
          <b>Note</b><br/>
          <Grade value={finalGrade}/>
        </div>
      </Container>
    </Card.Body>
  </Card>
));

const mapStateToProps = state => {
  let {homework, smuep, tests, grade, finalGrade} = state.dashboard.data.summary;
  return {homework, smuep, tests, grade, finalGrade};
};

export default connect(
  mapStateToProps,
  null,
  null,
  {forwardRef: true}
)(Summary);
