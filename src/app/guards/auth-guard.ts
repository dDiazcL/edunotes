import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const auth = inject(Auth);

  try {
    const isLoggedIn = await auth.isAuthenticated();
    const url = state.url;

    if(isLoggedIn && (url.includes('/login') || url.includes('/reset-password'))) {
      await router.navigate(['/tabs/home']);
      return false;
    }

    if(!isLoggedIn && !url.includes('/login') && !url.includes('/reset-password')) {
      await router.navigate(['/login']);
      return false;
    }

    return true;

  } catch (error) {
    console.error('Error en AuthGuard:', error);
    await router.navigate(['/login']);
    return false;
  }
}; 
