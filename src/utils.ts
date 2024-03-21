const baseUrl = 'https://api.thecatapi.com/v1';

export async function createFetch(requestUrl: string) {
  const res = await fetch(`${baseUrl}${requestUrl}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await res.json();

  return json;
}
