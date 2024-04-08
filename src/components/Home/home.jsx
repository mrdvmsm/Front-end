import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Gallery } from "../Gallery/gallery";
export const Home = () => {
  const images = [
    {
      original: require("../../Assets/banner_new.png"),

    },
    {
      original: require("../../Assets/banner3.jpeg"),
    },
    {
      original: require("../../Assets/banner4.jpeg"),
    },
    {
      original: require("../../Assets/banner5.jpeg"),
    },
    {
      original: require("../../Assets/banner1.jpeg"),
    },
  ];


  return (
    <div className="home">
      <div className="HeaderScroll">
        <header id="header">
          <div className="intro">
            <div className="overlay">
              <div>
                <div >
                  <div className="col-md-8 col-md-offset-2 intro-text">
                    <div
                      style={{
                        padding: "0 20px",
                      }}
                    >
                      <ImageGallery
                        items={images}
                        showThumbnails={false}
                        showPlayButton={false}
                        showFullscreenButton={false}
                        autoPlay={true}
                        onClick={e => null}
                        slideDuration={10}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
      <div className="gallery">
        <Gallery />
      </div>
    </div>
  );
};
