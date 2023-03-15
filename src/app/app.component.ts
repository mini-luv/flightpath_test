import { Component, VERSION } from '@angular/core';
import { BehaviorSubject, of, Observable, ReplaySubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

interface Company {
  id: string;
  name: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  proposedCompanies$: Observable<[]> = of([]);
  availableCompanies$: Observable<[]> = of([]);
  refreshBook$ = new BehaviorSubject<boolean>(true);

  constructor() {}

  // Starts the chain of getting the books
  selectTeam() {
    this.proposedCompanies$ = this.refreshBook$.pipe(
      switchMap(() => this.fetchProposedCompanies())
    );
    this.availableCompanies$ = this.refreshBook$.pipe(
      switchMap(() => this.fetchAvailableCompanies())
    );
  }

  // Any action that returns an updated Company
  doAction() {
    this.updateCompany().subscribe((company) => {
      console.log('New updated Company = ', company);
      // the new value doesn't matter - it will just trigger the flow
      this.refreshBook$.next(true);
    });
  }

  updateCompany(): Observable<Company> {
    return of({ id: '123US', name: 'Nike' });
  }

  fetchProposedCompanies(): Observable<any> {
    const dcs = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
    return of(dcs);
  }

  fetchAvailableCompanies(): Observable<any> {
    const dcs = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
    return of(dcs);
  }
}
