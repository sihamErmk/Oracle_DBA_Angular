export interface AuditConfig {
  id?: number;
  tableName: string;
  auditLevel: string;
  auditSuccessful: boolean;
  auditFailed: boolean;
  createdAt?: string[];
  createdBy?: string;
}
