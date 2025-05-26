declare module 'neo4j-driver' {
  export interface Driver {
    close(): Promise<void>;
    session(): Session;
  }

  export interface Session {
    run(query: string, params?: Record<string, any>): Promise<Result>;
    close(): Promise<void>;
  }

  export interface Result {
    records: Record[];
    summary: ResultSummary;
  }

  export interface Record {
    get(key: string): any;
    toObject(): Record<string, any>;
  }

  export interface ResultSummary {
    counters: Counters;
    query: Query;
    resultConsumedAfter: number;
    resultAvailableAfter: number;
  }

  export interface Counters {
    nodesCreated: number;
    nodesDeleted: number;
    relationshipsCreated: number;
    relationshipsDeleted: number;
    propertiesSet: number;
    labelsAdded: number;
    labelsRemoved: number;
    indexesAdded: number;
    indexesRemoved: number;
    constraintsAdded: number;
    constraintsRemoved: number;
  }

  export interface Query {
    text: string;
    parameters: Record<string, any>;
  }

  export interface Auth {
    basic(username: string, password: string): AuthToken;
  }

  export interface AuthToken {
    scheme: string;
    principal: string;
    credentials: string;
  }

  export function driver(url: string, auth: AuthToken): Driver;
  export const auth: Auth;
} 