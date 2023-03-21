import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';
import { UsersStore } from './users.store';

interface responseType {
    info: any;
    results: Array<any>;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
    isLoading = new Subject<boolean>();
    usersEndpoint = 'https://randomuser.me/api/?results=250';

    constructor(
        private http: HttpClient,
        private usersStore: UsersStore
    ) {
        this.getUsers().subscribe();
    }

    public getUsers() {
        return this.http.get<responseType>(this.usersEndpoint)
            .pipe(
                map(data => {
                    this.usersStore.setUsers(data.results);
                    this.usersStore.getAllCoutries(data.results);
                    return data.results;
                }));
    }
}
