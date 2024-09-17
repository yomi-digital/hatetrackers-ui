export interface CheckUserResponse {
  canInteract: boolean;
  error: boolean;
}

export interface CheckApplicationResponse {
  message: string;
  applied: boolean;
  accepted: boolean;
  error: boolean;
}
