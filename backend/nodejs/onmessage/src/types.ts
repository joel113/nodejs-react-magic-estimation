export interface Payload {
  user?: string;
  color?: string;
  session?: string;
  element?: string;
}

export interface Message {
  type: string;
  payload?: Payload;
}
