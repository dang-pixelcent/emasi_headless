// import React from "react";
// import "./educational.css";

// const educationalData = {
//   header: {
//     background: "#23a2bd",
//     subtitle: "Nuôi dưỡng đa khía cạnh",
//     title: "của MỘT CÁ NHÂN TOÀN DIỆN",
//     description: `Hành trình học tập tại EMASI đưa học sinh tới đích đến là sự xuất sắc không chỉ trong học tập mà còn trong phát triển bản thân, kiến tạo thế hệ học sinh có lý tưởng sống và mong muốn tạo ra ảnh hưởng tích cực cho công đồng.
//     Thông qua chương trình đào tạo song ngữ tích hợp song hành cùng các chương trình Giáo dục Thể chất, Nghệ thuật, STEAM và các hoạt động ngoại khóa, học sinh EMASI được rèn luyện để trở thành những cá nhân sở hữu tư duy phản biện, năng lực giao tiếp hiệu quả và có khả năng sử dụng công nghệ thông tin một cách thành thạo – những năng lực thiết yếu để thích nghi và thành công trong thế giới hiện đại.`,
//   },

//   featured: {
//     image:
//       "/assets/images/demo/program/giao-duc-the-chat.jpg",

//     boxes: [
//       {
//         title: "Giáo dục Thể chất",
//         desc: "Không chỉ rèn luyện thể chất cường tráng, Giáo dục Thể chất tại EMASI còn là hành trình học sinh hiểu chính mình, xây dựng thói quen sống lành mạnh và phát triển sức khỏe tinh thần bền vững. Thể thao giúp các em luôn đạt được trạng thái tốt nhất của cơ thể, tinh thần và cảm xúc đồng thời học cách hợp tác, kiên trì và vượt qua thử thách – những phẩm chất cốt lõi để theo đuổi sự xuất sắc cá nhân.",
//         backgroundColor: "#44b0d7",
//         titleColor: "#ffffff",
//         linkColor: "#003e58",
//         bgImage: "",
//         link: {
//           title: "TÌM HIỂU THÊM",
//           url: "https://emasi.pixelcent.com/giao-duc-the-chat/",
//         },
//       },
//       {
//         title: "Giáo dục Nghệ thuật",
//         desc: "Với vai trò tiên phong trong tích hợp nghệ thuật vào giáo dục, EMASI mang đến môi trường giàu tính thẩm mỹ – nơi học sinh và cộng đồng được tiếp xúc thường xuyên với nghệ thuật, nghệ sĩ và các tác phẩm chân thực. Chương trình giáo dục Nghệ thuật của trường có trọng tâm hình thành năng lực cảm thụ và tư duy sáng tạo nghệ thuật, giúp học sinh bộc lộ bản thân một cách tinh tế và sở hữu khả năng giao tiếp đa chiều.",
//         backgroundColor: "#003e58",
//         titleColor: "#bfd730",
//         linkColor: "#ffffff",
//         link: {
//           title: "TÌM HIỂU THÊM",
//           url: "https://emasi.pixelcent.com/nghe-thuat/",
//         },
//       },
//     ],
//   },

