import axios from 'axios';

const instance =axios.create({
    baseURL:'https://burgerbuilder-7621e.firebaseio.com/'
});

export default instance;