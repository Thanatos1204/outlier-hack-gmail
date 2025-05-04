export interface Email {
    id: number;
    sender: string;
    username: string;
    subject: string;
    content: string;
    date: string;
    read: boolean;
    category: string;
    fullContent?: string;
  }