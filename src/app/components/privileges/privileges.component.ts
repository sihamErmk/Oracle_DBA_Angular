import { Component } from '@angular/core';
import { PrivilegeService } from '../../services/privilege.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Privilege } from '../../models/privilege';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { PrivilegeDTO } from '../../models/PrivilegeDTO';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-privileges',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, MatCardModule, FormsModule, MatInputModule, MatSelectModule, MatListModule, MatIconModule, ReactiveFormsModule, NavBarComponent],
  providers: [PrivilegeService,RoleService],
  templateUrl: './privileges.component.html',
  styleUrls: ['./privileges.component.css'] // Ensure this is styleUrls, not styleUrl
})
export class PrivilegesComponent {
  privileges: any[] = [];
  privilege: PrivilegeDTO = { name: '', description: '' };
  modifyPrivilegeForm: FormGroup;

  constructor(private privilegeService: PrivilegeService, private snackBar: MatSnackBar, private fb: FormBuilder,private roleService: RoleService) {
    this.modifyPrivilegeForm = this.fb.group({
      action: ['', Validators.required],
      privilegeName: ['', Validators.required],
      userName: ['', Validators.required],
      withAdminOption: [false]
    });
  }


  ngOnInit(): void {
    this.modifyPrivilegeForm = this.fb.group({
      action: ['', Validators.required],
      privilegeName: ['', Validators.required],
      userName: ['', Validators.required],
      withAdminOption: [false]
    });
    this.loadPrivileges();
  }

  loadPrivileges(): void {
    this.privilegeService.getAllPrivileges().subscribe(
      (data) => {
        this.privileges = data;
      },
      (error) => {
        console.error('Error fetching privileges', error);
      }
    );
  }

  deletePrivilege(name: string): void {
    this.privilegeService.deletePrivilege(name).subscribe(() => {
      this.loadPrivileges();
    });
  }

  createPrivilege(): void {
    this.privilegeService.createPrivilege(this.privilege).subscribe(
      () => {
        alert('Privilege created successfully');
      },
      (error) => {
        console.error('Error creating privilege', error);
      }
    );
  }

  modifyObjectPrivilege(): void {
    const formValue = this.modifyPrivilegeForm.value;
    console.log('Sending data to server for object privilege:', formValue);

    this.privilegeService.modifyObjectPrivilege(
      formValue.action,
      formValue.privilegeName,
      formValue.userName,
      formValue.withAdminOption
    ).subscribe(
      () => {
        this.snackBar.open('Object privilege modified successfully', 'Close', { duration: 2000 });
      },
      (error) => {
        console.error('Error modifying object privilege:', error);
        this.snackBar.open('Failed to modify object privilege. Please try again later.', 'Close', { duration: 2000 });
      }
    );
  }




}
