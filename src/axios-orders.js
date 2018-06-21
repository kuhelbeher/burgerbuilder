import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-7ef7d.firebaseio.com/',
});

export default instance;
