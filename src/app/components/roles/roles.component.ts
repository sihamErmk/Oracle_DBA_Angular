import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-roles',
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule,NavBarComponent,FormsModule],
   providers: [RoleService],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RoleComponent implements OnInit {
  roles: any[] = [];
  roleForm: FormGroup;
  availablePrivileges: string[] = [];
  currentRole: any;
  selectedPrivilege: string = ''; // For the privilege to grant
  selectedPrivilegeToRevoke: string = ''; // For the privilege to revoke
  rolePrivileges: any[] = [];

  constructor(private roleService: RoleService, private fb: FormBuilder) {
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllRoles();
    this.getAvailablePrivileges();
  }

  // Récupérer tous les rôles
  getAllRoles() {
    this.roleService.getAllRoles().subscribe(
      (data) => {
        this.roles = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des rôles', error);
      }
    );
  }

  // Créer un rôle
  createRole() {
    if (this.roleForm.invalid) {
      return;
    }
    const roleData = this.roleForm.value;
    this.roleService.createRole(roleData).subscribe(
      () => {
        this.getAllRoles();
        this.roleForm.reset();
      },
      (error) => {
        console.error('Erreur lors de la création du rôle', error);
      }
    );
  }

  // Supprimer un rôle
  deleteRole(roleName: string) {
    const encodedRoleName = encodeURIComponent(roleName);
    this.roleService.deleteRole(encodedRoleName).subscribe(
      () => {
        this.getAllRoles();
      },
      (error) => {
        console.error('Erreur lors de la suppression du rôle', error);
      }
    );
  }


// Afficher les privilèges du rôle
togglePrivileges(role: any) {
  this.currentRole = role;
  this.rolePrivileges = role.privileges || []; // Assuming role has a 'privileges' property
  this.selectedPrivilegeToRevoke = '';  // Reset the privilege to revoke
}

  // Accorder un privilège
  grantPrivilege(roleName: string, privilegeName: string) {
    if (!roleName || !privilegeName) {
      return;
    }
    const encodedRoleName = encodeURIComponent(roleName);
    this.roleService.grantPrivilege(encodedRoleName, privilegeName).subscribe(
      () => {
        console.log('Privilège accordé');
        this.getAllRoles(); // Mettre à jour les rôles après l'accord du privilège
      },
      (error) => {
        console.error('Erreur lors de l\'accorder le privilège', error);
      }
    );
  }

  // Révoquer un privilège
  // Révoquer un privilège
revokePrivilege(roleName: string, privilegeName: string) {
  if (!roleName || !privilegeName) {
    return;
  }
  const encodedRoleName = encodeURIComponent(roleName);
  const encodedPrivilegeName = encodeURIComponent(privilegeName);

  this.roleService.revokePrivilege(encodedRoleName, encodedPrivilegeName).subscribe(
    () => {
      console.log('Privilège révoqué');
      this.getAllRoles(); // Mettre à jour les rôles après la révocation du privilège
      this.selectedPrivilegeToRevoke = ''; // Reset the selected privilege
    },
    (error) => {
      console.error('Erreur lors de la révocation du privilège', error);
    }
  );
}

  // Récupérer les privilèges disponibles
  getAvailablePrivileges() {
    this.roleService.getAvailablePrivileges().subscribe(
      (data) => {
        this.availablePrivileges = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des privilèges disponibles', error);
      }
    );
  }

  trackByRole(index: number, role: any): string {
    return role.name;
  }
}
