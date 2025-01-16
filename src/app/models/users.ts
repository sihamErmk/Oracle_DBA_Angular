export interface PasswordResetRequest {
  newPassword: string;
}

export interface RoleDTO {
  name: string;
}

export interface UserDTO {
  username: string;
  password: string;
  defaultTablespace: string;
  temporaryTablespace: string;
  quotaLimit: string;
  roles: string[];
  passwordPolicy: PasswordPolicy;
}

export interface PasswordPolicy {
  expiryDays: number;
  minLength: number;
  requireSpecialChar: boolean;
  requireNumber: boolean;
  requireUpperCase: boolean;
}
export class UserComponent {
  selectedRole: string = ''; // Define the selectedRole property

  // Other code...
}
