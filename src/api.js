import axios from 'axios';
import { getConfig } from './config.js';

function getClient() {
  const apiKey = getConfig('apiKey');
  const baseURL = getConfig('baseURL') || 'https://api.rapidapi.com/v1';

  if (!apiKey) {
    throw new Error('API key not configured. Run: rapidapi config set --api-key YOUR_KEY');
  }

  return axios.create({
    baseURL,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  });
}

async function request(method, endpoint, data = null) {
  const client = getClient();
  try {
    const response = await client.request({
      method,
      url: endpoint,
      data
    });
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(`API Error: ${error.response.data.message}`);
    }
    throw new Error(`Request failed: ${error.message}`);
  }
}

export async function listItems(params = {}) {
  const query = new URLSearchParams(params).toString();
  return await request('GET', `/items${query ? '?' + query : ''}`);
}

export async function getItem(id) {
  return await request('GET', `/items/${id}`);
}

export async function createItem(data) {
  return await request('POST', '/items', data);
}

export async function updateItem(id, data) {
  return await request('PUT', `/items/${id}`, data);
}

export async function deleteItem(id) {
  return await request('DELETE', `/items/${id}`);
}
