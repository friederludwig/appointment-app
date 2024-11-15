import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/system/sidebar/sidebar.component';
import { ToastComponent } from './components/system/toast/toast.component';

@Component({
  standalone: true,
  imports: [RouterModule, SidebarComponent, ToastComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'client';
}
