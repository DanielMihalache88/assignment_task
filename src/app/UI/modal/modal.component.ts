import { Component, Input } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})

export class ModalComponent {
    @Input() imgPath!: string;

    constructor(private modalService: ModalService) { }

    onClose() {
        this.modalService.closeModal();
    }
}
