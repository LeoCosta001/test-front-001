import axios from 'axios';
import environment from '../utils/environment'

export default axios.create({
  baseURL: environment.BASE_URL,
});
