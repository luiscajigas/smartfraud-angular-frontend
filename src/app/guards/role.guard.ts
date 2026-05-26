import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService, UserRole } from '../token-storage.service';

export const roleGuard: CanActivateFn = (route) => {
  const tokenStorage = inject(TokenStorageService);
  const router = inject(Router);

  const roles = (route.data?.['roles'] as UserRole[] | undefined) ?? [];
  const userRole = tokenStorage.getRol();

  if (!userRole) {
    router.navigate(['/login']);
    return false;
  }

  if (roles.length === 0 || roles.includes(userRole)) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
