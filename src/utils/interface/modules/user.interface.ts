export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  active_status?: boolean;
}

export interface UserAttributesOptional {
  id?: number;
  name: string;
  email: string;
  password?: string;
  active_status?: boolean;
}
