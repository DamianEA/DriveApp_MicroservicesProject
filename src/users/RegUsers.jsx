import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axiosInstance from '../axios';
import PasswordValidator from "../components/PasswordValidator.jsx";

function RegUsers() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pass: '',
    role: 'User',   
    status: 'Activo' 
  });

  const [confirmPass, setConfirmPass] = useState('');
  
  const [isPasswordSecure, setIsPasswordSecure] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.pass && !isPasswordSecure) {
      alert("La contraseña no cumple con los requisitos de seguridad corporativa.");
      return;
    }

    if (formData.pass !== confirmPass) {
      alert("Las contraseñas no coinciden. Por favor, verifícalas.");
      return;
    }

    const dataToSend = {
      name: formData.name || "",
      email: formData.email || "",
      pass: formData.pass || "",
      PasswordConfirm: confirmPass,       
      birth: new Date().toISOString(),   
      role: formData.role || "User",      
      status: formData.status || "Activo" 
    };

    try {
      await axiosInstance.post('User/register', dataToSend);
      alert("¡Usuario creado exitosamente por el Administrador!");
      setFormData({ name: '', email: '', pass: '', role: 'User', status: 'Activo' });
      setConfirmPass('');
      handleClose();
    } catch (error) {
      alert("Error al crear el usuario. Revisa la consola.");
    }
  };

  return (
    <>
      <Button variant="outline-success" onClick={handleShow}>
        + Registrar usuario
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name="pass" value={formData.pass} onChange={handleChange} required />
            </Form.Group>

            <PasswordValidator password={formData.pass} onValidationChange={setIsPasswordSecure} />

            <Form.Group className="mb-3">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rol del Usuario</Form.Label>
              <Form.Select name="role" value={formData.role} onChange={handleChange}>
                <option value="User">User</option>
                <option value="Normal">Normal</option>
                <option value="Administrador">Administrador</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Estado de la Cuenta</Form.Label>
              <Form.Select name="status" value={formData.status} onChange={handleChange}>
                <option value="Activo">Activo</option>
                <option value="Desactivado">Desactivado</option>
              </Form.Select>
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Guardar Usuario
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RegUsers;