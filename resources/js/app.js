import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('app');
if (rootElement) {
    createRoot(rootElement).render(
        <React.StrictMode>
            <h1>¡React está funcionando!</h1>
        </React.StrictMode>
    );
}
