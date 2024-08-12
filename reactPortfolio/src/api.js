import axios from 'axios';

// Base URL of your NestJS server
const API_URL = 'http://localhost:3000/projects'; 

// Fetch all projects
export const getProjects = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

// Create a new project
export const createProject = async (project) => {
  try {
    const response = await axios.post(API_URL, project);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};
