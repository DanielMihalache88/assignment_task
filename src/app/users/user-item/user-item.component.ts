import { Component, Input } from '@angular/core';
import { ModalService } from 'src/app/UI/modal/modal.service';

@Component({
    selector: 'app-user-item',
    templateUrl: './user-item.component.html',
    styleUrls: ['./user-item.component.css']
})

export class UserItemComponent {
    @Input() userItem: any;

    constructor(private modalService: ModalService) { }

    onClick(userImagePath: string) {
        this.modalService.setModalImage(userImagePath);
        this.modalService.openModal();
    }
}
