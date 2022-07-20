export interface Payload {
  user?: string;
  color?: string;
  session?: string;
  element?: string;
  votes?: number;
  state?: number;
}

export interface Message {
  type: string;
  payload?: Payload;
}
