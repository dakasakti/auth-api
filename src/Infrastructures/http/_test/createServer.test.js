const createServer = require('../createServer');
const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const container = require('../../container');

describe('HTTP server', () => {
  it('should response 404 when request unregistered route', async () => {
    const server = await createServer({});

    const response = await server.inject({
      method: 'GET',
      url: '/unregisteredRoute',
    });

    expect(response.statusCode).toEqual(404);
  });

  it('should handle server error correctly', async () => {
    const requestPayload = {
      username: 'dicoding',
      password: 'secret',
      fullname: 'Dicoding Indonesia',
    };

    const server = await createServer({});

    const response = await server.inject({
      method: 'POST',
      url: '/users',
      payload: requestPayload,
    });

    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(500);
    expect(responseJson.status).toEqual('error');
    expect(responseJson.message).toEqual('terjadi kegagalan pada server kami');
  });

  describe('when GET /', () => {
    it('should return 200 and hello world', async () => {
      const server = await createServer();

      const response = await server.inject({
        method: 'GET',
        url: '/',
      });

      console.log(response.payload);

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual('Hello world!');
    });
  });

  describe('when GET /hello', () => {
    it('should return 200 and hello world', async () => {
      const server = await createServer();

      const response = await server.inject({
        method: 'GET',
        url: '/hello',
      });

      console.log(response.payload);

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual('Edited by Dakasakti');
    });
  });
});
