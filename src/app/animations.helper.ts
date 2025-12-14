import { trigger, state, style, transition, animate } from '@angular/animations';

export const expandTrigger = (name: string) => {
    return trigger(name, [
        state('collapsed', style({
          height: '0',
          overflow: 'hidden',
          visibility: 'hidden'
        })),
        state('expanded', style({
          height: '*',
          visibility: 'visible'
        })),
        transition('collapsed <=> expanded', animate('225ms ease-in-out')),
    ]);
};