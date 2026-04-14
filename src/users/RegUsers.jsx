import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import IButton from '~/components/IButton';
import { IoMdAdd } from "react-icons/io";
import Form from 'react-bootstrap/Form';

function RegUsers() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <IButton variant="outline-success" icon={IoMdAdd} text="Registrar usuario" onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formRegNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRegEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="correo@ejemplo.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRegBirth">
              <Form.Label>Fecha de nacimiento</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRegRol">
              <Form.Label>Rol</Form.Label>
              <Form.Select value="-1">
                <option value="-1" disabled={true}>Seleccione un rol para el usuario</option>
                <option value="1">Administrador</option>
                <option value="0">Normal</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRegPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRegPasswordConf">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control type="password" placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRegActive">
              <Form.Check type="checkbox" label="Activo" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
              Guardar
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegUsers;
