import Pusher from 'pusher-js'

const pusher = new Pusher('847563489a57d25228b0', {
  cluster: 'eu',
  forceTLS: true
});

export default pusher;
