declare module 'groq-sdk' {
  export interface ChatCompletion {
    choices: Array<{
      message: {
        content: string;
      };
    }>;
  }

  export interface ChatCompletionChunk {
    choices: Array<{
      delta: {
        content: string;
      };
    }>;
  }
} 