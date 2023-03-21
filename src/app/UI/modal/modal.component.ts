import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent {
    @Output() modalClosed = new EventEmitter<void>();

    onClose() {
        this.modalClosed.emit();
    }
}
