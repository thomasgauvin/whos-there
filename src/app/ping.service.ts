import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PingService {
  private pageViewersSubject: BehaviorSubject<string[]>;

  pageViewers$: Observable<string[]>;

  constructor() {
    this.pageViewersSubject = new BehaviorSubject<string[]>(['Kevin']);
    this.pageViewers$ = this.pageViewersSubject.asObservable();
   }

   get pageViewers(): string[] {
     return this.pageViewersSubject.getValue();
   }
}
