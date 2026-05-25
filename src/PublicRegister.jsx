import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axiosInstance from './axios';
import PasswordValidator from "./components/PasswordValidator.jsx";

function PublicRegister() {
const navigate = useNavigate();
const [formData, setFormData] = useState({
name: '',
email: '',
pass: '',
role: 'User', 
status: 'Desactivado'
});
const [confirmPass, setConfirmPass] = useState('');

const [isPasswordSecure, setIsPasswordSecure] = useState(false);

const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
e.preventDefault();

if (formData.pass && !isPasswordSecure) {
    alert("La contraseña debe cumplir con todos los requisitos de seguridad.");
    return;
}

if (formData.pass !== confirmPass) {
    alert("Las contraseñas no coinciden. Por favor, verifícalas.");
    return;
}

const payload = {
    name: formData.name || "",
    email: formData.email || "",
    pass: formData.pass || "",
    PasswordConfirm: confirmPass,
    birth: new Date().toISOString(),
    role: "User",                  
    status: "Desactivado"          
};

try {
    await axiosInstance.post('User/register', payload); 
    alert("¡Registro exitoso! Tu cuenta está en revisión. Un Administrador debe activarla.");
    navigate('/login');
} catch (error) {
    alert("Error al registrarse. Intenta de nuevo.");
}
};

return (
<Container className="d-flex justify-content-center align-items-center vh-100">
    <Card style={{ width: '400px' }} className="p-4 shadow">
    <h3 className="text-center mb-4">Crear Cuenta</h3>
    <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" name="name" onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" name="pass" onChange={handleChange} required />
        </Form.Group>

        <PasswordValidator password={formData.pass} onValidationChange={setIsPasswordSecure} />

        <Form.Group className="mb-3">
        <Form.Label>Confirmar Contraseña</Form.Label>
        <Form.Control 
            type="password" 
            value={confirmPass} 
            onChange={(e) => setConfirmPass(e.target.value)} 
            required 
        />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mb-2">
        Registrarme
        </Button>
        <Button variant="link" className="w-100" onClick={() => navigate('/login')}>
        Ya tengo cuenta, iniciar sesión
        </Button>
    </Form>
    </Card>
</Container>
);
}

export default PublicRegister;