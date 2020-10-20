import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription, timer } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PingService {
  private pageViewersSubject: BehaviorSubject<string[]>;
  pageViewers$: Observable<string[]>;

  private pingUrl: string = '/api/ping';

  private _viewerName: string = '';

  private subscription: Subscription;

  constructor(private http: HttpClient) {
    this.pageViewersSubject = new BehaviorSubject<string[]>(['Loading...']);
    this.pageViewers$ = this.pageViewersSubject.asObservable();

    this.subscription = timer(0, 5000).subscribe(result => {
      this.updatePageViewers();
    });
   }

   get pageViewers(): string[] {
     return this.pageViewersSubject.getValue();
   }

   get viewerName(): string {
     return this._viewerName;
   }

   set viewerName(viewerName: string) {
     this._viewerName = viewerName;
   }

   private updatePageViewers(): void {
    if (this.viewerName) {
      const pingWithName = this.pingUrl + '?name=' + this.viewerName;
      this.http.post(pingWithName, null).pipe(catchError(error => of([])))
      .subscribe((pageViewers: string[]) => {
        this.pageViewersSubject.next(pageViewers);
      });
    } else {
      this.http.get(this.pingUrl).pipe(catchError(error => of([])))
        .subscribe((pageViewers: string[]) => {
          this.pageViewersSubject.next(pageViewers);
        });
    }
   }
}
