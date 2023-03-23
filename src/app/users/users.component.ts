import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { combineLatest, debounceTime, distinctUntilChanged, fromEvent, map, Observable, startWith } from 'rxjs';
import { UsersService } from '../data-access/users.service';
import { UsersStore } from '../data-access/users.store';
import { User } from '../user.model';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit, AfterViewInit {
    users$!: Observable<User[]>;
    countries$!: Observable<string[]>;
    isLoading$!: Observable<boolean>;

    @ViewChild('searchInput') input!: ElementRef;
    @ViewChild('countriesSelect') countriesSelect!: ElementRef;

    constructor(
        private usersService: UsersService,
        private usersStore: UsersStore
    ) {
        this.usersService.getUsers().subscribe();
    }

    ngOnInit(): void {
        this.users$ = this.usersStore.allUsers$;

        this.countries$ = this.usersStore.allCountries$;
        this.isLoading$ = this.usersService.isLoading;
    }

    ngAfterViewInit(): void {
        this.users$ = this.controlsStream().pipe(map(this.handleUserFiltering));
    }

    controlsStream() {
        const searchInput$ = fromEvent<KeyboardEvent>(this.input.nativeElement, 'keyup')
            .pipe(
                map((event: KeyboardEvent) => (event.target as HTMLInputElement).value),
                debounceTime(400),
                distinctUntilChanged()
            );

        const selectChange$ = fromEvent(this.countriesSelect.nativeElement, 'change')
            .pipe(
                map((event: any) => (event.target as HTMLSelectElement).value)
            );

        const $initialUsers = this.usersStore.allUsers$;

        return combineLatest([searchInput$.pipe(startWith('')), selectChange$.pipe(startWith('allCountries')), $initialUsers]);
    }

    handleUserFiltering(data: any) {
        const [searchTerm, selectedCountry, allUsers] = data;

        //YES filter by name; NO fiter by country
        if (searchTerm && selectedCountry === 'allCountries') {
            return allUsers.filter((user: User) => user.fullName.toLowerCase().indexOf(searchTerm) !== -1);
        }

        //NO filter by name; YES fiter by country
        if (!searchTerm && selectedCountry !== 'allCountries') {
            return allUsers.filter((user: User) => user.country === selectedCountry);
        }

        //YES filter by name; YES fiter by country
        if (searchTerm && selectedCountry !== 'allCountries') {
            return allUsers.filter((user: User) => user.fullName.toLowerCase().indexOf(searchTerm) !== -1 && user.country === selectedCountry);
        }

        //default: NO filter by name; NO fiter by country
        return allUsers;
    }
}
