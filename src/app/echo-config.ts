import Pusher from 'pusher-js';
import Echo from 'laravel-echo';

// Guardar la instancia de Pusher en la ventana global para que pueda ser accedida desde cualquier lugar
(window as any).Pusher = Pusher;

// Declaramos la instancia de Echo y la exportamos para usarla en otros componentes
export const echo = new Echo({
    broadcaster: 'pusher',
    key: '4a99c14c8cdf7d757b7c',
    cluster: 'us3',
    forceTLS: true,
});



