import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { CiLogin } from "react-icons/ci";
import IButton from './components/IButton';
import RegUsers from './users/RegUsers';
import { axiosInstance } from './axios';

function Login() {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
  const response = await axiosInstance.post('User/login', {
        email: email,
        pass: pass
      });

      localStorage.setItem('user', JSON.stringify(response.data));
      alert(" Hola de nuevo "+ response.data.name + "!");
      navigate('/main');

    } catch (error) {
      console.error("Error al ingresar:", error.response?.data);
      alert("Error: " + (error.response?.data?.message || "Credenciales incorrectas"));
    } 
  };

  return (
    <Modal show={true} centered={true}>
      <Modal.Header className="bg-dark text-white">
        <Modal.Title>DriveApp</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formLoginEmail">
            <Form.Label>email</Form.Label>
            <Form.Control
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLoginPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control 
            type="password" 
            placeholder= "" 
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>

        <IButton 
        variant="outline-success" 
        icon={CiLogin} 
        text="Ingresar"
        onClick={handleLogin} 
        />
        <Button 
          variant="outline-primary" 
          onClick={() => navigate('/registro')} 
        >
          Registrarse
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Login;
