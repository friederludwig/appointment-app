import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastMessage = new BehaviorSubject<string | null>(null);
  toastMessage$ = this.toastMessage.asObservable();

  showToast(message: string, duration = 4000): void {
    this.toastMessage.next(message);

    setTimeout(() => {
      this.toastMessage.next(null);
    }, duration);
  }
}
