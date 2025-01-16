import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { OracleSecurityService } from '../../services/oracle-security.service';
import { AuditConfig } from '../../models/AuditConfig';

@Component({
  selector: 'app-audit',
  imports: [CommonModule, HttpClientModule, FormsModule,ReactiveFormsModule, NavBarComponent],
  providers: [OracleSecurityService],
  template: `
    <div class="p-4">
      <app-nav-bar></app-nav-bar>

      <div class="max-w-4xl mx-auto mt-8">
        <h2 class="text-2xl font-bold mb-6">Audit Configuration</h2>

        <!-- Enable Auditing Form -->
        <div class="bg-white shadow rounded-lg p-6 mb-8">
          <h3 class="text-lg font-semibold mb-4">Enable Auditing</h3>
          <form [formGroup]="auditForm" (ngSubmit)="onEnableAudit()" class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Table Name</label>
              <input
                type="text"
                formControlName="tableName"
                class="w-full p-2 border rounded"
                [class.border-red-500]="auditForm.get('tableName')?.touched && auditForm.get('tableName')?.invalid"
              >
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Audit Level</label>
              <select
                formControlName="auditLevel"
                class="w-full p-2 border rounded"
              >
                <option value="ALL">ALL</option>
                <option value="SELECT">SELECT</option>
                <option value="INSERT">INSERT</option>
                <option value="UPDATE">UPDATE</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>

            <div class="flex space-x-4">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  formControlName="auditSuccessful"
                  class="mr-2"
                >
                <span class="text-sm">Audit Successful Operations</span>
              </label>

              <label class="flex items-center">
                <input
                  type="checkbox"
                  formControlName="auditFailed"
                  class="mr-2"
                >
                <span class="text-sm">Audit Failed Operations</span>
              </label>
            </div>

            <button
              type="submit"
              [disabled]="auditForm.invalid || isSubmitting"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {{ isSubmitting ? 'Enabling...' : 'Enable Auditing' }}
            </button>
          </form>
        </div>

        <!-- Current Configurations -->
        <div class="bg-white shadow rounded-lg p-6">
          <h3 class="text-lg font-semibold mb-4">Current Audit Configurations</h3>

          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audit Level</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Success/Failure</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr *ngFor="let config of auditConfigs">
                  <td class="px-6 py-4 whitespace-nowrap">{{ config.tableName }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ config.auditLevel }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span *ngIf="config.auditSuccessful" class="text-green-600 mr-2">Success</span>
                    <span *ngIf="config.auditFailed" class="text-red-600">Failure</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ config.createdBy }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      (click)="onDisableAudit(config.tableName)"
                      [disabled]="isSubmitting"
                      class="text-red-600 hover:text-red-900 disabled:text-gray-400"
                    >
                      Disable
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AuditComponent implements OnInit {
  auditForm: FormGroup;
  auditConfigs: AuditConfig[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private auditService: OracleSecurityService
  ) {
    this.auditForm = this.fb.group({
      tableName: ['', Validators.required],
      auditLevel: ['ALL', Validators.required],
      auditSuccessful: [true],
      auditFailed: [true]
    });
  }

  ngOnInit(): void {
    this.loadAuditConfigurations();
  }

  loadAuditConfigurations(): void {
    this.auditService.getAuditConfigurations().subscribe({
      next: (configs) => {
        this.auditConfigs = configs;
      },
      error: (error) => {
        console.error('Error loading audit configurations:', error);
        // Add error notification here
      }
    });
  }

  onEnableAudit(): void {
    if (this.auditForm.valid) {
      this.isSubmitting = true;
      const config: AuditConfig = this.auditForm.value;

      this.auditService.enableAuditing(config).subscribe({
        next: (response) => {
          this.auditConfigs.push(response);
          this.auditForm.reset({
            auditLevel: 'ALL',
            auditSuccessful: true,
            auditFailed: true
          });
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error enabling audit:', error);
          this.isSubmitting = false;
          // Add error notification here
        }
      });
    }
  }

  onDisableAudit(tableName: string): void {
    if (confirm(`Are you sure you want to disable auditing for table ${tableName}?`)) {
      this.isSubmitting = true;
      this.auditService.disableAuditing(tableName).subscribe({
        next: () => {
          this.auditConfigs = this.auditConfigs.filter(config => config.tableName !== tableName);
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error disabling audit:', error);
          this.isSubmitting = false;
          // Add error notification here
        }
      });
    }
  }
}
