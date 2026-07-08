// import React from "react";
// import "./map.css";

// const mapData = {
//   image:
//     "/assets/images/banner/2-1.jpg",
// };

// export default function Map() {
//   return (
//     <section className="sc-map p-0">
//       <div className="container-fluid pe-0 ps-0">
//         <div className="maps-sec d-flex flex-wrap align-items-stretch">
//           <div
//             className="col-map-left"
//             data-aos="fade-right"
//           >
//             {/* Placeholder map */}
//             <div id="map" className="map-placeholder">
//               Google Map chưa dùng được
//             </div>
//           </div>

//           <div
//             className="col-image-right-map"
//             data-aos="fade-left"
//           >
//             <img src={mapData.image} alt="" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import React from "react";
import "./map.css";

interface MapProps {
  data?: {
    image?: {
      node?: {
        sourceUrl?: string;
      };
    };
    iframe?: string; // Dữ liệu địa chỉ HTML từ Wysiwyg
  };
}

// export default function Map({ data }: MapProps) {
//   if (!data) return null;

//   const mapImg = data.image?.node?.sourceUrl;
//   const mapAddress = data.iframe;

//   return (
//     <section className="sc-map p-0">
//       <div className="container-fluid pe-0 ps-0">
//         <div className="maps-sec d-flex flex-wrap align-items-stretch">
          
//           {/* PHẦN BẢN ĐỒ / ĐỊA CHỈ */}
//           <div className="col-map-left" data-aos="fade-right">
//             {mapAddress ? (
//               <div 
//                 className="map-address-container" 
//                 dangerouslySetInnerHTML={{ __html: mapAddress }} 
//               />
//             ) : (
//               <div id="map" className="map-placeholder">
//                 Thông tin bản đồ đang cập nhật
//               </div>
//             )}
//           </div>

//           {/* PHẦN ẢNH */}
//           <div className="col-image-right-map" data-aos="fade-left">
//             {mapImg && (
//               <img src={mapImg} alt="Map Location" />
//             )}
//           </div>
          
//         </div>
//       </div>
//     </section>
//   );
// }
export default function Map({ data }: MapProps) {
  if (!data) return null;
  const mapImg = data.image?.node?.sourceUrl;
  const mapAddress = data.iframe;

  return (
    // Bỏ class container, để section này full-width
    <section className="sc-map p-0 w-100">
      <div className="maps-sec d-flex flex-wrap w-100">
          {/* PHẦN ĐỊA CHỈ */}
          <div className="col-map-left">
            {mapAddress && (
              <div className="map-address-container" dangerouslySetInnerHTML={{ __html: mapAddress }} />
            )}
          </div>

          {/* PHẦN ẢNH */}
          <div className="col-image-right-map">
            {mapImg && <img src={mapImg} alt="Map" className="w-100 h-100" style={{objectFit: 'cover'}} />}
          </div>
      </div>
    </section>
  );
}