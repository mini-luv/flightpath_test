import { Component, VERSION } from '@angular/core';
import { BehaviorSubject, of, Observable, ReplaySubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  constructor() {}

  selectTeam() {
    this.getProposedCompanies();
    this.getAvailableCompanies();
  }

  getProposedCompanies() {
    this.proposedCompanies$ = this.fetchProposedCompanies();
  }

  getAvailableCompanies() {
    this.availableCompanies$ = this.fetchAvailableCompanies();
  }

  doAction() {
    this.updateCompany().subscribe((company) => {
      console.log('New updated Company = ', company);
      this.getProposedCompanies();
      this.getAvailableCompanies();
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
