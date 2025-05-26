declare module 'mem0ai/oss' {
  export class Memory {
    constructor(config: {
      llm: {
        provider: string;
        config: {
          apiKey: string;
          model: string;
          temperature: number;
          maxTokens: number;
        };
      };
    });

    search(query: string, options: { userId: string }): Promise<{
      results: Array<{ memory: string }>;
    }>;

    add(messages: Array<{ role: string; content: string }>, options: { 
      userId: string;
      metadata?: Record<string, any>;
    }): Promise<void>;
  }
} 