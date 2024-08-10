
import axios from "axios";
import { baseUrl, baseUrlnpc, npcSubscriberUrl } from './config.jsx';

const newRequest = axios.create({
    baseURL: baseUrl,
    withCredentials: true,

});

export default newRequest;


const newRequestnpc = axios.create({
  baseURL: baseUrlnpc,
  withCredentials: true,
});
export { newRequestnpc };


const newRequestnpcsubscriber = axios.create({
  baseURL: npcSubscriberUrl,
  withCredentials: true,
});

export { newRequestnpcsubscriber };