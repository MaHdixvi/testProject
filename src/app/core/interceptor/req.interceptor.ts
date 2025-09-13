import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const reqInterceptor: HttpInterceptorFn = (req,next) => {
  // بررسی آیا آدرس با http یا https شروع شده است یا خیر
  if (
    !req.url.startsWith('http') &&
    !req.url.startsWith('https')
    ) {
    // اگر آدرس نسبی است، آدرس پایه را اضافه می‌کنیم
    const baseUrl = 'http://localhost:3000';
    // ایجاد یک کلون از درخواست با آدرس جدید
    const clonedReq = req.clone({
      url: `${baseUrl}${req.url.startsWith('/') ? req.url : '/' + req.url}`,
    });
    return next(clonedReq);
  }

  // اگر آدرس قبلاً کامل بوده، درخواست بدون تغییر ارسال می‌شود
  console.log(`آدرس کامل است: ${req.url}`);
  return next(req);
};
