import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { CiLogin } from "react-icons/ci";
import IButton from '~/components/IButton';

function Login() {
  return (
    <Modal show={true} centered={true}>
      <Modal.Header className="bg-dark text-white">
        <Modal.Title>DriveApp</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formLoginEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="correo@ejemplo.com"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLoginPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <IButton variant="outline-success" icon={CiLogin} text="Ingresar" />
        <Button variant="outline-primary">
          Registrarse
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Login;
