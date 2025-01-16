import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlowQueryService } from '../../services/slow-queries.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-optimization-report',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [SlowQueryService],
  templateUrl: './optimization-report.component.html',
  styleUrl: './optimization-report.component.css'
})
export class OptimizationReportComponent implements OnInit {
  tuningReport: string = '';

  constructor(
    private route: ActivatedRoute,
    private slowQueryService: SlowQueryService
  ) {}

  ngOnInit(): void {
    const sqlId = this.route.snapshot.paramMap.get('sqlId')!;
    this.slowQueryService.getTuningReport(sqlId).subscribe((report) => {
      this.tuningReport = report;
    });
  }
}
