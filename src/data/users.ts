// Mock user data for the application
// In a real application, this would be stored in a database

export interface User {
  id: number;
  email: string;
  password: string;
  cursosInscritos: number[];
}

export const users: User[] = [
  {
    id: 1,
    email: "user@example.com",
    password: "password123",
    cursosInscritos: [1]
  },
  {
    id: 2,
    email: "test@example.com",
    password: "test123",
    cursosInscritos: [1, 2]
  }
];

// Helper functions for user management
export const UserService = {
  getAll: () => users,
  
  getById: (id: number) => {
    return users.find(user => user.id === id);
  },
  
  getByEmail: (email: string) => {
    return users.find(user => user.email === email);
  },
  
  authenticate: (email: string, password: string) => {
    return users.find(user => user.email === email && user.password === password);
  },
  
  create: (email: string, password: string) => {
    const existingUser = UserService.getByEmail(email);
    if (existingUser) return null;
    
    const newUser: User = {
      id: users.length + 1,
      email,
      password,
      cursosInscritos: []
    };
    
    users.push(newUser);
    return newUser;
  }
}; 