// src/pages/Home.js
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { isUnique, createProfile } from "../api/connection";
import HomeQuestion from "./HomeQuestion";

const Home = () => {
  const [isUserReady, setIsUserReady] = useState(false);

  useEffect(() => {
    let userName = Cookies.get("user_name");
    if (!userName) {
      userName = window.prompt("Enter a unique User ID to continue:");
      if (userName) {
        isUnique(userName).then(async (isAvailable) => {
          if (isAvailable) {
            await createProfile(userName);
            // Set cookie globally
            Cookies.set("user_name", userName, { expires: 30, path: "/" });
            setIsUserReady(true);
          } else {
            alert("Username is already taken. Try another one.");
            window.location.reload();
          }
        });
      } else {
        alert("You need to enter a User ID to play!");
        window.location.reload();
      }
    } else {
      setIsUserReady(true);
    }
  }, []);

  return <>{isUserReady ? <HomeQuestion /> : <p>Loading...</p>}</>;
};

export default Home;
