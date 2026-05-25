import { useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import IButton from '../components/IButton'; 

function LogoutButton() {
const navigate = useNavigate();

const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
};

return (
    <IButton 
    variant="outline-danger" 
    icon={CiLogout} 
    text="Salir" 
    onClick={handleLogout} 
    />
);
}

export default LogoutButton;