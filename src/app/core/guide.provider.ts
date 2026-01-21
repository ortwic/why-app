import { APP_INITIALIZER, Provider } from "@angular/core"
import { GuideService } from "../services/content/guide.service"

export const provideGuide = (): Provider => {
    return {
        provide: APP_INITIALIZER,
        useFactory: (guide: GuideService) => () => guide.init(location.hostname),
        deps: [GuideService],
        multi: true
    }
};