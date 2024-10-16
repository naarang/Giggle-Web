export type SignInRequest = {
  serial_id: string;
  password: string;
}

export type SignInResponse = {
  access_token: string;
  refresh_token: string;
}