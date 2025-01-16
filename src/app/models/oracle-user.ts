import { Role } from "./role";

export interface OracleUser {
  id?: number;
  username: string;
  password?: string;
  defaultTablespace?: string;
  temporaryTablespace?: string;
  quotaLimit?: string;
  accountLocked?: boolean;
  roles?: Role[];
  passwordExpiryDate?: Date;
  lastLoginDate?: Date;
  failedLoginAttempts?: number;
}
