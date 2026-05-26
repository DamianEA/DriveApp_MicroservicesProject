import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Pagination, Breadcrumb, Row, Col, Alert, Accordion } from 'react-bootstrap';
import api from '../axios';

export default function DriveExplorer({ userId, userRole }) {
const [items, setItems] = useState([]);
const [currentFolderId, setCurrentFolderId] = useState(null);
const [folderHistory, setFolderHistory] = useState([]); 

const [searchTerm, setSearchTerm] = useState('');
const [filterType, setFilterType] = useState('');
const [filterOwner, setFilterOwner] = useState('');
const [filterStartDate, setFilterStartDate] = useState('');
const [filterEndDate, setFilterEndDate] = useState('');

const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [pageSize, setPageSize] = useState(10);

const [showFolderModal, setShowFolderModal] = useState(false);
const [newFolderName, setNewFolderName] = useState('');
const [showRenameModal, setShowRenameModal] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);
const [newModName, setNewModName] = useState('');
const [errorMsg, setErrorMsg] = useState('');

const loadContent = async () => {
try {
    setErrorMsg('');
    const response = await api.get('/api/Storage/directory', {
    params: {
        folderId: currentFolderId,
        search: searchTerm || undefined,
        type: filterType || undefined,
        owner: filterOwner || undefined,
        startDate: filterStartDate || undefined,
        endDate: filterEndDate || undefined,
        page: page,
        pageSize: pageSize
    }
    });
    setItems(response.data.items || response.data.Items || []);
    const total = response.data.total || 0;
    setTotalPages(Math.ceil(total / pageSize) || 1);
} catch (err) {
    setErrorMsg(err.response?.data?.message || 'Error al cargar los archivos.');
}
};

useEffect(() => {
loadContent();
}, [currentFolderId, page, pageSize, searchTerm, filterType, filterOwner, filterStartDate, filterEndDate]);

