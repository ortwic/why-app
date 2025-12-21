import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserDataService } from '../services/user/user-data.service';

export const initialPage = '0-termsofuse';
export const nameProp = 'display-name';
const acceptedProp = 'terms-accepted';

export const termsOfUseGuard: CanActivateFn = (route, state) => {
    const data = inject(UserDataService).getItems(initialPage);
    if (!data[acceptedProp]) {
        inject(Router).navigate(['/p', initialPage], {
            queryParams: { from: state.url },
        });
        return false;
    }
    return true;
};
