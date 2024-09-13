// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.production.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	// firebase: {
	// 	apiKey: "AIzaSyC-frj9QW45OaQSeQ8sfngkC-RhJDJHw3w",
	// 	authDomain: "megaex-exchange-push.firebaseapp.com",
	// 	projectId: "megaex-exchange-push",
	// 	storageBucket: "megaex-exchange-push.appspot.com",
	// 	messagingSenderId: "113649593218",
	// 	appId: "1:113649593218:web:c7e8f95046f5cc20eabd9b",
	// 	measurementId: "G-6LCW3JZC3H"
	// },
	production: false,
  baseUrl: "https://megaexacc.ir",
	fileUrl: "https://megaexacc.ir/api//file/download/get?id=",
	cdnUrl: "https://pex-develop-storage.s3.ir-thr-at1.arvanstorage.com/",
	socketUrl: "wss://ws.megaexacc.ir"
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
