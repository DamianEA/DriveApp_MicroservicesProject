import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { CiLogin } from "react-icons/ci";
import IButton from './components/IButton';
import RegUsers from './users/RegUsers';
import api from './axios';
import './App.css';


function Login() {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [user, setUser] = useState({
  username: "master_code",
  role: "Usuario" // O "Administrador"
  });

  const navigate = useNavigate();

const handleLogin = async () => {
    try {
      const response = await api.post('/api/Auth/login', {
          email: email,
          pass: pass
      });
      
      sessionStorage.setItem('user', JSON.stringify({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role
      }));
      
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('refreshToken', response.data.refreshToken);
      navigate('/main');

    } catch (error) {
      console.error(" ERROR REAL EN LOGIN:", error);
      if (error.response) {
        console.log(" Respuesta de C#:", error.response.data);
        alert(`Error ${error.response.status}: ${JSON.stringify(error.response.data)}`);
      } else {
        alert("No hay conexión con la API de C#. ¿Está encendida en la terminal?");
      }
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
