import { CodeBox } from '../interface/code';

const API_URL = process.env.REACT_APP_BE_URL || 'http://localhost:3001';


async function handleResponse(response: Response) {
  if (response.status === 409) {
    const data = await response.json();
    throw new Error(data.message);
  }
  if (response.status >= 400) {
    const data = await response.json();
    throw new Error(data.message);
  }
  try {
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getCodeBlocks(): Promise<CodeBox[]> {
  const response = await fetch(`${API_URL}/api/v1/code`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await handleResponse(response);
}


export async function getCodeBlocksByTitle(title: string): Promise<CodeBox[]> {
  const response = await fetch(`${API_URL}/api/v1/code/${title}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await handleResponse(response);
}

export async function updateCodeBox() {
  const response = await fetch(`${API_URL}/api/v1/code`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
  });
  return await handleResponse(response);
}