import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class ModalService {
    modalSubject = new Subject<string>();
    openModalSubject = new Subject<boolean>();

    public setModalImage(imgPath: string) {
        this.modalSubject.next(imgPath);
    }

    public openModal() {
        this.openModalSubject.next(true);
    }

    public closeModal() {
        this.openModalSubject.next(false);
    }
}