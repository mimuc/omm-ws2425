import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));


window.addEventListener("online",  function(){
    console.log("You are online!");
});
window.addEventListener("offline", function(){
    console.log("Oh no, you lost your network connection.");
});


// new pwa stuff
if ('serviceWorker' in navigator) {
    // Wait for the 'load' event to not block other work
    window.addEventListener('load', async () => {
        // Try to register the service worker.
        try {
            // Capture the registration for later use, if needed
            let reg;

            // Use ES Module version of our Service Worker in development
            if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){//import.meta.env?.DEV) {
                reg = await navigator.serviceWorker.register('/myserviceworker.js', {
                    type: 'module',
                });
            } else {
                // In production, use the normal service worker registration
                reg = await navigator.serviceWorker.register('/myserviceworker.js');
            }

            console.log('Service worker registered! 😎', reg);
        } catch (err) {
            console.log('😥 Service worker registration failed: ', err);
        }
    });
}
