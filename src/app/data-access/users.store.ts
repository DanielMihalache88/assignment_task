import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user.model';

@Injectable({ providedIn: 'root' })
export class UsersStore {

    private allUsers = new BehaviorSubject<User[]>([]);
    private countries = new BehaviorSubject<string[]>([]);

    allUsers$: Observable<User[]> = this.allUsers.asObservable();
    allCountries$: Observable<string[]> = this.countries.asObservable();

    setUsers(users: User[]) {
        this.allUsers.next(users);
    }

    setCountries(users: User[]) {
        const allCountries: string[] = users.map((user: User) => user.country);
        const noDuplicatesContries = [...new Set(allCountries)];
        const sortedCountries = noDuplicatesContries.sort((a, b) => a > b ? 1 : -1);

        this.countries.next(sortedCountries);
    }
}