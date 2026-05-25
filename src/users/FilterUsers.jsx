import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CiFilter } from "react-icons/ci";
import IButton from '../components/IButton'; 
import Form from 'react-bootstrap/Form';

function FilterUsers({ onFilter }) {
  const [show, setShow] = useState(false);

  const [filters, setFilters] = useState({
    name: '',
    email: '',
    birth: '',
    role: 'Todos',
    isActiveOnly: false
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleApplyFilter = () => {
    const queryParams = {
      name: filters.name || undefined,
      email: filters.email || undefined,
      birth: filters.birth || undefined,
      role: filters.role !== 'Todos' ? filters.role : undefined,
      status: filters.isActiveOnly ? 'Activo' : undefined
    };

    if (onFilter) {
      onFilter(queryParams);
    }
    handleClose();
  };

  const handleResetFilters = () => {
    const defaultFilters = { name: '', email: '', birth: '', role: 'Todos', isActiveOnly: false };
    setFilters(defaultFilters);
    if (onFilter) onFilter({});
    handleClose();
  };

  return (
    <>
      <IButton variant="outline-primary" icon={CiFilter} text="Filtrar" onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filtrar Usuarios</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formRegNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
                type="text" 
                name="name" 
                value={filters.name} 
                onChange={handleChange} 
                placeholder="Buscar por nombre..."
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRegEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email" 
                value={filters.email} 
                onChange={handleChange} 
                placeholder="ejemplo@correo.com"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRegBirth">
              <Form.Label>Fecha de nacimiento</Form.Label>
              <Form.Control 
                type="date" 
                name="birth" 
                value={filters.birth} 
                onChange={handleChange} 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRegRol">
              <Form.Label>Rol</Form.Label>
              <Form.Select name="role" value={filters.role} onChange={handleChange}>
                <option value="Todos">Todos</option>
                <option value="Administrador">Administrador</option>
                <option value="Normal">Normal</option>
                <option value="User">User</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRegActive">
              <Form.Check 
                type="checkbox" 
                name="isActiveOnly" 
                label="Mostrar solo usuarios Activos" 
                checked={filters.isActiveOnly} 
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleResetFilters}>
            Limpiar Filtros
          </Button>
          <Button variant="primary" onClick={handleApplyFilter}>
            Filtrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FilterUsers;