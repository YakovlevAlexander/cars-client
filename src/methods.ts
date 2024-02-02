import axios from 'axios';
import { writeFileSync, readFileSync } from 'fs-extra';

interface Car {
  brand: string;
  name: string;
  year: string;
  price: string;
}

const API_URL = 'http://localhost:3000/api';

async function writeToken(token: string) {
  await writeFileSync('./token', token);
}

async function readToken() {
  try {
    const token = await readFileSync('./token');
    return token;
  } catch (err) {
    console.log('Run "node dist/app.js get-token username password" to receive token first');
    process.exit(1);
  }
}

export async function getToken(username: string, password: string) {
  try {
    const res = await axios.post(`${API_URL}/auth/token`, {
      username,
      password,
    });
    const token = res.data.token;
    await writeToken(token);
  } catch (err) {
    console.log('Error fetching token');
    process.exit(1);
  }
}

export async function getCars(): Promise<void> {
  const token = await readToken();
  try {
    const res = await axios.get(`${API_URL}/cars`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log(JSON.stringify(res.data));
  } catch (err) {
    console.error('Error fetching cars', err);
  }
}

export async function getCarById(id: string): Promise<void> {
  const token = await readToken();
  try {
    const res = await axios.get(`${API_URL}/cars/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log(JSON.stringify(res.data));
  } catch (err) {
    console.error('Error fetching car by ID', err);
  }
}

export async function createCar(carData: Car): Promise<void> {
  const token = await readToken();
  try {
    const res = await axios.post(`${API_URL}/cars`, carData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log(JSON.stringify(res.data));
  } catch (err) {
    console.error('Error creating car', err);
  }
}

export async function updateCar(id: string, carData: Partial<Car>): Promise<void> {
  const token = await readToken();
  try {
    const res = await axios.put(`${API_URL}/cars/${id}`, carData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log(JSON.stringify(res.data));
  } catch (err) {
    console.error('Error updating car', err);
  }
}

export async function deleteCar(id: string): Promise<void> {
  const token = await readToken();
  try {
    await axios.delete(`${API_URL}/cars/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log(`Car ${id} deleted`);
  } catch (err) {
    console.error('Error deleting car', err);
  }
}
