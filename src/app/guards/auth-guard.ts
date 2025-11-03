import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { Platform } from '@ionic/angular';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const auth = inject(Auth);
  const platform = inject(Platform);

  try {

    await platform.ready();

    await new Promise(resolve => setTimeout(resolve, 300));

    const isLoggedIn = await auth.isAuthenticated();
    const url = state.url;

    console.log('Verificando acceso: ',url, '| Usuario autenticado: ', isLoggedIn);

    if (isLoggedIn && (url.includes('/login') && !url.includes('/reset-password'))) {
      await router.navigate(['/tabs/home']);
      return false;
    }

    if (!isLoggedIn && !url.includes('/login') && !url.includes('/reset-password')) {
      console.warn('Usuario no autenticado. Regirigiendo al login...');
      await router.navigate(['/login']);
      return false;
    }

    return true;
    
  } catch (err) {
    console.error('Error en AuthGuard:', err);
    await router.navigate(['/login']);
    return false;
  }
}; 
