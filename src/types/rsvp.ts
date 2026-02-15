export interface RSVPFormData {
  name: string;
  email?: string;
  phone?: string;
  number_of_guests?: number | null;
  attending?: boolean;
  comments?: string;
}

export interface RSVPResponse {
  success: boolean;
  message?: string;
  error?: string;
}
