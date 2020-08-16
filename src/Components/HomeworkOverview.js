import React from "react";
import {connect} from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar";
import Card from "react-bootstrap/Card";

const HomeworkOverview = React.forwardRef(({all, done, percent}, ref) => (
  <Card body ref={ref}>
    <Row className="panel-body">
      <Col md={"auto"}>Hausübung: {done}/{all}</Col>
      <Col style={{display: "flex", alignItems: "center"}}>
        <ProgressBar animated now={percent} max={100} style={{"flexGrow": 1}}/>
      </Col>
    </Row>
  </Card>
));

const mapStateToProps = state => {
  const {all, done, percent} = state.dashboard.data.homework;
  return {all, done, percent};
};

export default connect(
  mapStateToProps,
  null,
  null,
  {forwardRef: true}
)(HomeworkOverview);
