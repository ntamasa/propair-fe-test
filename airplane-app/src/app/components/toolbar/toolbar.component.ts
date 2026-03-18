import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  imports: [RouterOutlet, MatButtonModule, MatIconModule, MatToolbarModule],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  protected readonly authService = inject(AuthService);

  protected onLogout(): void {
    this.authService.logout();
  }
}
