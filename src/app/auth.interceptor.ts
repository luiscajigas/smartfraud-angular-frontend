import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const tokenStorage = inject(TokenStorageService);
  const router = inject(Router);

  const isAuthEndpoint =
    req.url.includes('/auth/login') || req.url.includes('/auth/register') || req.url.includes('/auth/refresh');

  const token = tokenStorage.getToken();
  const authReq =
    token && !isAuthEndpoint
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })
      : req;

  return next(authReq).pipe(
    catchError((err: unknown) => {
      if (!(err instanceof HttpErrorResponse)) {
        return throwError(() => err);
      }

      if (err.status !== 401 || isAuthEndpoint) {
        return throwError(() => err);
      }

      const refreshToken = tokenStorage.getRefreshToken();
      if (!refreshToken) {
        tokenStorage.clear();
        router.navigate(['/login']);
        return throwError(() => err);
      }

      if (!isRefreshing) {
        isRefreshing = true;
        refreshTokenSubject.next(null);

        return authService.refresh(refreshToken).pipe(
          switchMap((response) => {
            tokenStorage.setSession({
              token: response.token,
              refreshToken: response.refreshToken,
              usuario: response.usuario,
              rol: response.rol
            });
            isRefreshing = false;
            refreshTokenSubject.next(response.token);

            return next(
              req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.token}`
                }
              })
            );
          }),
          catchError((refreshErr) => {
            isRefreshing = false;
            tokenStorage.clear();
            router.navigate(['/login']);
            return throwError(() => refreshErr);
          })
        );
      }

      return refreshTokenSubject.pipe(
        filter((t): t is string => t !== null),
        take(1),
        switchMap((newToken) =>
          next(
            req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            })
          )
        )
      );
    })
  );
};
