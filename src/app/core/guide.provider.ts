import { APP_INITIALIZER, Provider } from "@angular/core"
import { GuideService } from "../services/content/guide.service"

export const provideGuide = (): Provider => {
    return {
        provide: APP_INITIALIZER,
        useFactory: (guide: GuideService) => () => guide.init(location.hostname, navigator.language),
        deps: [GuideService],
        multi: true
    }
};