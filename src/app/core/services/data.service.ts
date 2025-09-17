import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * سرویس عمومی برای عملیات CRUD با json-server
 * دارای متدهای استاندارد برای مدیریت داده‌های منابع مختلف
 */
@Injectable({
  providedIn: 'root'
})
export class DataService<T> {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /**
   * دریافت تمام رکوردهای یک منبع
   * @param resource نام منبع (مثلا: 'users')
   */
  getAll<T>(resource: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${resource}`);
  }

  /**
   * دریافت یک رکورد خاص با شناسه
   * @param resource نام منبع
   * @param id شناسه یکتای رکورد
   */
  getOne<T>(resource: string, id: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${resource}/${id}`);
  }

  /**
   * ایجاد رکورد جدید در منبع
   * @param resource نام منبع
   * @param data داده‌های مورد نظر برای ایجاد
   */
  create<T>(resource: string, data: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${resource}`, data);
  }

  /**
   * به روزرسانی کامل یک رکورد
   * @param resource نام منبع
   * @param id شناسه رکورد
   * @param data داده‌های جدید برای جایگزینی
   */
  update<T>(resource: string, id: string|undefined, data: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${resource}/${id}`, data);
  }

  /**
   * حذف یک رکورد از منبع
   * @param resource نام منبع
   * @param id شناسه رکورد مورد نظر برای حذف
   */
  delete(resource: string, id: string|undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${resource}/${id}`);
  }
}
