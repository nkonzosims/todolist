import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../shared/model/user.model';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
})
export class UserCard {
  @Input() user!: User;
  @Output() selected = new EventEmitter<User>();

  get initials(): string {
    return this.user.name
      .split(' ')
      .map((name) => name[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  get avatarClass(): string {
    return `avatar-${((this.user.id - 1) % 8) + 1}`;
  }

  get websiteUrl(): string {
    return `https://${this.user.website}`;
  }

  onSelection(): void {
    this.selected.emit(this.user);
  }
}
