import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const auth = inject(Auth);


  if (auth.isAuthenticated()) {
    return true; //Usuario autenticado, permitir acceso
  } else {
    router.navigate(['/login']);
    return false;
  }
};
