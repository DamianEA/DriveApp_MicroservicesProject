import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import FilterUsers from './users/FilterUsers';
import RegUsers from './users/RegUsers';

// Aquí está tu rescatista (el archivo axios.js que arreglamos)
import axiosInstance from './axios'; 

import Navigation from './components/Nav';
import LogoutButton from './components/LogoutButton';
import ManageUsersButton from './components/ManageUsersButton';

function Users() {
  const [users, setUsers] = useState([]);
  
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentFilters, setCurrentFilters] = useState({});

  const fetchUsers = async (pageTarget = page, sizeTarget = pageSize, filtros = currentFilters) => {
    try {
      // Usamos el axiosInstance y le agregamos el "/" al inicio de User
      const response = await axiosInstance.get('/User', {
        params: {
          ...filtros,
          page: pageTarget,
          pageSize: sizeTarget
        }
      });
      console.log("DATOS LLEGANDO DE C#:", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error al traer los usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsers(page, pageSize, currentFilters);
  }, [page, pageSize]);

  const handleStatusChange = async (userId, newStatus) => {
    const usuarioActual = users.find(u => u.id === userId);
    if (!usuarioActual) return;

    try {
      // Usamos el axiosInstance y le agregamos el "/" al inicio de User
      await axiosInstance.put(`/User/${userId}`, {
        name: usuarioActual.name,
        email: usuarioActual.email,
        birth: usuarioActual.birth,
        role: usuarioActual.role,
        status: newStatus 
      });

      alert("¡Estado actualizado con éxito!");
      
      setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus, updatedAt: new Date().toISOString() } : u));
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      alert(error.response?.data?.message || "Error al actualizar el estado del usuario.");
    }
  };  

  const handleFilter = (filtros) => {
    setCurrentFilters(filtros);
    setPage(1);
    fetchUsers(1, pageSize, filtros);
  };

  return (
    <>
      <Navigation /> 
      <Container className="p-3" fluid>
        <Row className="mb-3 d-flex align-items-center">
          <Col className="d-flex gap-2">
            <ManageUsersButton /> 
            <LogoutButton />
          </Col>
          <Col className="d-flex gap-2 justify-content-end">
            <FilterUsers onFilter={handleFilter} />
            <RegUsers />
          </Col>
        </Row>
        
        <Row>
          <Col>
            <Card>
              <Card.Header className="bg-dark text-white d-flex justify-content-between align-items-center">
                <span>Usuarios</span>
                <div className="d-flex align-items-center gap-2" style={{ fontSize: '14px' }}>
                  <span>Mostrar:</span>
                  <Form.Select 
                    size="sm" 
                    value={pageSize} 
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setPage(1);
                    }}
                    style={{ width: '80px' }}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </Form.Select>
                  <span>registros</span>
                </div>
              </Card.Header>
              
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Rol</th>
                      <th>Estado</th>
                      <th>Creado el</th>
                      <th>Última Edición</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <Form.Select 
                            value={user.status || 'Desactivado'} 
                            onChange={(e) => handleStatusChange(user.id, e.target.value)}
                            className={user.status === 'Activo' ? 'text-success' : 'text-danger'}
                            style={{ fontWeight: 'bold' }}
                          >
                            <option value="Activo">Activo</option>
                            <option value="Desactivado">Desactivado</option>
                          </Form.Select>
                        </td>
                        <td>
                          {user.createdAt 
                            ? new Date(user.createdAt).toLocaleDateString('es-MX') + ', ' + new Date(user.createdAt).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
                            : 'Sin registro'}
                        </td>
                        <td>
                          {user.updatedAt 
                            ? new Date(user.updatedAt).toLocaleDateString('es-MX') + ', ' + new Date(user.updatedAt).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
                            : 'Sin cambios'}
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan="7" className="text-center text-muted">No se encontraron usuarios.</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>

              <Card.Footer className="d-flex justify-content-between align-items-center bg-light">
                <span className="text-muted">Página actual: {page}</span>
                <Pagination className="mb-0">
                  <Pagination.Prev 
                    disabled={page === 1} 
                    onClick={() => setPage(page - 1)} 
                  />
                  <Pagination.Item active>{page}</Pagination.Item>
                  <Pagination.Next 
                    disabled={users.length < pageSize} 
                    onClick={() => setPage(page + 1)} 
                  />
                </Pagination>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Users;