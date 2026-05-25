import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import api from './axios';
import PasswordValidator from "./components/PasswordValidator.jsx";

export default function Perfil() {
const storedUser = sessionStorage.getItem('user');
const user = storedUser ? JSON.parse(storedUser) : null;

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [birthDate, setBirthDate] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

const [isPasswordSecure, setIsPasswordSecure] = useState(false);

const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
const [loading, setLoading] = useState(false);

useEffect(() => {
if (user) {
    setName(user.name || '');
    setEmail(user.email || '');
    if (user.birthDate) {
    setBirthDate(user.birthDate.substring(0, 10));
    }
}
}, []);

const handleSubmit = async (e) => {
e.preventDefault();
setStatusMsg({ type: '', text: '' });

if (password && !isPasswordSecure) {
    setStatusMsg({ type: 'danger', text: ' La contraseña no cumple con los requisitos de seguridad.' });
    return;
}

if (password && password !== confirmPassword) {
    setStatusMsg({ type: 'danger', text: ' Las contraseñas no coinciden.' });
    return;
}

setLoading(true);
try {
    const response = await api.put(`/User/${user.id}/update-profile`, {
    name,
    email,
    birthDate,
    password: password || null
    });

    const updatedUser = { ...user, name, email, birthDate };
    sessionStorage.setItem('user', JSON.stringify(updatedUser));

    setStatusMsg({ type: 'success', text: '🎉 ¡Perfil actualizado correctamente!' });
    setPassword('');
    setConfirmPassword('');
} catch (err) {
    setStatusMsg({ 
    type: 'danger', 
    text: err.response?.data?.message || 'Error al actualizar el perfil.' 
    });
} finally {
    setLoading(false);
}
};

return (
<Card className="shadow-sm p-4 text-start border-0 content-box" style={{ maxWidth: '600px', margin: '0 auto' }}>
    <Card.Body>
    <h3 className="mb-1 text-secondary">Mi Perfil</h3>
    <p className="text-muted small mb-4">Mantén tus datos personales y de acceso actualizados de forma segura.</p>

    {statusMsg.text && (
        <Alert variant={statusMsg.type} onClose={() => setStatusMsg({ type: '', text: '' })} dismissible>
        {statusMsg.text}
        </Alert>
    )}

    <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
        <Form.Label><small>Nombre de Usuario</small></Form.Label>
        <Form.Control type="text" required value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
        <Form.Label><small>Correo Electrónico</small></Form.Label>
        <Form.Control type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-4">
        <Form.Label><small>Fecha de Nacimiento</small></Form.Label>
        <Form.Control type="date" required value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        </Form.Group>

        <hr className="my-4" style={{ opacity: 0.15 }} />
        <h5 className="text-secondary mb-3" style={{ fontSize: '1rem' }}>🔒 Cambiar Contraseña (Opcional)</h5>

        <Row>
        <Col md={12}>
            <Form.Group className="mb-3">
            <Form.Label><small>Nueva Contraseña</small></Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Dejar en blanco para mantener" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            </Form.Group>
            
            <PasswordValidator password={password} onValidationChange={setIsPasswordSecure} />

        </Col>
        <Col md={12}>
            <Form.Group className="mb-3">
            <Form.Label><small>Confirmar Contraseña</small></Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Repite la contraseña" 
                value={confirmPassword} 
                disabled={!password} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
            />
            </Form.Group>
        </Col>
        </Row>

        <div className="text-end mt-3 d-flex justify-content-end gap-2">
        <Button variant="secondary" type="button" onClick={() => window.location.reload()}>Cancelar</Button>
        <Button variant="primary" type="submit" disabled={loading}>{loading ? 'Guardando...' : '💾 Guardar Cambios'}</Button>
        </div>
    </Form>
    </Card.Body>
</Card>
);
}