const handleClearFilters = () => {
    setSearchTerm('');
    setFilterType('');
    setFilterOwner('');
    setFilterStartDate('');
    setFilterEndDate('');
    setPage(1);
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////
const handleCreateFolder = async (e) => {
e.preventDefault();
if (!newFolderName.trim()) return;
try {
    await api.post('/api/Storage/folder', { name: newFolderName, parentId: currentFolderId, userId: userId });
    setNewFolderName('');
    setShowFolderModal(false);
    loadContent();
} catch (err) {
    setErrorMsg(err.response?.data?.message || 'Error al crear la carpeta.');
}
};

const handleFileUpload = async (e) => {
const file = e.target.files[0];
if (!file) return;
if (file.size > 10 * 1024 * 1024) { alert("El archivo supera el límite estricto de 10 MB."); return; }

const formData = new FormData();
formData.append('file', file);
formData.append('parentId', currentFolderId);
formData.append('userId', userId);

try {
    setErrorMsg('');
    await api.post('/api/Storage/file', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    loadContent();
} catch (err) {
    setErrorMsg(err.response?.data?.message || 'Error al subir el archivo.');
}
};

const handleRename = async (e) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    
    const nombreFinal = newModName ? newModName.trim() : '';

    if (!nombreFinal || !selectedItem) {
        setErrorMsg("El campo 'name' no puede estar vacío.");
        return;
    }
    
    try {
        setErrorMsg(''); 
        
        // Enviamos el objeto con las propiedades esperadas
        await api.put(`/api/Storage/${selectedItem.id}/rename`, { 
            name: nombreFinal, 
            userId: Number(userId) 
        });
        
        setShowRenameModal(false);
        setSelectedItem(null);
        setNewModName('');
        await loadContent(); 
    } catch (err) {
        setErrorMsg(err.response?.data?.message || 'Error al renombrar.');
    }
};

const handleDelete = async (id) => {
if (!window.confirm('¿Estás seguro de eliminar este elemento?')) return;
try {
    await api.delete(`/Storage/${id}`, { params: { userId } });
    loadContent();
} catch (err) {
    setErrorMsg(err.response?.data?.message || 'Error al eliminar el elemento.');
}
};

const handleDownload = async (id, fileName) => {
try {
    const response = await api.get(`/api/Storage/download/${id}`, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
} catch (err) { alert('No se pudo descargar el archivo físico.'); }
};

const handleFolderClick = (folder) => {
setFolderHistory([...folderHistory, { id: currentFolderId, name: currentFolderId ? 'Subcarpeta' : 'Raíz' }]);
setCurrentFolderId(folder.id);
setPage(1);
};

const handleNavigateBack = (targetId, index) => {
setCurrentFolderId(targetId);
setFolderHistory(folderHistory.slice(0, index));
setPage(1);
};

return (
    <div className="mt-4 text-start">
    {errorMsg && <Alert variant="danger" onClose={() => setErrorMsg('')} dismissible>{errorMsg}</Alert>}

    <Row className="mb-3 align-items-center">
        <Col md={6}>
            <Form.Control 
                type="text" 
                placeholder="🔍 Buscar rápidamente por nombre..." 
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            />
        </Col>
        <Col md={6} className="text-end">
            <Button variant="primary" className="me-2" onClick={() => setShowFolderModal(true)}>
                📁 Nueva Carpeta
            </Button>
            <Button variant="success" as="label" disabled={currentFolderId === null} style={{ cursor: currentFolderId === null ? 'not-allowed' : 'pointer' }}>
                Subir Archivo
                <input type="file" hidden onChange={handleFileUpload} disabled={currentFolderId === null} />
            </Button>
            {currentFolderId === null && <small className="d-block text-muted mt-1"> Entra a una carpeta para subir archivos.</small>}
        </Col>
    </Row>

    <Accordion className="mb-3 shadow-sm">
        <Accordion.Item eventKey="0">
            <Accordion.Header>Filtros Avanzados del Repositorio</Accordion.Header>
            <Accordion.Body className="bg-light">
                <Row className="g-2">
                    <Col md={3}>
                        <Form.Label><small>Tipo / Extensión</small></Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Ej: .pdf, folder, .png" 
                            value={filterType} 
                            onChange={(e) => { setFilterType(e.target.value); setPage(1); }} 
                        />
                    </Col>
                    <Col md={3}>
                        <Form.Label><small>Propietario</small></Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Nombre del usuario..." 
                            value={filterOwner} 
                            onChange={(e) => { setFilterOwner(e.target.value); setPage(1); }} 
                        />
                    </Col>
                    <Col md={3}>
                        <Form.Label><small>Fecha Desde</small></Form.Label>
                        <Form.Control 
                            type="date" 
                            value={filterStartDate} 
                            onChange={(e) => { setFilterStartDate(e.target.value); setPage(1); }} 
                        />
                    </Col>
                    <Col md={3}>
                        <Form.Label><small>Fecha Hasta</small></Form.Label>
                        <Form.Control 
                            type="date" 
                            value={filterEndDate} 
                            onChange={(e) => { setFilterEndDate(e.target.value); setPage(1); }} 
                        />
                    </Col>
                </Row>
                <div className="text-end mt-2">
                    <Button variant="link" size="sm" className="text-danger p-0" onClick={handleClearFilters}>
                        Limpiar todos los filtros
                    </Button>
                </div>
            </Accordion.Body>
        </Accordion.Item>
    </Accordion>

    <Breadcrumb>
        <Breadcrumb.Item active={currentFolderId === null} onClick={() => handleNavigateBack(null, 0)}>
        Mi Unidad (Raíz)
        </Breadcrumb.Item>
        {folderHistory.map((hist, idx) => (
        <Breadcrumb.Item key={idx} onClick={() => handleNavigateBack(hist.id, idx)}>
            {hist.name}
        </Breadcrumb.Item>
        ))}
    </Breadcrumb>

    <Row className="mb-2 align-items-center">
        <Col className="d-flex align-items-center">
            <span className="me-2 text-muted"><small>Mostrar</small></span>
            <Form.Select 
                size="sm" 
                style={{ width: '80px' }} 
                value={pageSize} 
                onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
            >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
            </Form.Select>
            <span className="ms-2 text-muted"><small>elementos por página</small></span>
        </Col>
    </Row>

    <Table hover responsive className="align-middle bg-white rounded shadow-sm">
        <thead className="table-light">
        <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Tamaño</th>
            <th>Subido por</th>
            <th className="text-end">Acciones</th>
        </tr>
        </thead>
        <tbody>
        {items.length === 0 ? (
            <tr>
            <td colSpan="5" className="text-center py-4 text-muted">No se encontraron elementos con los filtros aplicados.</td>
            </tr>
        ) : (
            items.map((item) => {
            const canModify = userId === item.idUser || userRole?.toLowerCase() === 'administrador';
            return (
            <tr key={item.id}>
                <td>
                {item.type === 'folder' ? (
                    <span style={{ cursor: 'pointer', color: '#0d6efd', fontWeight: '500' }} onClick={() => handleFolderClick(item)}>
                    📁 {item.name}
                    </span>
                ) : (
                    <span>📄 {item.name}</span>
                )}
                </td>
                <td><span className="badge bg-secondary text-capitalize">{item.type === 'folder' ? 'Carpeta' : item.type}</span></td>
                <td>{item.type === 'folder' ? '-' : `${(item.sizeBytes / 1024).toFixed(2)} KB`}</td>
                <td>{item.owner ? item.owner.name : "Sistema"}</td>
                <td className="text-end">
                {item.type !== 'folder' && (
                    <Button variant="outline-success" size="sm" className="me-1" onClick={() => handleDownload(item.id, item.name)}>
                    ⬇️
                    </Button>
                )}
                {canModify && (
                    <>
                    <Button variant="outline-warning" size="sm" className="me-1" onClick={() => { setSelectedItem(item); setNewModName(item.name); setShowRenameModal(true); }}>
                        ✏️
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(item.id)}>
                        🗑️
                    </Button>
                    </>
                )}
                </td>
            </tr>
            );
            })
        )}
        </tbody>
    </Table>

    {totalPages > 1 && (
        <Pagination className="justify-content-center">
        <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} />
        {[...Array(totalPages).keys()].map((p) => (
            <Pagination.Item key={p + 1} active={p + 1 === page} onClick={() => setPage(p + 1)}>
            {p + 1}
            </Pagination.Item>
        ))}
        <Pagination.Next disabled={page === totalPages} onClick={() => setPage(page + 1)} />
        </Pagination>
    )}

    <Modal show={showFolderModal} onHide={() => setShowFolderModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Nueva Carpeta</Modal.Title></Modal.Header>
        <Form onSubmit={handleCreateFolder}>
        <Modal.Body>
            <Form.Group>
            <Form.Label>Nombre de la carpeta</Form.Label>
            <Form.Control type="text" autoFocus required value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowFolderModal(false)}>Cancelar</Button>
            <Button variant="primary" type="submit">Crear</Button>
        </Modal.Footer>
        </Form>
    </Modal>
    
    <Modal show={showRenameModal} onHide={() => setShowRenameModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Renombrar elemento</Modal.Title></Modal.Header>
        <Form onSubmit={handleRename}>
        <Modal.Body>
            <Form.Group>
            <Form.Label>Nuevo nombre</Form.Label>
            <Form.Control type="text" autoFocus required value={newModName} onChange={(e) => setNewModName(e.target.value)} />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowRenameModal(false)}>Cancelar</Button>
            <Button variant="warning" type="submit">Actualizar</Button>
        </Modal.Footer>
        </Form>
    </Modal>
    </div>
);
}