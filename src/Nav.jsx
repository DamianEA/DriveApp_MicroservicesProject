import { useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import IButton from './components/IButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Navigation() {
    const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem('user'); // Limpiamos la sesión
    navigate('/login');              // Al login
    };

    return (
    <Container fluid className="p-3 bg-dark text-white mb-3">
        <Row className="justify-content-between align-items-center">
        <h4 className="m-0">DriveApp</h4>
        <div style={{ width: 'auto' }}>
            <IButton 
            variant="outline-danger" 
            icon={CiLogout} 
            text="Cerrar Sesion" 
            onClick={handleLogout} 
            />
        </div>
        </Row>
    </Container>
    );
}

export default Navigation;