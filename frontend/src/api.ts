export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:7268';

export async function fetchCv() {
  const response = await fetch(`${API_BASE_URL}/api/cv`);

  if (!response.ok) {
    throw new Error(`Failed to load CV: ${response.status}`);
  }

  return response.json();
}

