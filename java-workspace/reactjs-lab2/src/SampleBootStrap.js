import React, { Component } from 'react';
import {Alert, Button, Container, Col, Row} from 'react-bootstrap';

const  btnFlat = {
    backgroundColor: 'purple',
    color: 'white',
}

const  btnXXL = {
    padding: "1rem 1.5rem",
    fontSize: "1.5rem",
}


function SampleBootStrap() {

  const colStyle = {backgroundColor: "grey", border: "red 1px solid"};

  return (
    <div>
      <Container fluid>
        <Row className="bg-primary">
          <Col>1</Col>
          <Col>2</Col>
        </Row>
        <Row>
          <Col>3</Col>
          <Col>4</Col>
          <Col>5</Col>
        </Row>
      </Container>
      <Button variant="primary" style={btnXXL}>Primary</Button> 
    </div>
  )
}

export default  SampleBootStrap;