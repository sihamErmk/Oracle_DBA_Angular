import { Component } from '@angular/core';
import { PasswordResetRequest, RoleDTO, UserDTO } from '../../models/users';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { RoleService } from '../../services/role.service'; // Import RoleService

@Component({
  selector: 'app-user',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, NavBarComponent],
  templateUrl: './user.component.html',
  providers: [UserService, RoleService], // Make sure RoleService is provided
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  userForm!: FormGroup;
  users: any[] = [];
  roles: any[] = []; // Array to hold the roles
  selectedUser: any;

  constructor(private fb: FormBuilder, private userService: UserService, private roleService: RoleService) {} // Inject RoleService

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      defaultTablespace: ['', Validators.required],
      temporaryTablespace: ['', Validators.required],
      quotaLimit: [''],
      roles: [[]],
      passwordPolicy: this.fb.group({
        expiryDays: [90],
        minLength: [8],
        requireSpecialChar: [false],
        requireNumber: [false],
        requireUpperCase: [false],
      }),
    });
    this.loadUsers();
    this.loadRoles(); // Load roles
  }

  createUser(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      this.userService.createUser(user).subscribe(() => {
        alert('User created successfully!');
        this.loadUsers(); // Refresh the users list
      });
    }
  }

  deleteUser(username: string): void {
    this.userService.deleteUser(username).subscribe(() => {
      alert('User deleted successfully!');
      this.loadUsers(); // Refresh the users list after deletion
    });
  }

  // Fetch users
  loadUsers(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  // Replace the two separate role-loading methods with one
loadRoles(): void {
  this.roleService.getAllRoles().subscribe({
    next: (roles: any) => {
      this.roles = roles;
    },
    error: (error: any) => {
      console.error('Error loading roles:', error);
      alert('An error occurred while fetching roles.');
    },
  });
}


  // Fetch all roles (available roles to assign)
  getAllRoles(): void {
    this.roleService.getAllRoles().subscribe(
      (data: any) => { // Provide type for 'data'
        this.roles = data;
      },
      (error: any) => { // Provide type for 'error'
        console.error('Erreur lors de la récupération des rôles', error);
      }
    );
  }

  grantRole(username: string, event: Event): void {
    const target = event.target as HTMLSelectElement;
    const roleName = target.value;
    if (roleName) {
      const role: RoleDTO = { name: roleName };
      this.userService.grantRole(username, role).subscribe(() => {
        alert('Role granted successfully!');
        this.loadUsers();  // Refresh the users list after assigning the role
      });
    }
  }


  revokeRole(username: string, roleName: string): void {
    const encodedRoleName = encodeURIComponent(roleName);  // Encode role name

    this.userService.revokeRole(username, encodedRoleName).subscribe(
      () => {
        alert('Role revoked successfully!');
        this.loadUsers();  // Refresh the users list after revoking the role
      },
      (error) => {
        console.error('Error while revoking role:', error);
        if (error.status === 500) {
          alert('An internal server error occurred while revoking the role. Please try again later.');
        } else {
          alert(`An error occurred: ${error.statusText}`);
        }
      }
    );
  }





  // Lock account
  lockAccount(username: string): void {
    this.userService.lockAccount(username).subscribe(() => {
      alert('Account locked successfully!');
    });
  }

  // Unlock account
  unlockAccount(username: string): void {
    this.userService.unlockAccount(username).subscribe(() => {
      alert('Account unlocked successfully!');
    });
  }

  // Select user to edit
  selectUser(user: any): void {
    this.selectedUser = user;
    this.userForm.patchValue(user);
  }
}
