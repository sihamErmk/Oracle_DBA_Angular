export interface VPDPolicy {
  id?: number;
  policyName: string;
  tableName: string;
  functionName: string;
  policyFunction: string;
  statementTypes: string;
  createdAt?: string[];
  createdBy?: string;
  active?: boolean;
}
