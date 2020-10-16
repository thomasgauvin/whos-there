import { Component, OnInit } from '@angular/core';
import { PingService } from '../ping.service';

@Component({
  selector: 'app-page-viewers',
  templateUrl: './page-viewers.component.html',
  styleUrls: ['./page-viewers.component.scss']
})
export class PageViewersComponent implements OnInit {

  pageViewers: string[];

  constructor(private pingService: PingService) { }

  ngOnInit(): void {
    this.pingService.pageViewers$.subscribe((pageViewers: string[]) => {
      this.pageViewers = pageViewers;
    });

    this.pageViewers = this.pingService.pageViewers;
  }

}
