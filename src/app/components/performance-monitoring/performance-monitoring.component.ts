import { Component, OnInit, ViewChild } from '@angular/core';
import { PerformanceMonitoringService } from '../../services/performance-monitoring.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartData } from 'chart.js';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-performance-monitoring',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, NgChartsModule,NavBarComponent],
  providers: [PerformanceMonitoringService],
  templateUrl: './performance-monitoring.component.html',
  styleUrls: ['./performance-monitoring.component.css']
})
export class PerformanceMonitoringComponent implements OnInit {

  realTimeStats: any = null;
  loadingStats: boolean = false;
  errorMessage: string | null = null;

  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };

  chartData: ChartData<'line'> = { datasets: [] };
  chartLabels: string[] = [];

  constructor(private performanceMonitoringService: PerformanceMonitoringService) { }

  ngOnInit(): void {
    this.loadRealTimeStats();
  }

  loadRealTimeStats(): void {
    this.loadingStats = true;
    this.performanceMonitoringService.getRealTimeStats()
      .subscribe(
        stats => {
          this.realTimeStats = stats;
          console.log('realTimeStats:', this.realTimeStats);

          // Create the chart data
          if (this.realTimeStats) {
            this.chartLabels = ['Memory', 'I/O', 'CPU'];  // Set the labels
            this.chartData = {
              datasets: [
                {
                  data: [
                    this.realTimeStats.memory / 1000000,  // Convert bytes to MB for readability
                    this.realTimeStats.io,
                    this.realTimeStats.cpu
                  ],
                  label: 'Performance Stats',
                  backgroundColor: 'rgba(0, 123, 255, 0.2)',
                  borderColor: 'rgb(0, 123, 255)',
                  borderWidth: 1
                }
              ]
            };
          }

          this.loadingStats = false;
        },
        error => {
          this.errorMessage = 'Failed to load real-time stats';
          this.loadingStats = false;
        }
      );
  }


  updateChart(): void {
    // Code pour mettre à jour le graphique (si nécessaire)
  }

  downloadAwrReport(): void {
    this.performanceMonitoringService.getAwrReport().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'AWR_Report.txt';
      a.click();
    });
  }

  downloadAshReport(): void {
    this.performanceMonitoringService.getAshReport().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ASH_Report.txt';
      a.click();
    });
  }
}
