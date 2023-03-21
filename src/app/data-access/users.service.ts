import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';
import { UsersStore } from './users.store';
import { User } from '../user.model';


//not sure this is the correct way to build this inteface...
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
    ) { }

    public getUsers() {
        return this.http.get<responseType>(this.usersEndpoint)
            .pipe(
                map(data => {
                    const usersData: User[] = this.getRelevantData(data.results);

                    this.usersStore.setUsers(usersData);
                    this.usersStore.setCountries(usersData);

                    return usersData;
                }));
    }

    /*
    I choose to extract only the usesfull info about the user
    to be able to declare a User interface, to be used later in usersStore.
    If I don`t do this, in userStore, in every function that recieves an user
    or an array of users I end up declaring type of user: any.
    */

    private getRelevantData(users: any) {
        return users.map((user: any) => {
            return {
                fullName: `${user.name.first} ${user.name.last}`,
                email: user.email,
                country: user.location.country,
                thumbnail: user.picture.thumbnail,
                largeImage: user.picture.large
            }
        })
    }
}
