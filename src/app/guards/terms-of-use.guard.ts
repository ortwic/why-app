import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserDataService } from '../services/user-data.service';

const pageId = '0-termsofuse';

export const termsOfUseGuard: CanActivateFn = (route, state) => {
    const data = inject(UserDataService).getEntry(pageId);
    if (!data['terms-accepted']) {
        inject(Router).navigate(['/p', pageId], {
            queryParams: { from: state.url },
        });
        return false;
    }
    return true;
};
