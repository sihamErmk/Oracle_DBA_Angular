import { Component, OnInit } from '@angular/core';
import { OracleSecurityService } from '../../services/oracle-security.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-tde',
  imports: [CommonModule, FormsModule, HttpClientModule,NavBarComponent],
  providers: [OracleSecurityService],
  templateUrl: './tde.component.html',
  styleUrls: ['./tde.component.css']
})
export class TdeComponent implements OnInit {
  tdeConfigs: any[] = [];
  tableName = '';
  columnName = '';
  algorithm = '';

  constructor(private securityService: OracleSecurityService) {}

  ngOnInit(): void {
    this.loadTDEConfigurations();
  }

  loadTDEConfigurations(): void {
    this.securityService.getTDEConfigurations().subscribe({
      next: (data) => {
        console.log('TDE Configurations Loaded:', data);
        this.tdeConfigs = data;
      },
      error: (error) => {
        console.error('Error fetching TDE Configurations:', error);
      }
    });
  }

  enableTDE(): void {
    this.securityService.enableTDE(this.tableName, this.columnName, this.algorithm).subscribe({
      next: () => {
        this.loadTDEConfigurations();
        alert(`TDE enabled successfully for ${this.tableName}.${this.columnName} using algorithm ${this.algorithm}.`);
      },
      error: (error) => {
        alert(`Failed to enable TDE: ${error.error.message}`);
        console.error('Error enabling TDE:', error);
      }
    });
  }

  disableTDE(tableName: string, columnName: string, algorithm: string): void {
    const trimmedTableName = tableName.trim();
    const trimmedColumnName = columnName.trim();

    this.securityService.disableTDE(trimmedTableName, trimmedColumnName, algorithm).subscribe({
      next: (response) => {
        console.log(`Response from backend:`, response);  // Log the backend response
        alert(`TDE disabled successfully for ${trimmedTableName}.${trimmedColumnName}`);
        this.loadTDEConfigurations();  // Refresh the TDE configurations
      },
      error: (error) => {
        alert(`Failed to disable TDE: ${error.error.message}`);
        console.error('Error disabling TDE:', error);
      }
    });
  }


}
