import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user.model';

@Injectable({ providedIn: 'root' })
export class UsersStore {
    private allUsers = new BehaviorSubject<User[]>([]);
    private filteredByNameSubject = new BehaviorSubject<User[]>([]);
    private countriesSubject = new BehaviorSubject<string[]>([]);
    private filteredByCountry = new BehaviorSubject<User[]>([]);

    allUsers$: Observable<User[]> = this.allUsers.asObservable();
    filteredUsers$: Observable<User[]> = this.filteredByNameSubject.asObservable();
    allCountries$: Observable<string[]> = this.countriesSubject.asObservable();
    filteredByCountry$: Observable<User[]> = this.filteredByCountry.asObservable();

    setUsers(users: User[]) {
        this.allUsers.next(users);
    }

    handleFilterByName(searchTerm: string, countrySelection: string) {
        const filteredByCountry = this.filteredByCountry.getValue();

        /**if filteredByCountry has items, this means that 
         * the users have already been filtered from the dropdown
        */

        if (filteredByCountry.length || countrySelection.length) {
            this.filterUsersByName(filteredByCountry, searchTerm);
            return;
        }

        const allUsers = this.allUsers.getValue();

        this.filterUsersByName(allUsers, searchTerm);
    }

    handleFilterByCountry(selectedCountry: string, searchInputValue: string) {
        const filteredByNameResults = this.filteredByNameSubject.getValue();

        /**if filteredByNameResults has items, this means that 
         * the users have already been filtered from the searchInput
        */

        if (!searchInputValue.length) {
            const allUsers = this.allUsers.getValue();
            this.filterUsersByCountry(allUsers, selectedCountry);
            return;
        }

        if (filteredByNameResults.length) {
            this.filterUsersByCountry(filteredByNameResults, selectedCountry);
            return;
        }
    }

    setCountries(users: User[]) {
        const allCountries: string[] = users.map((user: User) => user.country);
        const noDuplicatesContries = [...new Set(allCountries)];
        const sortedCountries = noDuplicatesContries.sort((a, b) => a > b ? 1 : -1);

        this.countriesSubject.next(sortedCountries);
    }

    private filterUsersByName(users: User[], searchTerm: string) {
        const filteredByName = users.filter((user: User) => {
            return user.fullName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
        });

        this.filteredByNameSubject.next(filteredByName);
    }

    private filterUsersByCountry(users: User[], selectedCountry: string) {

        if (selectedCountry === 'allCountries') {
            this.filteredByCountry.next(users);
            return;
        }

        const filteredByCountry = users.filter((user: User) => user.country === selectedCountry);

        this.filteredByCountry.next(filteredByCountry);
    }
}