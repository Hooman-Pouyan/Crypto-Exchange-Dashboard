// import {animate, animateChild, group, query as q, state, style, transition, trigger} from '@angular/animations';

// const query = (s: any, a: any, o = {optional: true}) => q(s, a, o);

// export const routerTransition = fade();

// export function fade() {
// 	return trigger('routerTransition', [
// 		transition('* => *', [
// 			query(':enter, :leave', style({position: 'absolute', left: '0', right: '0'})),
// 			query(':enter', style({opacity: '0'})),
// 			group([
// 				query(':leave', [
// 					style({opacity: '0'}),
// 					animate('1.0s ease-in-out', style({opacity: '0'}))
// 				]),
// 				query(':enter', [
// 					animate('1.0s ease-in-out', style({opacity: '1'})),
// 					animateChild()
// 				])
// 			]),
// 		]),
// 	])
// }

// // export function slideToRight() {
// // 	return trigger('routerTransition', [
// // 		state('void', style({position: 'fixed', width: '40%'})),
// // 		state('*', style({position: 'fixed', width: '0%'})),
// // 		transition(':enter', [
// // 			style({transform: 'translateX(-40%)'}),
// // 			animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
// // 		]),
// // 		transition(':leave', [
// // 			style({transform: 'translateX(0%)'}),
// // 			animate('0.5s ease-in-out', style({transform: 'translateX(40%)'}))
// // 		])
// // 	]);
// // }

// // export function slideToLeft() {
// // 	return trigger('routerTransition', [
// // 		state('void', style({position: 'fixed', width: '70%'})),
// // 		state('*', style({position: 'fixed', width: '70%'})),
// // 		transition(':enter', [
// // 			style({transform: 'translateX(-100%)'}),
// // 			animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
// // 		]),
// // 		transition(':leave', [
// // 			style({transform: 'translateX(0%)'}),
// // 			animate('0.5s ease-in-out', style({transform: 'translateX(100%)'}))
// // 		])
// // 	]);
// // }

// // export function slideToBottom() {
// // 	return trigger('routerTransition', [
// // 		state('void', style({position: 'fixed', width: '100%', height: '100%'})),
// // 		state('*', style({position: 'fixed', width: '100%', height: '100%'})),
// // 		transition(':enter', [
// // 			style({transform: 'translateY(-100%)'}),
// // 			animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
// // 		]),
// // 		transition(':leave', [
// // 			style({transform: 'translateY(0%)'}),
// // 			animate('0.5s ease-in-out', style({transform: 'translateY(100%)'}))
// // 		])
// // 	]);
// // }

// // export function slideToTop() {
// // 	return trigger('routerTransition', [
// // 		state('*', style({position: 'fixed', width: '100%', height: '100%'})),
// // 		state('*', style({position: 'relative'})),
// // 		transition(':enter', [
// // 			style({transform: 'translateY(100%)'}),
// // 			animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
// // 		]),
// // 		transition(':leave', [
// // 			style({transform: 'translateY(0%)'}),
// // 			animate('0.5s ease-in-out', style({transform: 'translateY(-100%)'}))
// // 		])
// // 	]);
// // }


// export function simpleFade() {
// 	return trigger('simpleFadeAnimation', [
// 		state('in', style({opacity: 1})),
// 		transition(':enter', [
// 			style({opacity: 0}),
// 			animate(600)
// 		]),
// 		transition(':leave',
// 			animate(600, style({opacity: 0})))
// 	])
// }
