import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import IButton from '../components/IButton'; 
import { IoMdAdd } from "react-icons/io";
import Form from 'react-bootstrap/Form';
import { axiosInstance } from '../axios';

function RegUsers() {
  const navigate = useNavigate();
  const location = useLocation();

  const isRegistroDirecto = location.pathname.toLowerCase().includes('/registro');
  const [show, setShow] = useState(isRegistroDirecto);

  // Estados
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [birth, setBirth] = useState('');
  const [rol, setRol] = useState("-1");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [active, setActive] = useState(true);

  const handleClose = () => {
    setShow(false);
    if (isRegistroDirecto) {
      navigate('/login');
    } 
  };

  const handleShow = () => setShow(true);

  // Función para guardar
const handleSave = async () => {
if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

  try {
    const newUser = {
      name: nombre,
      Email: email,     
      birth: birth, 
      pass: password,
      PasswordConfirm: confirmPassword,
      roll: rol === "1" ? "Administrador" : "Normal",
    };

    // Enviamos a la URL correcta que ya habías corregido
    await axiosInstance.post('User', newUser);
    
    alert("Usuario registrado con éxito");
    
    if (isRegistroDirecto) {
      handleClose(); 
    } else {
      setShow(false);
      window.location.reload(); 
    }
    
  } catch (error) {
    // TIP: Esto te dirá exactamente qué campo falló en la consola
    console.error("Detalle del error 400:", error.response?.data?.errors);
    alert("Error al guardar, revisa la consola.");
  }
};
  return (
    <>
      {!isRegistroDirecto && (
        <IButton variant="outline-success" icon={IoMdAdd} text="Registrar usuario" onClick={handleShow} />
      )}

      <Modal show={show} onHide={handleClose} backdrop={isRegistroDirecto ? "static" : true} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="correo@ejemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha de nacimiento</Form.Label>
              <Form.Control type="date" value={birth} onChange={(e) => setBirth(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Select value={rol} onChange={(e) => setRol(e.target.value)}>
                <option value="-1" disabled>Seleccione un rol</option>
                <option value="1">Administrador</option>
                <option value="0">Normal</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

<Form.Group className="mb-3">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                isInvalid={password !== confirmPassword && confirmPassword !== ""}
              />
              <Form.Control.Feedback type="invalid">
                Las contraseñas no coinciden
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Activo" checked={active} onChange={(e) => setActive(e.target.checked)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSave}>Guardar</Button>
          <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegUsers;
