import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  message: string | null = null;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toastMessage$.subscribe((message) => {
      this.message = message;
    });
  }
}
