import axios from 'axios';
import { User, ApiResponse } from '../types';

const API_BASE_URL = '/api';

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const userService = {

  createUser: async (userData: {
    first_name: string;
    last_name: string;
    email: string;
    roles: string[];
  }): Promise<ApiResponse<User>> => {
    try {
      const response = await httpClient.post('/users', userData);
      return response.data;
    } catch (error) {
        alert(error?.response.data.message)
      throw new Error('Failed to create user');
    }
  },

  getUsers: async (): Promise<ApiResponse<User[]>> => {
    try {
      const response = await httpClient.get('/users');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  },

  getUsersByRole: async (role: string): Promise<ApiResponse<User[]>> => {
    try {
      const response = await httpClient.get(`/users/by-role/${role}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch users with role: ${role}`);
    }
  },
};
