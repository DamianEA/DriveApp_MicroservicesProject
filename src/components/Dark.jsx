import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

export default function DarkModeToggle() {
const [darkMode, setDarkMode] = useState(true);

useEffect(() => {
if (darkMode) {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.remove('dark-mode');
}
}, [darkMode]);

return (
<Button 
    variant="outline-warning" 
    size="sm"
    onClick={() => setDarkMode(!darkMode)}
    style={{ 
    borderRadius: '6px', 
    padding: '5px 12px',
    fontSize: '14px',
    fontWeight: '600',
    backgroundColor: darkMode ? '#2d2d2d' : '#ffffff',
    color: darkMode ? '#ffc107' : '#212529',
    borderColor: '#ffc107',
    transition: 'all 0.2s ease'
    }}
>
    {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
</Button>
);
}