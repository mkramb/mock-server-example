const API_URL = process.env.API_URL ?? 'http://localhost:3001';

const getFacts = async (): Promise<string[]> => {
  const response = await fetch(`${API_URL}/facts`, { cache: 'no-store' });
  return (await response.json()).data ?? [];
};

describe('Facts API', () => {
  let facts: string[] = [];

  beforeEach(async () => {
    facts = await getFacts();
  });

  test('should pass', async () => {
    expect(facts.length).toEqual(3);
  });
});
