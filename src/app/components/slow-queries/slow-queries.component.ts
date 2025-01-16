import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SlowQueryService } from '../../services/slow-queries.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-slow-queries',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule,NavBarComponent],
  providers: [SlowQueryService],
  templateUrl: './slow-queries.component.html',
  styleUrl: './slow-queries.component.css'
})
export class SlowQueriesComponent implements OnInit {
  slowQueries: any[] = [];

  constructor(private slowQueryService: SlowQueryService, private router: Router) {}

  ngOnInit(): void {
    this.loadSlowQueries();
  }

  loadSlowQueries(): void {
    this.slowQueryService.getSlowQueries().subscribe((data) => {
      this.slowQueries = data;
    });
  }

  optimizeQuery(sqlId: string): void {
    this.router.navigate(['/optimization-report', sqlId]);
  }
}
