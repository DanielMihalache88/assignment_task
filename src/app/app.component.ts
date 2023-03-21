import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from './UI/modal/modal.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    title = 'assignment_task';
    imagePath!: string;
    shouldOpenModal$!: Observable<boolean>;

    constructor(private modalService: ModalService) { }

    ngOnInit(): void {
        this.modalService.modalSubject.subscribe(data => {
            this.imagePath = data;
        });

        this.shouldOpenModal$ = this.modalService.openModalSubject;
    }
}
