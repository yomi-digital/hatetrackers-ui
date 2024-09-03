// import { useState } from "react";
// import { useMediaQuery } from "react-responsive";
// import SplashDeskVideo from "../assets/videos/intro_desk.mp4";
// import SplashMobVideo from "../assets/videos/intro_mobile.mp4";
// import { useBreakpoint } from "../hooks/UseBreakpoint";
// interface SplashScreenProps {
//   onVideoEnd: () => void;
//   onFadeEnd: () => void;
// }

// function SplashScreen({ onVideoEnd, onFadeEnd }: SplashScreenProps) {
//   const { isLg } = useBreakpoint("lg");
//   const [isVideoEnded, setIsVideoEnded] = useState(false);
//   const isLandscape = useMediaQuery({ orientation: "landscape" });

//   // useGSAP(
//   //   () => {
//   //     if (isVideoEnded) {
//   //       gsap.to("#splash-screen-container", {
//   //         opacity: 0,
//   //         duration: 0.5,
//   //         ease: "sine.inOut",
//   //         onComplete: () => {
//   //           onFadeEnd();
//   //         },
//   //       });
//   //     }
//   //   },
//   //   { dependencies: [isVideoEnded] }
//   // );

//   function videoEndHandler() {
//     console.log("video ended");
//     setIsVideoEnded(true);
//     onVideoEnd();
//   }

//   return (
//     <div
//       id="splash-screen-container"
//       className="fixed top-0 bottom-0 right-0 left-0 z-20"
//     >
//       <video
//         className="w-full h-full object-cover"
//         autoPlay
//         muted
//         playsInline
//         onEnded={videoEndHandler}
//       >
//         <source
//           src={isLg || isLandscape ? SplashDeskVideo : SplashMobVideo}
//           type="video/mp4"
//         />
//       </video>
//     </div>
//   );
// }

// export default SplashScreen;
