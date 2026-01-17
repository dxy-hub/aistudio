export enum Role {
  USER = 'user',
  MODEL = 'model'
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: number;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  icon: string; // URL or icon name
  bgColor: string;
  textColor: string;
}

export interface Suggestion {
  id: string;
  text: string;
}