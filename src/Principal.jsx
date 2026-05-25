import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import DarkModeToggle from './components/Dark';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navigation from './components/Nav';
import LogoutButton from './components/LogoutButton';
import ManageUsersButton from './components/ManageUsersButton';
import DriveExplorer from './components/DriveExplorer'; 
import Perfil from "./Perfil"; 

function principal() {
    const storedUser = sessionStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [verPerfil, setVerPerfil] = useState(false);

    return (
        <>
            <Navigation />

            <Container className="p-3" fluid>
                <Row className="mb-4 d-flex align-items-center">
                    <Col className="d-flex gap-2">
                        <ManageUsersButton />
                        
                        {/* 👤 BOTÓN INTERACTIVO DE PERFIL */}
                        <Button 
                            variant={verPerfil ? "outline-primary" : "primary"}
                            size="sm"
                            onClick={() => setVerPerfil(!verPerfil)}
                            style={{ borderRadius: '6px', padding: '5px 12px', fontSize: '14px', fontWeight: '500' }}
                        >
                            {verPerfil ? '📂 Ver Mis Archivos' : '👤 Mi Perfil'}
                        </Button>

                        <DarkModeToggle />
                        
                        <LogoutButton />
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col>
                        {verPerfil ? (
                            <div className="animate__animated animate__fadeIn">
                                {/* Botón opcional de regresar rápido arriba del formulario */}
                                <div className="text-start mb-3">
                                    <Button variant="link" className="p-0 text-decoration-none" onClick={() => setVerPerfil(false)}>
                                        ← Volver al repositorio
                                    </Button>
                                </div>
                                <Perfil />
                            </div>
                        ) : (
                            <div className="bg-light p-4 rounded shadow-sm content-box">
                                <h2 className="text-secondary text-start mb-1">
                                    Bienvenido a DriveApp, {user ? user.name : 'Usuario'}
                                </h2>
                                <p className="text-muted text-start mb-4">
                                    Gestiona tus carpetas de forma segura y sube archivos de hasta 10 MB dentro de ellas.
                                </p>
                                
                                {user && <DriveExplorer userId={user.id} userRole={user.role} />}
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default principal;