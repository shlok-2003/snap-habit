// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { Fragment, useEffect } from "react";
// import Script from "next/script";

// declare global {
//     interface Window {
//         googleTranslateElementInit?: () => void;
//         google: any;
//     }
// }

// export default function Translation() {
//     useEffect(() => {
//         window.googleTranslateElementInit = () => {
//             if (window.google && window.google.translate) {
//                 new window.google.translate.TranslateElement(
//                     {
//                         pageLanguage: "en",
//                         layout: window.google.translate.TranslateElement
//                             .InlineLayout.SIMPLE,
//                     },
//                     "google_translate_element",
//                 );
//             }
//         };
//     }, []);

//     return (
//         <Fragment>
//             <Script
//                 src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
//                 strategy="afterInteractive"
//             />

//             <div id="google_translate_element" className="flex bg-c-black-90" />

//             <style jsx global>{`
//                 .goog-te-gadget-simple {
//                     display: flex !important;
//                     flex-direction: row !important;
//                     gap: 10px !important;
//                 }
//                 .goog-te-gadget-simple > span > a {
//                     display: flex !important;
//                     flex-direction: row !important;
//                 }
//             `}</style>
//         </Fragment>
//     );
// }
