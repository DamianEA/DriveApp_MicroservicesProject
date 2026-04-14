import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';
import FilterUsers from '~/users/FilterUsers';
import RegUsers from '~/users/RegUsers';

function Users() {
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
                    <th>Registrado</th>
                    <th>Ult. Modificación</th>
                  </tr>
                </thead>
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
