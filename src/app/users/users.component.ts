import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map, Observable, tap } from 'rxjs';
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
        this.handleSearch();
    }

    handleSearch() {
        fromEvent<KeyboardEvent>(this.input.nativeElement, 'keyup')
            .pipe(
                map((event: KeyboardEvent) => (event.target as HTMLInputElement).value),
                debounceTime(400),
                distinctUntilChanged(),
                tap(searchTerm => {
                    const selection = this.countriesSelect.nativeElement.value;

                    this.usersStore.handleFilterByName(searchTerm, selection);
                })
            )
            .subscribe(() => {
                this.users$ = this.usersStore.filteredUsersByName$;
            });
    }

    onChange() {
        const selection = this.countriesSelect.nativeElement.value;
        const searchInputValue = this.input.nativeElement.value;

        this.usersStore.handleFilterByCountry(selection, searchInputValue);

        this.users$ = this.usersStore.filteredByCountry$;
    }
}
