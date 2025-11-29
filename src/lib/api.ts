// Mock API functions for authentication

export type User = {
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
};

export type LoginCredentials = {
  username: string;
  password: string;
};

export type RegisterCredentials = {
  username: string;
  email: string;
  password: string;
};

// Mock successful login response
export const login = async (credentials: LoginCredentials): Promise<User> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock validation
  if (!credentials.username || !credentials.password) {
    throw new Error("Username and password are required");
  }

  // Return mock user data
  return {
    id: "user-1234567890",
    username: credentials.username,
    email: `${credentials.username}@example.com`,
    role: "admin",
    createdAt: new Date().toISOString(),
  };
};

// Mock successful register response
export const register = async (credentials: RegisterCredentials): Promise<boolean> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700));

  // Mock validation
  if (!credentials.username || !credentials.email || !credentials.password) {
    throw new Error("All fields are required");
  }

  // Return success
  return true;
};

// Mock user profile data
export const getUserProfile = async (userId: string): Promise<User> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Return mock user profile
  return {
    id: userId,
    username: "admin",
    email: "admin@example.com",
    role: "admin",
    createdAt: new Date().toISOString(),
  };
};

// Mock logout
export const logout = async (): Promise<boolean> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Return success
  return true;
};
