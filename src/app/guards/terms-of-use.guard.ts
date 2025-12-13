import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserDataService } from '../services/user/user-data.service';

export const termsOfUseKey = '0-termsofuse';

export const termsOfUseGuard: CanActivateFn = (route, state) => {
    const data = inject(UserDataService).getItems(termsOfUseKey);
    if (!data['terms-accepted']) {
        inject(Router).navigate(['/p', termsOfUseKey], {
            queryParams: { from: state.url },
        });
        return false;
    }
    return true;
};
