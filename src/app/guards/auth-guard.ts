import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(Auth);

  const isLoggedIn = auth.isAuthenticated();
  const url = state.url;

  // ✅ Permitir acceso libre a rutas públicas
  if (url.includes('/login') || url.includes('/reset-password') || url.includes('/not-found')) {
    return true;
  }

  // 🔒 Bloquear acceso a rutas privadas si no está logueado
  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  // 🚫 Evitar que un usuario logueado vaya al login o reset
  if (isLoggedIn && (url.includes('/login') || url.includes('/reset-password'))) {
    router.navigate(['/tabs/home']);
    return false;
  }

  // ✅ Si todo está bien, permitir navegación
  return true;
};
