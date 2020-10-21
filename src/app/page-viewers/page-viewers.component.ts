import { Component, OnInit } from '@angular/core';
import { ActiveName, PingService } from '../ping.service';

@Component({
  selector: 'app-page-viewers',
  templateUrl: './page-viewers.component.html',
  styleUrls: ['./page-viewers.component.scss']
})
export class PageViewersComponent implements OnInit {

  pageViewers: ActiveName[];

  constructor(private pingService: PingService) { }

  ngOnInit(): void {
    this.pingService.pageViewers$.subscribe((pageViewers: ActiveName[]) => {
      this.pageViewers = pageViewers;
    });

    this.pageViewers = this.pingService.pageViewers;
  }

}
