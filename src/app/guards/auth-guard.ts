import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const auth = inject(Auth);

  const isLoggedIn = await auth.isAuthenticated();
  const url = state.url;

  //Usuario ya logado yendo al login o al reset es llevado al home
  if (isLoggedIn && (url.includes('/login') || url.includes('/reset-password'))) {
    await router.navigate(['/tabs/home']);
    return false;
  }
  //Usuario que no esta logeado e intenta entrar a pags protegidas
  if (!isLoggedIn && !url.includes('/login') && !url.includes('/reset-password')) {
    await router.navigate(['/login']);
    return false;
  }

  return true;
};
