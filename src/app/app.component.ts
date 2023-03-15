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
  proposedCompanies$: Observable<Company[]> = of([]);
  availableCompanies$: Observable<Company[]> = of([]);
  subject = new BehaviorSubject('0');
  actionReplaySubject$ = new ReplaySubject();
  firstSubscriptionString = '';
  secondSubscriptionString = '';

  constructor(public http: HttpClient) {
    this.subject.subscribe((value) => {
      console.log(`Subscription init: ${value}`);
    });
  }

  selectTeam() {
    this.proposedCompanies$ = this.fetchProposedCompanies();
  }

  doAction() {
    this.updateCompany().subscribe(() => this.fetchProposedCompanies());
  }

  updateCompany(): Observable<Company> {
    return of({ id: '123US', name: 'Nike' });
  }

  fetchProposedCompanies(): Observable<any> {
    return of([
      { id: '1A', name: 'Shoes' },
      { id: '1B', name: 'Pants' },
      { id: '1C', name: 'Hats' },
    ]);
  }
}
