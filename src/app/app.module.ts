import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserItemComponent } from './users/user-item/user-item.component';
import { LoadingSpinnerComponent } from './UI/loading-spinner/loading-spinner.component';
import { ModalComponent } from './UI/modal/modal.component';

@NgModule({
    declarations: [
        AppComponent,
        UsersComponent,
        LoadingSpinnerComponent,
        ModalComponent,
        UserItemComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        MatIconModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
