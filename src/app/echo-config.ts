import Pusher from 'pusher-js';
import Echo from 'laravel-echo';

(window as any).Pusher = Pusher;

export const echo = new Echo({
    broadcaster: 'pusher',
    key: '4a99c14c8cdf7d757b7c',
    cluster: 'us3',
    forceTLS: true,
});



