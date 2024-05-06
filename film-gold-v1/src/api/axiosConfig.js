import axios from 'axios';

export default axios.create({
    baseURL:'http://localhost:8080',
    //so that client isnt blocked, so we can access relevant resources
    //Not needed as hosting locally
    //headers:{"ngrok-skip-browser-warning": "true"}
});