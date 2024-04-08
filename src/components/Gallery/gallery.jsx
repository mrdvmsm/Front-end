import { Image } from "./image";
import React from "react";

export const Gallery = (props) => {
  const Gallery = [
    {
      largeImage: require("../../Assets/banner2.jpeg"),
      smallImage: require("../../Assets/banner2.jpeg"),
    },
   
    {
      largeImage: require("../../Assets/banner6.jpeg"),
      smallImage: require("../../Assets/banner6.jpeg"),
    },
    {
      largeImage: require("../../Assets/banner_new.png"),
      smallImage: require("../../Assets/banner_new.png"),
    },
  
  ];
  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Gallery</h2>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {Gallery
              ? Gallery.map((d, i) => (
                  <div
                    className="col-sm-6 col-md-4 col-lg-4"
                  >
                    <Image
                      largeImage={d.largeImage}
                      smallImage={d.smallImage}
                    />
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};
