import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '60m',
};

export default function () {
  http.get('http://localhost:3001/movies/getAll');
  sleep(1);
  let randomId = Math.floor(Math.random() * 1000);
  http.get(`http://localhost:3001/movies/${randomId}`);
  sleep(1);
}
