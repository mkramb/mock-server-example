import mockServer from 'mockserver-client';

const MOCK_SERVER_HOST = 'localhost';
const MOCK_SERVER_PORT = 1080;

async function setFactsProxy() {
  const apiServer = mockServer.mockServerClient(MOCK_SERVER_HOST, MOCK_SERVER_PORT);

  await apiServer.mockAnyResponse({
    httpRequest: {
      method: 'GET',
      path: '/proxy-facts',
    },
    httpOverrideForwardedRequest: {
      httpRequest: {
        method: 'GET',
        path: '/',
        headers: {
          Host: ['meowfacts.herokuapp.com'],
        },
        secure: true,
        socketAddress: {
          host: 'meowfacts.herokuapp.com',
          port: 443,
          scheme: 'HTTPS',
        },
      },
    },
    times: {
      unlimited: true,
    },
  });
}

setFactsProxy();
