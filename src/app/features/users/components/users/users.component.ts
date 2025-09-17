import { Component, OnInit } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { DataService } from '../../../../core/services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Field {
  key: keyof User;
  label: string;
  type: string;
}

@Component({
  selector: 'app-users',
  imports:[CommonModule,FormsModule],
  styleUrls: ['./users.component.css'],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  newUser: Partial<User> = {};
  selectedUser?: User;
  formFields: Field[] = [];

  constructor(private dataService: DataService<User>) {}

  ngOnInit() {
    this.loadUsers();
    this.loadFormFields();
  }

  // دریافت کاربران
  loadUsers(): void {
    this.dataService.getAll<User>('users').subscribe((users) => {
      this.users = users;
    });
  }

  // دریافت فیلدهای فرم از json-server
  loadFormFields(): void {
    this.dataService.getAll<Field>('userFields').subscribe((fields) => {
      this.formFields = fields;
      // مقداردهی اولیه newUser
      fields.forEach((f) => {
        this.newUser[f.key] = '';
      });
    });
  }

  // ایجاد کاربر جدید
  createUser(): void {
    this.newUser.createdAt = new Date();
    this.dataService.create('users', this.newUser).subscribe(() => {
      this.loadUsers();
      this.resetForm();
    });
  }

  // آماده کردن کاربر برای ویرایش
  setForEdit(user: User): void {
    this.selectedUser = { ...user };
  }

  // بروزرسانی کاربر
  updateUser(): void {
    if (!this.selectedUser?.id) return;
    this.dataService
      .update('users', this.selectedUser.id, this.selectedUser)
      .subscribe(() => {
        this.loadUsers();
        this.selectedUser = undefined;
      });
  }

  // حذف کاربر
  deleteUser(id: string | undefined): void {
    if (!id) return;
    this.dataService.delete('users', id).subscribe(() => {
      this.users = this.users.filter((u) => u.id !== id);
    });
  }

  // ریست کردن فرم
  resetForm(): void {
    this.formFields.forEach((f) => {
      this.newUser[f.key] = '';
    });
  }
}
