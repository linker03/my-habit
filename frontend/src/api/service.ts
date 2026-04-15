import ky from 'ky';

export const apiInstance = ky.create({
  prefixUrl: '/api/',
  retry: 0,
  timeout: 60000,
});
