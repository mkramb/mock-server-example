import mockServer from 'mockserver-client';
import { MockServerClient } from 'mockserver-client/mockServerClient';

const API_URL = process.env.API_URL ?? 'http://localhost:3001/facts';

const MOCK_SERVER_HOST = 'localhost';
const MOCK_SERVER_PORT = 1080;

const getFacts = async (): Promise<string[]> => {
  const response = await fetch(`${API_URL}`, { cache: 'no-store' });
  return (await response.json()).data ?? [];
};

describe('Facts API', () => {
  const mockedFacts = {
    data: [
      'A cat has more bones than a human; humans have 206, and the cat - 230.',
      'In ancient Egypt, mummies were made of cats, and embalmed mice were placed with them in their tombs. In one ancient city, over 300,000 cat mummies were found.',
      'The ancestor of all domestic cats is the African Wild Cat which still exists today.',
    ],
  };

  let facts: string[] = [];
  let apiServer: MockServerClient;

  beforeAll(() => {
    apiServer = mockServer.mockServerClient(MOCK_SERVER_HOST, MOCK_SERVER_PORT);
  });

  beforeEach(async () => {
    await apiServer.clear({}, 'LOG');
    await apiServer.mockAnyResponse({
      httpRequest: {
        method: 'GET',
        path: '/mock-facts',
      },
      httpResponse: {
        statusCode: 200,
        body: JSON.stringify(mockedFacts),
        headers: {
          'Content-Type': ['application/json'],
        },
      },
      times: {
        unlimited: true,
      },
    });

    facts = await getFacts();
  });

  test('should pass', async () => {
    expect(facts.length).toEqual(mockedFacts.data.length);

    await apiServer.verify({
      method: 'GET',
      path: '/mock-facts',
    });
  });
});
