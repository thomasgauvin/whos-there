import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PingService } from '../ping.service';

@Component({
  selector: 'app-name-entry',
  templateUrl: './name-entry.component.html',
  styleUrls: ['./name-entry.component.scss']
})
export class NameEntryComponent implements OnInit {
  @ViewChild('nametext') nameText: ElementRef;
  private nameId: string = 'name';
  name: string = '';

  constructor(private pingServer: PingService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const name: string = params.get(this.nameId);

      if (name) {
        this.name = name;
        this.onNameUpdate();
      }
    });
  }

  onNameUpdate(): void {
    this.pingServer.viewerName = this.name;

    if (this.route.snapshot.paramMap.get(this.nameId) !== this.name) {
      this.router.navigate(['/name', this.name]);
    }
  }

}
