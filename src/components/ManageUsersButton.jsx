import { useNavigate } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import IButton from '../components/IButton';

function ManageUsersButton() {
const navigate = useNavigate();

const storedUser = sessionStorage.getItem('user');
const user = storedUser ? JSON.parse(storedUser) : null;

if (!user || user.role !== 'Administrador') {
    return null;
}

return (
    <IButton 
    variant="outline-secondary" 
    icon={CiUser} 
    text="Gestionar Usuarios" 
    onClick={() => navigate('/usuarios')} 
    />
);
}

export default ManageUsersButton;