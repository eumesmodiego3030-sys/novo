import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isLoading: boolean;
  conversationId: string;
  
  // Actions
  addMessage: (role: 'user' | 'assistant', content: string) => void;
  removeMessage: (id: string) => void;
  clearMessages: () => void;
  setIsOpen: (open: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setConversationId: (id: string) => void;
  getMessages: () => ChatMessage[];
  getLastMessage: () => ChatMessage | null;
  sendMessage: (content: string) => Promise<void>;
}

export const useChat = create<ChatState>()(
  devtools(
    (set, get) => ({
      messages: [],
      isOpen: false,
      isLoading: false,
      conversationId: '',
      
      addMessage: (role, content) => {
        const newMessage: ChatMessage = {
          id: `msg_${Date.now()}_${Math.random()}`,
          role,
          content,
          timestamp: new Date(),
        };
        
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      },
      
      removeMessage: (id) => {
        set((state) => ({
          messages: state.messages.filter((msg) => msg.id !== id),
        }));
      },
      
      clearMessages: () => {
        set({
          messages: [],
          conversationId: '',
        });
      },
      
      setIsOpen: (open) => {
        set({ isOpen: open });
      },
      
      setIsLoading: (loading) => {
        set({ isLoading: loading });
      },
      
      setConversationId: (id) => {
        set({ conversationId: id });
      },
      
      getMessages: () => get().messages,
      
      getLastMessage: () => {
        const messages = get().messages;
        return messages.length > 0 ? messages[messages.length - 1] : null;
      },
      
      sendMessage: async (content: string) => {
        // Add user message
        get().addMessage('user', content);
        get().setIsLoading(true);
        
        try {
          // ✅ SECURITY: Backend handles OpenAI API key securely
          const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
          
          const response = await fetch(`${backendUrl}/api/chat`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messages: get().messages.map((msg) => ({
                role: msg.role,
                content: msg.content,
              })),
            }),
          });
          
          if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
          }
          
          const data = await response.json();
          
          if (!data.success) {
            throw new Error(data.error || 'Failed to get response');
          }
          
          // Add assistant response
          get().addMessage('assistant', data.message);
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Unknown error';
          console.error('Chat error:', error);
          get().addMessage('assistant', `❌ Error: ${errorMsg}`);
        } finally {
          get().setIsLoading(false);
        }
      },
    }),
    { name: 'ChatStore' }
  )
);
