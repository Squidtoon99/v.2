import { NextPage } from "next";
import { useEffect } from "react";

const Hero: NextPage = () => {

    return <>
        <div className="z-1 relative flex flex-col min-h-screen">
            <h1 className="lg:text-xl text-orange-400/95 font-semibold animate-fade-up-in animate-gradient" style={{ animationDelay: "400ms", animationFillMode: "both", fontFamily: "var(--font-mono)", fontWeight: 400 }}>
                Hi, my name is
            </h1>
            <h1 className="text-transparent py-4 z-2 text-5xl md:text-8xl lg:text-8xl font-semibold animate-fade-up-in--special w-fit shadow-md"
                style={{ background: "linear-gradient(135deg, rgb(14, 115, 204) 1.93%, rgb(98, 75, 187) 14.86%, rgb(255, 69, 93) 48.09%, rgb(243, 88, 21) 77.82%, rgb(242, 182, 0) 97.3%)", WebkitTextFillColor: "transparent", backgroundClip: "text", WebkitBackgroundClip: "text", animationDelay: "475ms", animationFillMode: "backwards" }}
            >
                Arjun Nayak
            </h1>
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-gray-300/60 font-semibold my-2 animate-fade-up-in" style={{ animationDelay: "575ms", animationFillMode: "both" }}>
                I build chat{' '}bots
            </h1>
        </div>
    </>;
};

export default Hero;