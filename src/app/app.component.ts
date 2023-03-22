import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ModalService } from './UI/modal/modal.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
    imgSub$!: Subscription;
    imagePath!: string;
    shouldOpenModal$!: Observable<boolean>;

    constructor(private modalService: ModalService) { }

    ngOnInit(): void {
        this.imgSub$ = this.modalService.modalSubject.subscribe((imgPath: string) => {
            this.imagePath = imgPath;
        });

        this.shouldOpenModal$ = this.modalService.openModalSubject;
    }

    ngOnDestroy(): void {
        this.imgSub$.unsubscribe();
    }
}
