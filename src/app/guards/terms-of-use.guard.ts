import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserDataService } from '../services/user/user-data.service';

export const termsOfUseId = '0-termsofuse';

export const termsOfUseGuard: CanActivateFn = (route, state) => {
    const data = inject(UserDataService).getItems(termsOfUseId);
    if (!data['terms-accepted']) {
        inject(Router).navigate(['/p', termsOfUseId], {
            queryParams: { from: state.url },
        });
        return false;
    }
    return true;
};