//   programs: [
//     {
//       title: "Công nghệ Thông tin & STEAM",
//       desc: "Chương trình Công nghệ Thông tin & STEAM tại EMASI là nơi học sinh hiện thực hóa ý tưởng bằng công nghệ và kỹ năng kỹ thuật. Từ lập trình, vận hành thiết bị đến in 3D và xử lý vật liệu, học sinh rèn luyện tư duy sáng tạo và năng lực giải quyết vấn đề, khả năng ứng dụng kiến thức vào thực tế – một nền tảng cho tư duy công nghệ và đổi mới.",
//       image:
//         "/assets/images/demo/program/ONG1935-scaled.jpg",
//       backgroundColor: "#bfd730",
//       titleColor: "#003e58",
//       descColor: "#003e58",
//       linkColor: "#003e58",
//       link: {
//         title: "TÌM HIỂU THÊM",
//         url: "https://emasi.pixelcent.com/cong-nghe-thong-tin-va-stem/",
//       },
//     },
//     {
//       title: "Chương trình Thư viện",
//       desc: "Năng lực tiếp nhận, xử lý và vận dụng thông tin là một phần thiết yếu của chương trình, giúp học sinh rèn luyện kỹ năng đọc sách, tra cứu, nghiên cứu, viết tiểu luận, học tập độc lập và rộng hơn nữa là khả năng phản biện, nhận biết một cách thấu đáo về tính xác thực và độ tin cậy của thông tin.",
//       image:
//         "/assets/images/demo/program/ONG1502-scaled.jpg",
//       backgroundColor: "#23a2bd",
//       titleColor: "#ffffff",
//       descColor: "#ffffff",
//       linkColor: "#ffffff",
//       link: {
//         title: "TÌM HIỂU THÊM",
//         url: "https://emasi.pixelcent.com/thu-vien/",
//       },
//     },
//     {
//       title: "Chương trình Ngoại khóa",
//       desc: "EMASI có một chương trình ngoại khóa phong phú và sâu rộng từ các môn thể thao cho đến các hoạt động sáng tạo nhằm củng cố và phát huy thêm chương trình đã học, đồng thời đáp ứng các nhu cầu học hỏi khác của học sinh ngoài kiến thức khoa bảng. Đây cũng là nơi các em học cách đóng góp cho tập thể và cộng đồng.",
//       image:
//         "/assets/images/demo/program/hoc-ngoai-khoa.jpg",
//       backgroundColor: "#bfd730",
//       linkColor: "#ffffff",
//       link: {
//         title: "TÌM HIỂU THÊM",
//         url: "https://emasi.pixelcent.com/chuong-trinh-ngoai-khoa/",
//       },
//     },
//     {
//       title: "Hướng nghiệp",
//       desc: "Chương trình Tư vấn Đại học và Hướng nghiệp giúp học sinh khám phá thế mạnh và định hướng tương lai thông qua hội thảo, trải nghiệm thực tế và tư vấn cá nhân. Với sự hỗ trợ từ đội ngũ cố vấn, các em được trang bị kiến thức về ngành nghề, xu hướng thị trường và lộ trình vào các trường đại học, sẵn sàng cho bước tiếp theo trên hành trình học tập và sự nghiệp.",
//       image:
//         "/assets/images/demo/program/D_R0042_-scaled.jpg",
//       backgroundColor: "#5bcbf5",
//       linkColor: "#ffffff",
//       link: {
//         title: "TÌM HIỂU THÊM",
//         url: "https://emasi.pixelcent.com/diem-den-dai-hoc/",
//       },
//     },
//   ],
// };

// export default function Educational() {
//   const { header, featured, programs } = educationalData;

//   return (
//     <section className="sc-educational">
//   <div
//     className="group-header"
//     style={{ background: educationalData.header.background }}
//     data-aos="zoom-out"
//   >
//     <div className="inner-container">
//       <div className="fw-300 subtitle" data-aos="fade-up">
//         {educationalData.header.subtitle}
//       </div>

//       <div className="fw-bold title" data-aos="fade-up">
//         {educationalData.header.title}
//       </div>

//       <div className="desc" data-aos="fade-up">
//         {educationalData.header.description}
//       </div>
//     </div>
//   </div>

//   {/* Featured */}
//   <div className="container-fluid container-2560">
//     <div className="row col-box-3 g-0">
//       <div className="col-md-4 image" data-aos="fade-right">
//         <img src={educationalData.featured.image} alt="" />
//       </div>

//       {educationalData.featured.boxes.map((box, index) => (
//         <div
//           key={index}
//           className="col-md-4 text"
//           data-aos="fade-up"
//           style={{
//             background: box.backgroundColor,
//             ["--bg-image" as any]: `url(${box.bgImage})`,
//           }}
//         >
//           <div
//             className="box-title"
//             style={{ color: box.titleColor }}
//           >
//             {box.title}
//           </div>

//           <div className="box-desc">
//             {box.desc}
//           </div>

//           <a
//             href={box.link.url}
//             className="box-link"
//             style={{ color: box.linkColor }}
//           >
//             {box.link.title}
//           </a>
//         </div>
//       ))}
//     </div>
//   </div>

//   {/* Programs */}
//   <div className="temp">
//     <div className="container-fluid container-2560">
//       {educationalData.programs.map((program, index) => (
//         <div key={index} className="row col-box-2">
//           <div
//             className={`col-md-6 text text-${index}`}
//             style={{
//               background: program.backgroundColor,
//             }}
//             data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
//           >
//             <div className="mx-15vw-2560">
//               <div
//                 className="box-title"
//                 style={{
//                   color: program.titleColor || undefined,
//                 }}
//                 data-aos="fade-up"
//               >
//                 {program.title}
//               </div>

//               <div
//                 className="box-desc"
//                 style={{
//                   color: program.descColor || undefined,
//                 }}
//                 data-aos="fade-up"
//               >
//                 {program.desc}
//               </div>

//               <a
//                 href={program.link.url}
//                 className="box-link"
//                 style={{
//                   color: program.linkColor,
//                 }}
//                 data-aos="fade-up"
//               >
//                 {program.link.title}
//               </a>
//             </div>
//           </div>

