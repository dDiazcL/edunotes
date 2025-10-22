import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { Platform } from '@ionic/angular';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const auth = inject(Auth);

  await new Promise(resolve => setTimeout(resolve, 400));

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


}; 
