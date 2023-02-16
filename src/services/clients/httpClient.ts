export async function get(url: string): Promise<Response | null> {
  try {
    const response = await fetch(url);
    return response;
  } catch (e) {
    console.error('Unable to reach the api');
    return null;
  }
}
