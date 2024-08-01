import React from "react";
//import TTTHero from "../assets/TTTHero.jpg"

const Home = () => {
  return(
    <div className="bg-hero-background bg-center bg-no-repeat bg-cover h-screen w-screen grid grid-cols-5 items-center justify-center">
      <div className="bg-white h-2/5 w-full col-span-2 border-gray-400 border-2 col-start-2 grid grid-rows-2">
        <h6 className="p-8 text-2xl text-green-600">Join The <span className="text-red-600 font-bold">Ultimate</span> Board Game Community!</h6>
        <text className="px-4">Welcome to TableTopTrader.com, the premier destination for buying, selling, and connecting with fellow board game enthusiasts! Whether you're on the hunt for a rare find or looking to part with some games, our community-centric platform is here to enhance your gaming experience.</text>
      </div>
    </div>
  );
};

export default Home;