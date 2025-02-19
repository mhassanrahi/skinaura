"use strict";

import * as React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  const [timeLeft, setTimeLeft] = React.useState({
    hours: 24,
    minutes: 0,
    seconds: 0
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        if (totalSeconds <= 0) {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
        return {
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-gray-50">
      {/* Flash Sale Banner */}
      <div className="bg-primary text-white text-center py-2 text-sm">
        <p>Flash Sale! Up to 50% off on selected items</p>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Your Journey to
              <br />
              <span className="text-primary">Healthy Skin</span>
            </h1>
            <p className="text-gray-600 mb-6 text-lg">
              Discover dermatologically approved skincare products tailored to your needs.
            </p>

            {/* Countdown Timer */}
            <div className="bg-white p-4 rounded-lg shadow-md inline-block mb-6">
              <p className="text-sm text-gray-600 mb-2">Flash Sale Ends In:</p>
              <div className="flex space-x-4">
                <div className="text-center">
                  <span className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <p className="text-xs text-gray-500">Hours</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <p className="text-xs text-gray-500">Minutes</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <p className="text-xs text-gray-500">Seconds</p>
                </div>
              </div>
            </div>

            <div className="space-x-4">
              <Button size="lg">Shop Now</Button>
              <Link href="/quiz"><Button variant="outline" size="lg">Take Skin Quiz</Button></Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gray-100 rounded-lg"></div>
            {/* Promotional Badge */}
            <div className="absolute -top-4 -right-4 bg-primary text-white p-4 rounded-full transform rotate-12">
              <p className="text-sm font-bold">Save 50%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;