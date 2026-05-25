import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';


function Navigation() {
const navigate = useNavigate();

return (
    <Container fluid className="p-3 bg-dark text-white mb-3">
        <h4 className="m-0" style={{ cursor: 'pointer', display: 'inline-block' }} onClick={() => navigate('/main')}>
            DriveApp
        </h4>
    </Container>
    );
}

export default Navigation;