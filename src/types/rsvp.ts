export interface RSVPFormData {
  name: string;
  email?: string;
  phone?: string;
  number_of_guests: number;
}

export interface RSVPResponse {
  success: boolean;
  message?: string;
  error?: string;
}
