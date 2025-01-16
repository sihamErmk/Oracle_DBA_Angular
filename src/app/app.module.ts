import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { UserService } from './services/user.service';
import { AppRoutingModule, routes } from './app.routes';
import { RmanDashboardComponent } from './components/rman-dashboard/rman-dashboard.component';

import { NgChartsModule } from 'ng2-charts';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PrivilegesComponent } from './components/privileges/privileges.component';
import { RoleService } from './services/role.service';
import { RoleComponent } from './components/roles/roles.component';
import { PrivilegeService } from './services/privilege.service';
import { RmanService } from './services/rman.service';
import { PerformanceMonitoringService } from './services/performance-monitoring.service';
import { OracleSecurityService } from './services/oracle-security.service';
import { PerformanceOptimizationService } from './performance-optimization.service';
import { SlowQueryService } from './services/slow-queries.service';


@NgModule({
  declarations: [
    // Add your components here

  ],

  imports: [

    RmanDashboardComponent,
    PrivilegesComponent,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    RoleComponent,
    AppRoutingModule

  ],

  providers: [
    UserService,
     RmanService,
     RoleService,
     PrivilegeService,
     PerformanceMonitoringService,
     OracleSecurityService,
     PerformanceOptimizationService,
     SlowQueryService,
     
  ],
  bootstrap: [] // Bootstrap your root component
})
export class AppModule {}
