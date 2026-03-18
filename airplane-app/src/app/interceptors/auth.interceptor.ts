import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService, TOKEN_KEY, USER_KEY } from '../services/auth.service';
import { LoginResponse } from '../models/auth.model';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);

  const token = authService.token();
  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authReq).pipe(
    tap({
      next: (event) => {
        if (
          event instanceof HttpResponse &&
          event.body &&
          typeof event.body === 'object' &&
          'token' in event.body
        ) {
          const body = event.body as LoginResponse;
          if (body.token && body.user) {
            localStorage.setItem(TOKEN_KEY, body.token);
            localStorage.setItem(USER_KEY, JSON.stringify(body.user));
          }
        }
      },
    }),
  );
};
