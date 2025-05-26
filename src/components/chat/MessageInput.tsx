// Add proper type declarations for the Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// Define custom types for Speech Recognition
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: {
    transcript: string;
    confidence: number;
  };
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mic, MicOff, Send, AlertCircle } from 'lucide-react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const isSpeechRecognitionSupported = !!SpeechRecognition;

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [interim, setInterim] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (!isSpeechRecognitionSupported) {
      console.warn('Speech Recognition not supported by this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognitionRef.current = recognition;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      setMessage((prev) => prev + finalTranscript);
      setInterim(interimTranscript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      let errorMsg = `Speech recognition error: ${event.error}`;
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        errorMsg = 'Microphone access denied. Please allow microphone access in browser settings.';
      } else if (event.error === 'no-speech') {
        errorMsg = 'No speech detected. Please try again.';
      }
      setMicError(errorMsg);
      setIsRecording(false);
    };

    recognition.onend = () => {
      console.log('Speech recognition ended.');
      setIsRecording(false);
    };

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.error('Error stopping recognition during cleanup:', error);
        }
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      setInterim('');
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleRecording = () => {
    if (!isSpeechRecognitionSupported) {
      setMicError('Speech Recognition is not supported by your browser.');
      return;
    }
    const recognition = recognitionRef.current;
    if (!recognition) {
      setMicError('Speech Recognition could not be initialized.');
      return;
    }

    setMicError(null);

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
      console.log('Speech recognition stopped by user.');
    } else {
      try {
        recognition.start();
        setIsRecording(true);
        console.log('Speech recognition started.');
      } catch (error) {
        if (error instanceof Error && error.name === 'InvalidStateError') {
          console.warn('Recognition already started.');
        } else {
          console.error('Error starting speech recognition:', error);
          setMicError('Could not start microphone. Check permissions.');
          setIsRecording(false);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t p-4 bg-background">
      <div className="flex items-end gap-2">
        <div className="relative flex-1">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setInterim(''); // Clear interim when typing manually
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ask Dr. Kamraan... (or use the mic)"
            className="min-h-[60px] w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 pr-12"
            disabled={disabled}
            aria-label="Type your message here"
          />
          {interim && (
            <div className="absolute bottom-0 left-0 w-full px-3 py-2 text-muted-foreground italic">
              {interim}
            </div>
          )}
        </div>

        <Button
          type="button"
          size="icon"
          variant="outline"
          onClick={toggleRecording}
          className={isRecording ? 'bg-destructive text-destructive-foreground animate-pulse' : ''}
          disabled={disabled || !isSpeechRecognitionSupported}
          title={
            isSpeechRecognitionSupported
              ? isRecording
                ? 'Stop recording'
                : 'Start recording'
              : 'Speech input not supported'
          }
        >
          {!isSpeechRecognitionSupported ? (
            <AlertCircle size={18} />
          ) : isRecording ? (
            <MicOff size={18} />
          ) : (
            <Mic size={18} />
          )}
        </Button>

        <Button
          type="submit"
          size="icon"
          disabled={!message.trim() || disabled}
          title="Send message"
        >
          <Send size={18} />
        </Button>
      </div>

      {micError && (
        <p className="text-xs text-destructive mt-1 flex items-center gap-1">
          <AlertCircle size={14} /> {micError}
        </p>
      )}
    </form>
  );
};

export default MessageInput;
