import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PingService } from '../ping.service';

@Component({
  selector: 'app-name-entry',
  templateUrl: './name-entry.component.html',
  styleUrls: ['./name-entry.component.scss']
})
export class NameEntryComponent implements OnInit {
  @ViewChild('nametext') nameText: ElementRef;

  constructor(private pingServer: PingService) { }

  ngOnInit(): void {
  }

  onNameUpdate(): void {
    this.pingServer.viewerName = this.nameText.nativeElement.value;
  }

}
