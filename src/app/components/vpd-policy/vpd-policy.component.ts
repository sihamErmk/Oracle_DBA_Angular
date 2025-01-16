import { Component, OnInit } from '@angular/core';
import { OracleSecurityService } from '../../services/oracle-security.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';  // Add FormBuilder and Validators
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-vpd-policy',
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule,NavBarComponent],
  providers: [OracleSecurityService],
  templateUrl: './vpd-policy.component.html', // Use this if you want to keep the template in a separate file
  styleUrls: ['./vpd-policy.component.css'] // Fix to styleUrls
})
export class VpdPolicyComponent implements OnInit {
  policyForm!: FormGroup;
  isSubmitting = false;
  vpdPolicies: any[] = []; // Define the list for VPD policies

  constructor(private securityService: OracleSecurityService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadVPDPolicies();
    this.initForm();
  }

  // Initialize the form with form controls and validation
  initForm(): void {
    this.policyForm = this.fb.group({
      policyName: ['', Validators.required],
      tableName: ['EMPLOYES', Validators.required],
      functionName: ['EMP_ACCESS_FUNC', Validators.required],
      policyFunction: ["RETURN 'DEPARTMENT_ID = 20'", Validators.required],
      statementTypes: ['SELECT', Validators.required]
    });
  }

  // Load existing VPD policies
  loadVPDPolicies(): void {
    this.securityService.getVPDPolicies().subscribe({
      next: (data) => {
        this.vpdPolicies = data;
      },
      error: (error) => {
        console.error('Error fetching VPD policies:', error);
      }
    });
  }

  // Create a new VPD policy
  createVPDPolicy(): void {
    if (this.policyForm.valid) {
      this.isSubmitting = true;
      const newPolicy = this.policyForm.value;

      this.securityService.createVPDPolicy(newPolicy).subscribe({
        next: (response) => {
          this.vpdPolicies.push(response);
          this.policyForm.reset({
            tableName: 'EMPLOYES',
            functionName: 'EMP_ACCESS_FUNC',
            policyFunction: "RETURN 'DEPARTMENT_ID = 20'",
            statementTypes: 'SELECT'
          });
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error creating VPD policy:', error);
          this.isSubmitting = false;
        }
      });
    }
  }

  // Delete a VPD policy
  deleteVPDPolicy(policyName: string): void {
    this.securityService.dropVPDPolicy(policyName).subscribe({
      next: () => {
        this.loadVPDPolicies();  // Refresh the policies list after deletion
      },
      error: (error) => {
        console.error('Error deleting VPD policy:', error);
      }
    });
  }
}
