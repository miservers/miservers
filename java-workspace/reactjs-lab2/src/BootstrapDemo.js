import React, { Component } from 'react';
import {Alert, Button, Container, Col, Row, Form , Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const  btnFlat = {
    backgroundColor: 'purple',
    color: 'white',
}

const  btnXXL = {
    padding: "1rem 1.5rem",
    fontSize: "1.5rem",
}

function GridDemo() {
  return (
    <div>
      <h2>Grid:</h2>
      <Container>
        <Row>
          <Col className="bg-warning">1</Col>
          <Col className="bg-success">2</Col>
          <Col className="bg-warning">3</Col>
        </Row>
        <br/>
        <Row>
          <Col sm={4} className="bg-warning">sm={4}</Col>
          <Col sm={8} className="bg-primary">sm={8}</Col>
        </Row>
      </Container>
    </div>
  );
}

function ButtonDemo () {
  return (
    <div>
      <h2>Button:</h2>
      <Button variant="primary">primary</Button>{' '}
      <Button variant="success">success</Button>{' '}
      <Button variant="link">link</Button>
    </div>
  );
}

function FormDemo() {
  return (
    <div className="border border-warning">
    <h2>Form:</h2>
    <Form action="/signup" method="POST">
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>First Name</Form.Label>
          <Form.Control required name="firstname" type="text" />
        </Form.Group>        
        <Form.Group as={Col}>
          <Form.Label>Last Name</Form.Label>
          <Form.Control required name="lastname" type="text" />
        </Form.Group>        
      </Form.Row> 
      <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control required name="address" type="text" />
      </Form.Group>        
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>City</Form.Label>
          <Form.Control required name="city" type="text" />
        </Form.Group>        
        <Form.Group as={Col}>
          <Form.Label>Country</Form.Label>
          <Form.Control required name="country" type="text" />
        </Form.Group>        
        <Form.Group as={Col}>
          <Form.Label>Zip</Form.Label>
          <Form.Control required name="zip" type="zip" />
        </Form.Group>        
      </Form.Row>  
      <Form.Group controlId="emailCtl">
        <Form.Label>Email</Form.Label>
        <Form.Control name="email" type="email" />
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
    </div>
  );
}

function TableDemo () {
  return (
    <div>
      <h2>Table:</h2>
      <Table striped bordered size="sm" className="w-50">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tomates</td>
            <td>4</td>
            <td>600</td>
          </tr>
          <tr>
            <td>Potatos</td>
            <td>2.5</td>
            <td>100</td>
          </tr>
          <tr>
            <td>Carrot</td>
            <td>5</td>
            <td>1000</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

function BootstrapDemo() {

  return (
    <div>
      <h2 className="text-center">React Bootstrap Demo</h2>
      <GridDemo />
      <br/>
      <ButtonDemo />
      <br/>
      <FormDemo />
      <br />
      <TableDemo />

    </div>
  )
}

export default  BootstrapDemo;