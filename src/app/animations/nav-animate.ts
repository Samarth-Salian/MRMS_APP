import { AnimationController, Animation } from '@ionic/angular'

export const enterAnimation = (baseEl: HTMLElement, opts?: any): Animation => {
    const DURATION = 200;

    const animationCtrl = new AnimationController();

    if (opts.direction === 'forward') {
        return animationCtrl.create()
            .addElement(opts.enteringEL)
            .duration(DURATION)
            .easing('ease-in-out')
            .afterStyles({ transform: 'translateX(-100%)' })
            .fromTo('opacity', 0, 1);
    } else {
        const rootAnimation = animationCtrl.create()
            .addElement(opts.enteringEL)
            .duration(DURATION)
            .easing('ease-in-out')
            .afterStyles({ transform: 'translateX(0%)' })
            .fromTo('opacity', 0, 1);

        const leavingAnimation = animationCtrl.create()
            .addElement(opts.leavingEl)
            .duration(DURATION)
            .easing('ease-in-out')
            .afterStyles({ transform: 'translateX(0%)' })
            .fromTo('opacity', 1, 0);

        return animationCtrl.create().addAnimation([rootAnimation, leavingAnimation]);

    }


}