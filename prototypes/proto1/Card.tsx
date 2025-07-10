import React from "react";
import { Mail, Phone, Instagram, Gem } from "lucide-react";

const BusinessCard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 h-56 bg-black rounded-lg shadow-lg flex flex-col justify-between p-6 text-white font-sans">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold text-yellow-400">Lucky Jewels</h1>
          <Gem className="w-8 h-8 text-yellow-400" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-2 text-yellow-400" />
            <a
              href="mailto:luckyjewlsltd@gmail.com"
              className="hover:text-yellow-300"
            >
              luckyjewlsltd@gmail.com
            </a>
          </div>
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-2 text-yellow-400" />
            <span>0044 7311 025575</span>
          </div>
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-2 text-yellow-400" />
            <span>0044 7861 695079</span>
          </div>
          <div className="flex items-center">
            <Instagram className="w-4 h-4 mr-2 text-yellow-400" />
            <a
              href="https://www.instagram.com/luckyjewels_official"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-300"
            >
              luckyjewels_official
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
