import {
    trigger,
    animate,
    transition,
    style,
    query, group
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
    transition('* <=> *', [

        /* order */

        /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%' })

        , { optional: true }),


        /* 2 */ group([  // block executes in parallel

            query(':enter', [

                style({ transform: 'translateX(100%)' }),

                animate('0.3s ease-in-out', style({ transform: 'translateX(0%)' }))

            ], { optional: true }),

            query(':leave', [

                style({ transform: 'translateX(0%)' }),

                animate('0.3s ease-in-out', style({ transform: 'translateX(-100%)' }
                ))], { optional: true }),



        ])

    ])
]);
