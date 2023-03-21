import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UsersStore {
    private subject = new BehaviorSubject<any[]>([]);
    private filteredSubject = new BehaviorSubject<any[]>([]);
    private countriesSubject = new BehaviorSubject<string[]>([]);
    private filteredByCountry = new BehaviorSubject<any[]>([]);

    users$: Observable<any[]> = this.subject.asObservable();
    filteredUsers$: Observable<any[]> = this.filteredSubject.asObservable();
    allCountries$: Observable<string[]> = this.countriesSubject.asObservable();
    filteredByCountry$: Observable<any[]> = this.filteredByCountry.asObservable();

    setUsers(users: any) {
        this.subject.next(users);
    }

    handleFilterByName(searchTerm: string, countrySelection: string) {
        const filteredByCountry = this.filteredByCountry.getValue();

        if (filteredByCountry.length || countrySelection.length) {
            this.filterUsersByName(filteredByCountry, searchTerm);
            return;
        }

        const allUsers = this.subject.getValue();
        this.filterUsersByName(allUsers, searchTerm);
    }

    handleFilterByCountry(selectedCountry: string, searchInputValue: string) {
        const filteredByNameResults = this.filteredSubject.getValue();

        if (!searchInputValue.length) {
            const allUsers = this.subject.getValue();
            this.filterUsersByCountry(allUsers, selectedCountry);
            return;
        }

        if (filteredByNameResults.length) {
            this.filterUsersByCountry(filteredByNameResults, selectedCountry);
            return;
        }
    }

    getAllCoutries(usersData: any) {
        const allCountries: string[] = usersData.map((user: any) => user.location.country);
        const noDuplicatesContries = [...new Set(allCountries)];
        const sortedCountries = noDuplicatesContries.sort((a, b) => a > b ? 1 : -1);

        this.countriesSubject.next(sortedCountries);
    }

    private filterUsersByName(users: any, searchTerm: string) {
        const filteredByName = users.filter((user: any) => {
            const lowercasefullName = `${user.name.first.toLowerCase()} ${user.name.last.toLowerCase()}`;

            return lowercasefullName.indexOf(searchTerm.toLowerCase()) !== -1;
        });

        this.filteredSubject.next(filteredByName);
    }

    private filterUsersByCountry(users: any, selectedCountry: string) {
        const filteredByCountry = users.filter((user: any) => user.location.country === selectedCountry);

        this.filteredByCountry.next(filteredByCountry);
    }
}