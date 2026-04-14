import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CiFilter } from "react-icons/ci";
import IButton from '~/components/IButton';
import Form from 'react-bootstrap/Form';

function FilterUsers() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <IButton variant="outline-primary" icon={CiFilter} text="Filtrar" onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filtrar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formRegNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRegEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRegBirth">
              <Form.Label>Fecha de nacimiento</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRegRol">
              <Form.Label>Rol</Form.Label>
              <Form.Select value="-1">
                <option value="-1">Todos</option>
                <option value="1">Administrador</option>
                <option value="0">Normal</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRegActive">
              <Form.Check type="checkbox" label="Activo" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Filtrar
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FilterUsers;
