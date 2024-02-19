import mockServer from 'mockserver-client';

const MOCK_SERVER_HOST = 'localhost';
const MOCK_SERVER_PORT = 1080;

async function setMockFacts() {
  const apiServer = mockServer.mockServerClient(MOCK_SERVER_HOST, MOCK_SERVER_PORT);
  const mockedFacts = {
    data: [
      'A cat has more bones than a human; humans have 206, and the cat - 230.',
      'In ancient Egypt, mummies were made of cats, and embalmed mice were placed with them in their tombs. In one ancient city, over 300,000 cat mummies were found.',
      'The ancestor of all domestic cats is the African Wild Cat which still exists today.',
    ],
  };

  await apiServer.mockAnyResponse({
    httpRequest: {
      method: 'GET',
      path: '/mocked-facts',
    },
    httpResponse: {
      statusCode: 200,
      body: JSON.stringify(mockedFacts),
      headers: {
        'Content-Type': ['application/json'],
      },
      delay: {
        timeUnit: 'SECONDS',
        value: 2,
      },
    },
    times: {
      unlimited: true,
    },
  });
}

setMockFacts();
