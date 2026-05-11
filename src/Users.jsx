import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';
import FilterUsers from './users/FilterUsers';
import RegUsers from './users/RegUsers';
import { axiosInstance } from './axios';
import { CiLogout } from "react-icons/ci";
import IButton from './components/IButton';

function Users() {

  const [users, setUsers] = useState([]);

  const getUsers = async () =>{
try {
  const response = await axiosInstance.get('User');
  setUsers(Array.isArray(response.data) ? response.data : []);
} catch (error) {
  console.error("---> ERROR <---");
  setUsers([]);
  }
};

  useEffect(()=> {
    getUsers();
  }, []);


  return (
    <Container className="p-3" fluid>
      <Row className="mb-3 justify-content-end" md="auto">
        <Col>
          <FilterUsers />
        </Col>
        <Col>
          <RegUsers />
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header className="bg-dark text-white">Usuarios</Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Fecha nac.</th>
                    <th>Rol</th>
                  </tr>
                </thead>  
              <tbody>
  {users && users.length > 0 ? (
    users.map((user) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{new Date(user.birth).toLocaleDateString()}</td>
        <td>{user.roll || 'Sin rol'}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4" className="text-center">No hay usuarios disponibles o cargando...</td>
    </tr>
  )}
</tbody>
            </Table>
            </Card.Body>
            <Card.Footer>
              <Pagination></Pagination>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Users;
