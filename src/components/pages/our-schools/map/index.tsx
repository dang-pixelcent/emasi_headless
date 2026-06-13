import React from "react";
import "./map.css";

const mapData = {
  image:
    "/assets/images/banner/2-1.jpg",
};

export default function Map() {
  return (
    <section className="sc-map p-0">
      <div className="container-fluid pe-0 ps-0">
        <div className="maps-sec d-flex flex-wrap align-items-stretch">
          <div
            className="col-map-left"
            data-aos="fade-right"
          >
            {/* Placeholder map */}
            <div id="map" className="map-placeholder">
              Google Map chưa dùng được
            </div>
          </div>

          <div
            className="col-image-right-map"
            data-aos="fade-left"
          >
            <img src={mapData.image} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}