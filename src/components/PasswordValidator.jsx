import React, { useEffect, useState } from 'react';

export default function PasswordValidator({ password, onValidationChange }) {
// Estado local para controlar el semáforo de las reglas
const [validations, setValidations] = useState({
length: false,
upper: false,
lower: false,
number: false,
special: false
});

// Cada que la contraseña del padre cambia, recalculamos los requisitos
useEffect(() => {
const currentValidations = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[@$!%*?&#.]/.test(password)
};

setValidations(currentValidations);

// Le avisamos al formulario padre si ya cumple absolutamente TODO (true o false)
const allValid = Object.values(currentValidations).every(Boolean);
onValidationChange(allValid);
}, [password]);

// Si no han escrito nada, no estorbamos en la interfaz
if (!password) return null;

return (
<div className="p-3 mb-3 rounded border text-start" style={{ backgroundColor: 'rgba(0,0,0,0.02)', fontSize: '13px' }}>
    <p className="mb-1 fw-bold text-secondary">La contraseña debe incluir:</p>
    <ul className="list-unstyled mb-0 ms-2">
    <li style={{ color: validations.length ? '#198754' : '#dc3545', transition: 'color 0.2s' }}>
        {validations.length ? '✓' : '✗'} Mínimo 8 caracteres
    </li>
    <li style={{ color: validations.upper ? '#198754' : '#dc3545', transition: 'color 0.2s' }}>
        {validations.upper ? '✓' : '✗'} Al menos una letra MAYÚSCULA
    </li>
    <li style={{ color: validations.lower ? '#198754' : '#dc3545', transition: 'color 0.2s' }}>
        {validations.lower ? '✓' : '✗'} Al menos una letra minúscula
    </li>
    <li style={{ color: validations.number ? '#198754' : '#dc3545', transition: 'color 0.2s' }}>
        {validations.number ? '✓' : '✗'} Al menos un número (0-9)
    </li>
    <li style={{ color: validations.special ? '#198754' : '#dc3545', transition: 'color 0.2s' }}>
        {validations.special ? '✓' : '✗'} Un carácter especial (@, $, !, %, *, ?, &, #, .)
    </li>
    </ul>
</div>
);
}