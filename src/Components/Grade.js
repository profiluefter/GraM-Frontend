import React from 'react';
import Badge from 'react-bootstrap/Badge';

const Grade = ({value}) => {
  switch(value) {
    case 1:
      return <Badge variant="success">Sehr Gut</Badge>;
    case 2:
      return <Badge variant="success">Gut</Badge>;
    case 3:
      return <Badge variant="warning">Befriedigend</Badge>;
    case 4:
      return <Badge variant="warning">Genügend</Badge>;
    case 5:
      return <Badge variant="danger">Nicht Genügend</Badge>;
    default:
      return <div>{value}</div>;
  }
};

export default Grade;
