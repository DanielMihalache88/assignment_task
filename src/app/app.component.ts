import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'assignment_task';
    imgPath!: string;
    openModal = false;

    test($event: string) {
        console.log($event);
        this.openModal = true;
    }
}
