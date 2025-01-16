import { Component } from '@angular/core';
import { PerformanceOptimizationService } from '../../performance-optimization.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from '../nav-bar/nav-bar.component';


@Component({
  selector: 'app-gather-stats',
  imports: [CommonModule, ReactiveFormsModule,FormsModule, HttpClientModule, NavBarComponent],
  providers: [PerformanceOptimizationService],
  templateUrl: './gather-stats.component.html',
  styleUrls: ['./gather-stats.component.css']
})
export class GatherStatsComponent {
  schemaName: string = '';
  tableName: string = '';
  message: string = '';
  scheduleSchemaName: string = '';

  constructor(private performanceOptimizationService: PerformanceOptimizationService) { }

  // Call to gather stats for a specific table
  gatherStats(): void {
    this.performanceOptimizationService.gatherTableStats(this.schemaName, this.tableName).subscribe(
      () => {
        this.message = `Statistics gathered successfully for ${this.schemaName}.${this.tableName}`;
      },
      (error) => {
        this.message = `Error gathering stats: ${error.error?.message || 'Unknown error'}`;
      }
    );
  }

  // Call to schedule stats gathering for a schema
  scheduleStats(): void {
    this.performanceOptimizationService.scheduleStatsGathering(this.scheduleSchemaName).subscribe(
      () => {
        this.message = `Stats gathering scheduled successfully for schema: ${this.scheduleSchemaName}`;
      },
      (error) => {
        this.message = `Error scheduling stats gathering: ${error.error?.message || 'Unknown error'}`;
      }
    );
  }

  // Method to determine the alert class based on the message type
  getAlertClass(): string {
    if (this.message.includes('successfully')) {
      return 'alert success';
    } else if (this.message.includes('Error')) {
      return 'alert error';
    } else {
      return 'alert info';
    }
  }
}
