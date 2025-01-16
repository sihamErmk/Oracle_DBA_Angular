import { RouterModule, Routes } from '@angular/router';

import { PrivilegesComponent } from './components/privileges/privileges.component';
import { RmanDashboardComponent } from './components/rman-dashboard/rman-dashboard.component';
import { UserComponent } from './components/user/user.component';
import { RoleComponent } from './components/roles/roles.component';
import { NgModule } from '@angular/core';
import { TdeComponent } from './components/tde/tde.component';
import { VpdPolicyComponent } from './components/vpd-policy/vpd-policy.component';
import { PerformanceMonitoringComponent } from './components/performance-monitoring/performance-monitoring.component';
import { AuditComponent } from './components/audit/audit.component';
;
import { GatherStatsComponent } from './components/gather-stats/gather-stats.component';
import { SlowQueriesComponent } from './components/slow-queries/slow-queries.component';
import { OptimizationReportComponent } from './components/optimization-report/optimization-report.component';
import { LoginComponent } from './components/login/login.component';




export  const routes: Routes = [
    { path: 'roles', component: RoleComponent },
    { path: 'privileges', component: PrivilegesComponent },
    { path: 'user', component: UserComponent },
    { path: 'backup-restore', component: RmanDashboardComponent },
    { path: 'performances', component: PerformanceMonitoringComponent  },
    { path: 'tde', component: TdeComponent },
    { path: 'vdp', component: VpdPolicyComponent },
    { path: 'audit', component: AuditComponent },
    { path: 'gather-stats', component: GatherStatsComponent },
    { path: 'slow-queries', component: SlowQueriesComponent },
    { path: 'optimization-report/:sqlId', component: OptimizationReportComponent },
    { path: 'login', component: LoginComponent },

    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Optional: default route
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)], // Ensure this is only in the routing module
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
