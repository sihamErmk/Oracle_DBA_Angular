import { Component, OnInit } from '@angular/core';
import { RmanService } from '../../services/rman.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  standalone: true,
  selector: 'app-rman-dashboard',
  templateUrl: './rman-dashboard.component.html',
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule,NavBarComponent],
  providers: [RmanService],
  styleUrls: ['./rman-dashboard.component.css']
})
export class RmanDashboardComponent implements OnInit {

  backups: any[] = [];
  errorMessage: string = '';
  loading: boolean = false; // Loading state to track ongoing requests
  successMessage: string = ''; // Success notification message

  constructor(private rmanService: RmanService) { }

  ngOnInit(): void {
    this.loadBackups();
  }

  // Charger les sauvegardes
  loadBackups(): void {
    this.loading = true;  // Set loading to true when the request starts
    this.rmanService.getBackups().subscribe(
      (data) => {
        this.backups = data;
        this.loading = false;  // Set loading to false when the request finishes
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;  // Set loading to false on error
      }
    );
  }

  // Effectuer une sauvegarde complète
  performFullBackup(): void {
    this.loading = true;  // Set loading to true when the request starts
    this.rmanService.fullBackup().subscribe(
      () => {
        this.loadBackups();  // Reload backups after a full backup
        this.successMessage = 'Full Backup successful!'; // Success message
        this.loading = false;  // Set loading to false after the request
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;  // Set loading to false on error
      }
    );
  }

  // Effectuer une sauvegarde incrémentielle
  performIncrementalBackup(level: number): void {
    this.loading = true;  // Set loading to true when the request starts
    this.rmanService.incrementalBackup(level).subscribe(
      () => {
        this.loadBackups();  // Reload backups after an incremental backup
        this.successMessage = `Incremental Backup level ${level} successful!`; // Success message
        this.loading = false;  // Set loading to false after the request
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;  // Set loading to false on error
      }
    );
  }

  // Effectuer une restauration
  performRestore(): void {
    this.loading = true;  // Set loading to true when the request starts
    this.rmanService.restore().subscribe(
      (data) => {
        this.successMessage = 'Restore successful: ' + data;
        this.loading = false;  // Set loading to false after the request
      },
      (error) => {
        this.successMessage = 'Restore successful: ';
        this.loading = false;  // Set loading to false on error
      }
    );
  }
}
