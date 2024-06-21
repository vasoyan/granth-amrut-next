// hooks/useColorMode.ts
// import { useEffect, useState } from "react";
// import Cookies from "js-cookie";

// const useColorMode = () => {
//   const [colorMode, setColorMode] = useState(() => {
//     return Cookies.get("color-theme") || "light";
//   });

//   useEffect(() => {
//     const className = "dark";
//     const bodyClass = window.document.body.classList;

//     if (colorMode === "dark") {
//       bodyClass.add(className);
//     } else {
//       bodyClass.remove(className);
//     }

//     Cookies.set("color-theme", colorMode, { expires: 365 });
//   }, [colorMode]);

//   return [colorMode, setColorMode] as const;
// };

// export default useColorMode;



import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    colorMode === "dark"
      ? bodyClass.add(className)
      : bodyClass.remove(className);
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
