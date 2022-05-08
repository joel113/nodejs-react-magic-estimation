export interface Payload {
  user?: string;
  color?: string;
  session?: string;
  element?: string;
  votes?: number;
}

export interface Message {
  type: string;
  payload?: Payload;
}
