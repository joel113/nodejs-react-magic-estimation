export interface Payload {
  user?: string;
  session?: string;
  scale?: string;
  vote?: string;
}

export interface Message {
  type: string;
  payload?: Payload;
}
