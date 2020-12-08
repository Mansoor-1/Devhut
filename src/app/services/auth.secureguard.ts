import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable(
    {
        providedIn: 'root'
    }
)

export class AuthSecureGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!localStorage.getItem('user')) {
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/dashboard/projects']);
        return false;
    }
}
