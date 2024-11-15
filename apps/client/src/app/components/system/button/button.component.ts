import { booleanAttribute, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label = 'Button';
  @Input() type = 'button';
  @Input() onClick?: () => void;
  @Input() routerLink?: string;
  @Input({ transform: booleanAttribute }) disabled = false;

  constructor(private router: Router) {}

  handleClick() {
    if (this.disabled) return;

    if (this.routerLink) {
      this.router.navigate([this.routerLink]);
    } else if (this.onClick) {
      this.onClick();
    }
  }
}