//           <div
//             className="col-sm-6 image"
//             data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
//             data-aos-delay="150"
//           >
//             <img src={program.image} alt={program.title} />
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// </section>
//   );
// }
import React from "react";
import "./educational.css";
import { useStoreContext } from "@/context/StoreContext";

interface EducationalProps {
  data?: {
    groupHeader?: {
      title?: string;
      subTitle?: string;
      desc?: string;
    };
    col3?: {
      image?: { node?: { sourceUrl?: string } };
      box?: Array<{
        title?: string;
        titleColor?: string;
        desc?: string;
        backgroundColor?: string;
        linkColor?: string;
        backgroundImage?: { node?: { sourceUrl?: string } };
        link?: { url?: string; title?: string; target?: string };
      }>;
      listProgrammEduExpect?: Array<{
        title?: string;
        desc?: string;
        descColor?: string;
        backgoundColor?: string; // Lưu ý: Field này từ CMS đang bị gõ sai chính tả (thiếu chữ 'r')
        linkColor?: string;
        image?: { node?: { sourceUrl?: string } };
        link?: { url?: string; title?: string; target?: string };
      }>;
    };
  };
}

export default function Educational({ data }: EducationalProps) {
  const { normalizePath } = useStoreContext();

  if (!data) return null;

  const { groupHeader, col3 } = data;
  const boxes = col3?.box || [];
  const programs = col3?.listProgrammEduExpect || [];

  return (
    <section className="sc-educational">
      {/* HEADER */}
      <div
        className="group-header"
        style={{ background: "#23a2bd" }} // Mặc định giữ màu xanh cũ vì CMS không trả về màu nền
        data-aos="zoom-out"
      >
        <div className="inner-container">
          <div className="fw-300 subtitle" data-aos="fade-up">
            {groupHeader?.subTitle}
          </div>

          <div className="fw-bold title" data-aos="fade-up">
            {groupHeader?.title}
          </div>

          <div 
            className="desc" 
            data-aos="fade-up"
            style={{ whiteSpace: "pre-line" }} // Đảm bảo các ký tự \r\n từ CMS sẽ được xuống dòng thực tế
          >
            {groupHeader?.desc}
          </div>
        </div>
      </div>

      {/* FEATURED (Col3 - Hình ảnh & Các Box) */}
      <div className="container-fluid container-2560">
        <div className="row col-box-3 g-0">
          <div className="col-md-4 image" data-aos="fade-right">
            <img src={col3?.image?.node?.sourceUrl || ""} alt="Featured" />
          </div>

          {boxes.map((box, index) => (
            <div
              key={index}
              className="col-md-4 text"
              data-aos="fade-up"
              style={{
                background: box.backgroundColor || "#44b0d7",
                ["--bg-image" as any]: box.backgroundImage?.node?.sourceUrl 
                  ? `url(${box.backgroundImage.node.sourceUrl})` 
                  : "none",
              }}
            >
              <div
                className="box-title"
                style={{ color: box.titleColor || "#ffffff" }}
              >
                {box.title}
              </div>

              <div className="box-desc">
                {box.desc}
              </div>

              {box.link?.url && (
                <a
                  href={normalizePath(box.link.url)}
                  className="box-link"
                  style={{ color: box.linkColor || "#003e58" }}
                  target={box.link.target || "_self"}
                >
                  {box.link.title || "TÌM HIỂU THÊM"}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* PROGRAMS (List Programs Edu Expect) */}
      <div className="temp">
        <div className="container-fluid container-2560">
          {programs.map((program, index) => (
            <div key={index} className="row col-box-2">
              <div
                className={`col-md-6 text text-${index}`}
                style={{
                  background: program.backgoundColor || "#bfd730", // Lấy đúng trường backgoundColor từ API
                }}
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              >
                <div className="mx-15vw-2560">
                  <div
                    className="box-title"
                    style={{
                      color: program.descColor || undefined, // Dùng tạm descColor (nếu CMS không có titleColor)
                    }}
                    data-aos="fade-up"
                  >
                    {program.title}
                  </div>

                  <div
                    className="box-desc"
                    style={{
                      color: program.descColor || undefined,
                    }}
                    data-aos="fade-up"
                  >
                    {program.desc}
                  </div>

                  {program.link?.url && (
                    <a
                      href={normalizePath(program.link.url)}
                      className="box-link"
                      style={{
                        color: program.linkColor || "#003e58",
                      }}
                      data-aos="fade-up"
                      target={program.link.target || "_self"}
                    >
                      {program.link.title || "TÌM HIỂU THÊM"}
                    </a>
                  )}
                </div>
              </div>

              <div
                className="col-sm-6 image"
                data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
                data-aos-delay="150"
              >
                <img 
                  src={program.image?.node?.sourceUrl || ""} 
                  alt={program.title || "Program"} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}