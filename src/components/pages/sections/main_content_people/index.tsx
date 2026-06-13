import React from "react";
import { useState, useEffect } from "react";
import './main_content_people.css';

//đội ngũ sư phạm
export const pageData = {
  breadcrumb: {
    home: "Trang chủ",
    title: "Đội ngũ Sư phạm",
    slug: "/doi-ngu-su-pham/",
  },

  heading: {
    prefix: "Đội ngũ",
    highlight: "Sư phạm",
  },

  description:
    "Để không chỉ mang đến một môi trường học tập song ngữ vượt trội mà còn ươm dưỡng thế hệ học sinh ưu tú, đội ngũ sư phạm của nhà trường được tâm huyết tinh chọn, bao gồm Đội ngũ giáo viên Tiếng Anh bản ngữ và Đội ngũ giáo viên Việt Nam. Các thầy cô cùng san sẻ một sứ mệnh khơi dậy đam mê học hỏi, phát triển tư duy và kỹ năng toàn diện cho học sinh.",

  campuses: [
    {
      id: "tab-1",
      name: "EMASI VẠN PHÚC",
      active: true,
      icon: "/assets/images/demo/icon-marker-large.png",
    },
    {
      id: "tab-2",
      name: "EMASI NAM LONG",
      active: false,
      icon: "/assets/images/demo/icon-marker-large.png",
    },
  ],
};

const schools = [
  {
    id: "van-phuc",
    name: "EMASI VẠN PHÚC",

    boardOfDirectors: [
      {
        id: 1,
        name: "Tiến sĩ Huỳnh Công Minh",
        position: "Chủ Tịch Hội Đồng Sáng Lập / Tổng Hiệu Trưởng",
        image: "/assets/images/demo/sections/main-content-people/ONG0741-768x1024.jpg",
        email: "huynhcongminh@emasi.edu.vn",
        infor: [],
        content: [
          "Tiến sĩ Giáo dục học Huỳnh Công Minh, sinh năm 1948, là nhà giáo dục tâm huyết, thiết tha với công cuộc cải cách giáo dục nước nhà, luôn mong muốn đem lại cho học sinh Việt Nam một nền giáo dục tiên tiến.",
          "Hơn 45 năm hoạt động và nghiên cứu giáo dục, Tiến sĩ đã trải qua nhiều cương vị công tác và có nhiều cống hiến giá trị cho ngành giáo dục nước nhà. Xuất thân là Giáo sư Trung học Đệ nhị cấp trước năm 1975 dạy Toán học và Vật lý tại Tuy Phong, Bình Thuận; là giáo viên dạy giỏi rồi làm Phó Hiệu trưởng, Hiệu trưởng các trường Trung học Bùi Thị Xuân, Củ Chi, An Lạc tại thành phố Hồ Chí Minh; là Trưởng phòng Giáo dục quận 10 trong các năm 1987 – 1995; là Trưởng phòng Trung học, Phó Giám đốc và Giám đốc Sở Giáo dục và Đào tạo từ năm 1995 đến 2011; là Phó Chủ tịch Hội tâm lý Giáo dục Việt Nam, cán bộ giảng dạy cao học giáo dục Trường Đại học Khoa học Xã hội và Nhân văn, cố vấn các chương trình đổi mới giáo dục đến nay.",
          "Với quá trình đào tạo chính quy và trải nghiệm phong phú, đa dạng qua các thời kỳ cùng điều kiện nghiên cứu giáo dục của trên 15 nước có nền giáo dục tiên tiến của thế giới, Tiến sĩ có được năng lực và kinh nghiệm giáo dục thuyết phục, có uy tín tốt trong ngành và trong xã hội. Có thể kể đến nhiều thành tựu đáng nhớ của Tiến sĩ trong suốt thời gian công tác trong ngành Giáo dục như: Giáo dục Quận 10 xuất sắc nhất thành phố nhiều năm liền; Giáo dục thành phố Hồ Chí Minh xếp hạng nhất nước nhiều năm liền; những mô hình nhà trường đổi mới, tiên tiến của thành phố Hồ Chí Minh phù hợp với trào lưu đổi mới hiện nay và đang được các tỉnh thành bạn học tập nhân rộng; những đơn vị giáo dục đào tạo học sinh theo phương pháp giảng dạy tiến bộ của Tiến sĩ không những thi đậu mà còn trở thành những người trưởng thành, năng động, sáng tạo và tự tin trong cuộc sống."
        ],
      },
      {
        id: 2,
        name: "ThS Kenneth Haggarty",
        position: "Giám đốc Điều Hành - EMASI Vạn Phúc",
        image: "/assets/images/demo/sections/main-content-people/Mr-Ken-853x1024.png",
        email: "kenneth@emasi.edu.vn",
        infor: [],
         content: [
          "Thầy Kenneth Haggarty là một nhà lãnh đạo giáo dục có uy tín cao và kinh nghiệm rộng rãi trong lĩnh vực giáo dục Anh quốc, giáo dục quốc tế và công tác kiểm định quốc tế của Hội Đồng Các Trường Quốc tế – CIS. Với sự nghiệp trải dài khắp Đông Nam Á và Trung Đông và phần lớn tại các trường Quốc tế Anh, Thầy đặc biệt tin tưởng vào giá trị của giáo dục song ngữ và có năng lực quản lý cũng như truyền cảm hứng cho một cộng đồng trường đa bản sắc. Tâm huyết của thầy Haggarty đối với sự thành công của học sinh không chỉ được gói gọn ở lĩnh vực học thuật. Thầy đặt mục tiêu chú trọng sự phát triển về tâm lý và xã hội của học sinh, song song với đó là quản trị đội ngũ lãnh đạo để đảm bảo một môi trường học tập năng động. Bề dày kinh nghiệm đối với công tác kiểm định của CIS cũng là điểm nổi bật trong hành trang công tác của Thầy. Trong vai trò Chủ tịch Đoàn kiểm định, Thầy Haggarty đã có nhiều nghiên cứu và đóng góp tích cực trong việc hoàn thiện quy trình.",
        ],
      },
      {
        id: 3,
        name: "ThS Christopher Cundall",
        position: "Phó Hiệu Trưởng Trung Học - EMASI Vạn Phúc",
        image: "/assets/images/demo/sections/main-content-people/Cundall-853x1024.png",
        email: "christopherc@emasi.edu.vn",
        infor: [],
         content: [
          "Thầy Cundall là một nhà giáo dục có đam mê với nghề, mang tư duy cởi mở và tâm huyết với sứ mệnh xây dựng môi trường học tập tràn đầy cảm hứng. Với tầm nhìn hướng đến thành tích của học sinh và một cộng đồng trường hoà hợp, Thầy là tấm gương truyền động lực để học sinh tích cực phát triển bản thân, đạt đến thành tựu cá nhân ưu tú. Phương pháp giáo dục mà Thầy tâm đắc là lấy học sinh làm trung tâm, giúp nuôi dưỡng những cá nhân hoàn thiện về mặt học thuật lẫn kỹ năng xã hội và tình cảm. Thầy Cundall tin vào tầm quan trọng của việc giúp học sinh sẵn sàng cho một thế giới thay đổi nhanh chóng kết hợp với việc lan toả đam mê học hỏi và tôn trọng sự đa dạng văn hóa.",
          "Thầy Cundall vinh dự được trao Chứng nhận Chuyên môn Quốc gia dành cho Hiệu trưởng vào năm 2022. Chứng nhận này là minh chứng cho khả năng lãnh đạo ưu tú của Thầy cũng như quyết tâm trong việc tạo dựng một môi trường học tập tích cực và giàu cảm hứng cho học sinh."
        ],
      },
      {
        id: 4,
        name: "Thầy Nguyễn Hoàng Minh Đăng",
        position: "Phó Hiệu Trưởng Trung Học - EMASI Vạn Phúc",
        image: "/assets/images/demo/sections/main-content-people/Dang-853x1024.png",
        email: "dangnhm@emasi.edu.vn",
        infor:  [
    "Tốt nghiệp loại Giỏi ngành Sư phạm Địa lí tại trường Đại học Sư phạm TP.HCM",
    "Hoàn thành khóa học Bồi dưỡng nghiệp vụ quản lý giáo dục cho cán bộ quản lý trường phổ thông"
  ],
         content: [
          "Thầy Đăng có 8 năm kinh nghiệm giảng dạy Địa lí ở trường công lập và trường tư thục, song ngữ. Trong đó có 5 năm Thầy giữ chức vụ Tổ trưởng chuyên môn tổ Khoa học xã hội và 4 năm giữ chức vụ Khối trưởng chủ nhiệm. Thầy Đăng luôn mong muốn đóng góp những kiến thức, kỹ năng của mình vào sự nghiệp giáo dục của nước nhà, giúp học sinh phát triển toàn diện và hạnh phúc. Thầy luôn không ngừng học hỏi, làm mới bản thân để đáp ứng nhu cầu ngày càng cao của xã hội về quản lí và giáo dục.",
        ],
      },
      {
        id: 5,
        name: "ThS Mai Thị Ngọc Lan",
        position: "Phó Hiệu Trưởng Tiểu Học - EMASI Vạn Phúc",
        image: "/assets/images/demo/sections/main-content-people/ms-Lan-853x1024.png",
        email: "lanmtn@emasi.edu.vn",
        infor: [],
         content: [
          "Đã hơn 33 năm cộng tác với sự nghiệp “trồng người”, trong đó là 12 năm tâm huyết giảng dạy bao thế hệ học sinh cùng 21 năm tham gia quản lý và đổi mới giáo dục, Thạc sĩ Mai Thị Ngọc Lan luôn nhận được sự tín nhiệm, yêu mến và kính trọng của đồng nghiệp, phụ huynh và học sinh.",
          "Bằng chuyên môn và kinh nghiệm sâu rộng về Giáo dục Tiểu học, cô đã gặt hái được nhiều thành tích đáng nể khi còn là Hiệu trưởng trường Tiểu học Đinh Tiên Hoàng, Quận 1, TP.HCM: được Sở Giáo dục & Đào tạo cử tham gia tập huấn chương trình Giáo dục về Quyền Trẻ em tại Thụy Điển và Sri Lanka trong năm 2012-2013; vinh dự nhận bằng khen của Bộ Giáo dục & Đào tạo (2003), của Thủ tướng Chính phủ (2009) và Huân chương Lao động hạng 3 (2015)."
        ],
      },
      
    ],

    groups: [
      {
        id: "gvcn",
        name: "Giáo viên chủ nhiệm",

        members: [
          {
            id: 101,
            name: "Cô Võ Ngọc Thùy Dương",
            position: "Giáo Viên Lớp 1E",
            image: "/assets/images/demo/sections/main-content-people/GVCN_Vo-Ngoc-Thuy-Duong-1-894x1024.jpg",
            email: "Duongvnt@emasi.edu.vn",
            infor: [],
            content: [
              "Cô Thùy Dương đã chọn trở thành một giáo viên vì niềm đam mê giảng dạy từ khi còn nhỏ và gia đình có truyền thống nghề giáo. Khi lớn lên, những năng khiếu bộc lộ rõ khiến cô nhận ra nghề giáo thật sự phù hợp với mình, tiếp thêm động lực để cô không ngừng học hỏi, đổi mới và trau dồi phương pháp giảng dạy.",
            ],
          },
           {
            id: 102,
            name: "Cô Vũ Thị Hồng Thủy",
            position: "Giáo Viên Lớp 1A",
            image: "/assets/images/demo/sections/main-content-people/GVCN-VU-THI-HONG-THUY-1024x1024.jpg",
            email: "thuyvth@emasi.edu.vn",
            infor: [],
            content: [
              "Cô Thủy chọn nghề giáo vì Cô yêu trẻ em và muốn truyền đạt kiến thức, kỹ năng cho các em. Cô tin rằng giáo dục là chìa khóa để mở ra tương lai tươi sáng cho mỗi người.",
            ],
          },
           {
            id: 103,
            name: "Cô Nguyễn Thị Phương Tâm",
            position: "Giáo Viên Lớp 1S",
            image: "/assets/images/demo/sections/main-content-people/nguyen-thi-phuong-tam-1024x1024.jpg",
            email: "Tamntp@emasi.edu.vn",
            infor: [],
            content: [
              "Cô Phương Tâm không chỉ là một giáo viên, mà còn là một người bạn luôn sẵn sàng lắng nghe và chia sẻ. Cô thường xuyên khen ngợi những cố gắng của học sinh, khiến các em cảm thấy mình được trân trọng. Những chiếc sticker màu sắc rực rỡ như những bông hoa nhỏ, nở rộ trong lòng các em, mang đến niềm vui và động lực để cố gắng hơn nữa. Nhờ vậy, lớp học của cô Tâm luôn là một ngôi nhà ấm áp, nơi mà mỗi học sinh đều được tỏa sáng.",
            ],
          },
           {
            id: 104,
            name: "Cô Lê Thị Trinh Nguyên",
            position: "Giáo Viên Lớp 2A",
            image: "/assets/images/demo/sections/main-content-people/GVCN_Le-Thi-Trinh-Nguyen-1024x1024.jpg",
            email: "nguyenltt@emasi.edu.vn",
            infor: [],
            content: [
              "Cô Trinh Nguyên đã quyết định theo đuổi nghề giáo với niềm đam mê học tập không ngừng và sự ảnh hưởng sâu sắc từ những người thầy, cô đi trước. Cô Trinh Nguyên hy vọng có thể tạo ra một môi trường học tập tích cực, nơi mỗi học sinh đều cảm thấy được khích lệ và động viên để vươn tới những ước mơ lớn lao.",
            ],
          },
           {
            id: 105,
            name: "Cô Võ Ngọc Tường Vy",
            position: "Giáo Viên Lớp 2S",
            image: "/assets/images/demo/sections/main-content-people/GVCN-co-Vo-Ngoc-Tuong-Vy-1024x1024.jpg",
            email: "vyvnt@emasi.edu.vn",
            infor: [],
            content: [
              "Cô Vy tin rằng việc xây dựng một môi trường tích cực là yếu tố quan trọng để các em có thể mạnh dạn và tự tin thể hiện bản thân. Những hoạt động học tập và trải nghiệm là cơ hội để các em khám phá tài năng để từng bước trở thành phiên bản tốt nhất của chính mình.",
            ],
          },
        ],
      },

      {
        id: "gvbm",
        name: "Giáo viên bộ môn",

        members: [
          {
            id: 101,
            name: "Cô Võ Ngọc Thùy Dương",
            position: "Giáo Viên Lớp 1E",
            image: "/assets/images/demo/sections/main-content-people/GVCN_Vo-Ngoc-Thuy-Duong-1-894x1024.jpg",
            email: "Duongvnt@emasi.edu.vn",
            infor: [],
            content: [
              "Cô Thùy Dương đã chọn trở thành một giáo viên vì niềm đam mê giảng dạy từ khi còn nhỏ và gia đình có truyền thống nghề giáo. Khi lớn lên, những năng khiếu bộc lộ rõ khiến cô nhận ra nghề giáo thật sự phù hợp với mình, tiếp thêm động lực để cô không ngừng học hỏi, đổi mới và trau dồi phương pháp giảng dạy.",
            ],
          },
           {
            id: 102,
            name: "Cô Vũ Thị Hồng Thủy",
            position: "Giáo Viên Lớp 1A",
            image: "/assets/images/demo/sections/main-content-people/GVCN-VU-THI-HONG-THUY-1024x1024.jpg",
            email: "thuyvth@emasi.edu.vn",
            infor: [],
            content: [
              "Cô Thủy chọn nghề giáo vì Cô yêu trẻ em và muốn truyền đạt kiến thức, kỹ năng cho các em. Cô tin rằng giáo dục là chìa khóa để mở ra tương lai tươi sáng cho mỗi người.",
            ],
          },
           {
            id: 103,
            name: "Cô Nguyễn Thị Phương Tâm",
            position: "Giáo Viên Lớp 1S",
            image: "/assets/images/demo/sections/main-content-people/nguyen-thi-phuong-tam-1024x1024.jpg",
            email: "Tamntp@emasi.edu.vn",
            infor: [],
            content: [
              "Cô Phương Tâm không chỉ là một giáo viên, mà còn là một người bạn luôn sẵn sàng lắng nghe và chia sẻ. Cô thường xuyên khen ngợi những cố gắng của học sinh, khiến các em cảm thấy mình được trân trọng. Những chiếc sticker màu sắc rực rỡ như những bông hoa nhỏ, nở rộ trong lòng các em, mang đến niềm vui và động lực để cố gắng hơn nữa. Nhờ vậy, lớp học của cô Tâm luôn là một ngôi nhà ấm áp, nơi mà mỗi học sinh đều được tỏa sáng.",
            ],
          },
           {
            id: 104,
            name: "Cô Lê Thị Trinh Nguyên",
            position: "Giáo Viên Lớp 2A",
            image: "/assets/images/demo/sections/main-content-people/GVCN_Le-Thi-Trinh-Nguyen-1024x1024.jpg",
            email: "nguyenltt@emasi.edu.vn",
            infor: [],
            content: [
              "Cô Trinh Nguyên đã quyết định theo đuổi nghề giáo với niềm đam mê học tập không ngừng và sự ảnh hưởng sâu sắc từ những người thầy, cô đi trước. Cô Trinh Nguyên hy vọng có thể tạo ra một môi trường học tập tích cực, nơi mỗi học sinh đều cảm thấy được khích lệ và động viên để vươn tới những ước mơ lớn lao.",
            ],
          },
           {
            id: 105,
            name: "Cô Võ Ngọc Tường Vy",
            position: "Giáo Viên Lớp 2S",
            image: "/assets/images/demo/sections/main-content-people/GVCN-co-Vo-Ngoc-Tuong-Vy-1024x1024.jpg",
            email: "vyvnt@emasi.edu.vn",
            infor: [],
            content: [
              "Cô Vy tin rằng việc xây dựng một môi trường tích cực là yếu tố quan trọng để các em có thể mạnh dạn và tự tin thể hiện bản thân. Những hoạt động học tập và trải nghiệm là cơ hội để các em khám phá tài năng để từng bước trở thành phiên bản tốt nhất của chính mình.",
            ],
          },
        ],
      },
    ],
  },

  {
    id: "nam-long",
    name: "EMASI NAM LONG",

    boardOfDirectors: [
      {
        id: 1,
        name: "Tiến sĩ Huỳnh Công Minh",
        position: "Chủ Tịch Hội Đồng Sáng Lập / Tổng Hiệu Trưởng",
        image: "/assets/images/demo/sections/main-content-people/ONG0741-768x1024.jpg",
        email: "huynhcongminh@emasi.edu.vn",
        infor: [],
        content: [
          "Tiến sĩ Giáo dục học Huỳnh Công Minh, sinh năm 1948, là nhà giáo dục tâm huyết, thiết tha với công cuộc cải cách giáo dục nước nhà, luôn mong muốn đem lại cho học sinh Việt Nam một nền giáo dục tiên tiến.",
          "Hơn 45 năm hoạt động và nghiên cứu giáo dục, Tiến sĩ đã trải qua nhiều cương vị công tác và có nhiều cống hiến giá trị cho ngành giáo dục nước nhà. Xuất thân là Giáo sư Trung học Đệ nhị cấp trước năm 1975 dạy Toán học và Vật lý tại Tuy Phong, Bình Thuận; là giáo viên dạy giỏi rồi làm Phó Hiệu trưởng, Hiệu trưởng các trường Trung học Bùi Thị Xuân, Củ Chi, An Lạc tại thành phố Hồ Chí Minh; là Trưởng phòng Giáo dục quận 10 trong các năm 1987 – 1995; là Trưởng phòng Trung học, Phó Giám đốc và Giám đốc Sở Giáo dục và Đào tạo từ năm 1995 đến 2011; là Phó Chủ tịch Hội tâm lý Giáo dục Việt Nam, cán bộ giảng dạy cao học giáo dục Trường Đại học Khoa học Xã hội và Nhân văn, cố vấn các chương trình đổi mới giáo dục đến nay.",
          "Với quá trình đào tạo chính quy và trải nghiệm phong phú, đa dạng qua các thời kỳ cùng điều kiện nghiên cứu giáo dục của trên 15 nước có nền giáo dục tiên tiến của thế giới, Tiến sĩ có được năng lực và kinh nghiệm giáo dục thuyết phục, có uy tín tốt trong ngành và trong xã hội. Có thể kể đến nhiều thành tựu đáng nhớ của Tiến sĩ trong suốt thời gian công tác trong ngành Giáo dục như: Giáo dục Quận 10 xuất sắc nhất thành phố nhiều năm liền; Giáo dục thành phố Hồ Chí Minh xếp hạng nhất nước nhiều năm liền; những mô hình nhà trường đổi mới, tiên tiến của thành phố Hồ Chí Minh phù hợp với trào lưu đổi mới hiện nay và đang được các tỉnh thành bạn học tập nhân rộng; những đơn vị giáo dục đào tạo học sinh theo phương pháp giảng dạy tiến bộ của Tiến sĩ không những thi đậu mà còn trở thành những người trưởng thành, năng động, sáng tạo và tự tin trong cuộc sống."
        ],
      },
      {
        id: 2,
        name: "ThS Kenneth Haggarty",
        position: "Giám đốc Điều Hành - EMASI Vạn Phúc",
        image: "/assets/images/demo/sections/main-content-people/Mr-Ken-853x1024.png",
        email: "kenneth@emasi.edu.vn",
        infor: [],
         content: [
          "Thầy Kenneth Haggarty là một nhà lãnh đạo giáo dục có uy tín cao và kinh nghiệm rộng rãi trong lĩnh vực giáo dục Anh quốc, giáo dục quốc tế và công tác kiểm định quốc tế của Hội Đồng Các Trường Quốc tế – CIS. Với sự nghiệp trải dài khắp Đông Nam Á và Trung Đông và phần lớn tại các trường Quốc tế Anh, Thầy đặc biệt tin tưởng vào giá trị của giáo dục song ngữ và có năng lực quản lý cũng như truyền cảm hứng cho một cộng đồng trường đa bản sắc. Tâm huyết của thầy Haggarty đối với sự thành công của học sinh không chỉ được gói gọn ở lĩnh vực học thuật. Thầy đặt mục tiêu chú trọng sự phát triển về tâm lý và xã hội của học sinh, song song với đó là quản trị đội ngũ lãnh đạo để đảm bảo một môi trường học tập năng động. Bề dày kinh nghiệm đối với công tác kiểm định của CIS cũng là điểm nổi bật trong hành trang công tác của Thầy. Trong vai trò Chủ tịch Đoàn kiểm định, Thầy Haggarty đã có nhiều nghiên cứu và đóng góp tích cực trong việc hoàn thiện quy trình.",
        ],
      },
      {
        id: 3,
        name: "ThS Christopher Cundall",
        position: "Phó Hiệu Trưởng Trung Học - EMASI Vạn Phúc",
        image: "/assets/images/demo/sections/main-content-people/Cundall-853x1024.png",
        email: "christopherc@emasi.edu.vn",
        infor: [],
         content: [
          "Thầy Cundall là một nhà giáo dục có đam mê với nghề, mang tư duy cởi mở và tâm huyết với sứ mệnh xây dựng môi trường học tập tràn đầy cảm hứng. Với tầm nhìn hướng đến thành tích của học sinh và một cộng đồng trường hoà hợp, Thầy là tấm gương truyền động lực để học sinh tích cực phát triển bản thân, đạt đến thành tựu cá nhân ưu tú. Phương pháp giáo dục mà Thầy tâm đắc là lấy học sinh làm trung tâm, giúp nuôi dưỡng những cá nhân hoàn thiện về mặt học thuật lẫn kỹ năng xã hội và tình cảm. Thầy Cundall tin vào tầm quan trọng của việc giúp học sinh sẵn sàng cho một thế giới thay đổi nhanh chóng kết hợp với việc lan toả đam mê học hỏi và tôn trọng sự đa dạng văn hóa.",
          "Thầy Cundall vinh dự được trao Chứng nhận Chuyên môn Quốc gia dành cho Hiệu trưởng vào năm 2022. Chứng nhận này là minh chứng cho khả năng lãnh đạo ưu tú của Thầy cũng như quyết tâm trong việc tạo dựng một môi trường học tập tích cực và giàu cảm hứng cho học sinh."
        ],
      },
      {
        id: 4,
        name: "Thầy Nguyễn Hoàng Minh Đăng",
        position: "Phó Hiệu Trưởng Trung Học - EMASI Vạn Phúc",
        image: "/assets/images/demo/sections/main-content-people/Dang-853x1024.png",
        email: "dangnhm@emasi.edu.vn",
        infor:  [
    "Tốt nghiệp loại Giỏi ngành Sư phạm Địa lí tại trường Đại học Sư phạm TP.HCM",
    "Hoàn thành khóa học Bồi dưỡng nghiệp vụ quản lý giáo dục cho cán bộ quản lý trường phổ thông"
  ],
         content: [
          "Thầy Đăng có 8 năm kinh nghiệm giảng dạy Địa lí ở trường công lập và trường tư thục, song ngữ. Trong đó có 5 năm Thầy giữ chức vụ Tổ trưởng chuyên môn tổ Khoa học xã hội và 4 năm giữ chức vụ Khối trưởng chủ nhiệm. Thầy Đăng luôn mong muốn đóng góp những kiến thức, kỹ năng của mình vào sự nghiệp giáo dục của nước nhà, giúp học sinh phát triển toàn diện và hạnh phúc. Thầy luôn không ngừng học hỏi, làm mới bản thân để đáp ứng nhu cầu ngày càng cao của xã hội về quản lí và giáo dục.",
        ],
      },
      {
        id: 5,
        name: "ThS Mai Thị Ngọc Lan",
        position: "Phó Hiệu Trưởng Tiểu Học - EMASI Vạn Phúc",
        image: "/assets/images/demo/sections/main-content-people/ms-Lan-853x1024.png",
        email: "lanmtn@emasi.edu.vn",
        infor: [],
         content: [
          "Đã hơn 33 năm cộng tác với sự nghiệp “trồng người”, trong đó là 12 năm tâm huyết giảng dạy bao thế hệ học sinh cùng 21 năm tham gia quản lý và đổi mới giáo dục, Thạc sĩ Mai Thị Ngọc Lan luôn nhận được sự tín nhiệm, yêu mến và kính trọng của đồng nghiệp, phụ huynh và học sinh.",
          "Bằng chuyên môn và kinh nghiệm sâu rộng về Giáo dục Tiểu học, cô đã gặt hái được nhiều thành tích đáng nể khi còn là Hiệu trưởng trường Tiểu học Đinh Tiên Hoàng, Quận 1, TP.HCM: được Sở Giáo dục & Đào tạo cử tham gia tập huấn chương trình Giáo dục về Quyền Trẻ em tại Thụy Điển và Sri Lanka trong năm 2012-2013; vinh dự nhận bằng khen của Bộ Giáo dục & Đào tạo (2003), của Thủ tướng Chính phủ (2009) và Huân chương Lao động hạng 3 (2015)."
        ],
      },
      
    ],

    groups: [],
  },
];

export default function MainContentPeople() {
    const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
    useEffect(() => {
  if (selectedTeacher) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [selectedTeacher]);
  return (
    <>
    <section className="sc-main-content">
      <div className="inner-container">
        <div className="page-content d-flex flex-wrap">
          <div className="header-content">
            <div className="breadcrumb text-uppercase">
              <a href="/" target="_self">
                {pageData.breadcrumb.home}
              </a>

              <span>-</span>

              <a href={pageData.breadcrumb.slug} target="_self">
                {pageData.breadcrumb.title}
              </a>
            </div>
          </div>

          <div className="main-content">
            <h2>
              <strong>
                <span style={{ color: "#909090" }}>
                  {pageData.heading.prefix}{" "}
                </span>

                <span style={{ color: "#003e58" }}>
                  {pageData.heading.highlight}
                </span>
              </strong>
            </h2>

            <p>{pageData.description}</p>

            <div
              className="button ast-flex nav nav-tabs"
              id="myTab"
              role="tablist"
            >
              {pageData.campuses.map((campus) => (
                <a
                  key={campus.id}
                  className={`item nav-link ${
                    campus.active ? "active" : ""
                  }`}
                  id={`${campus.id}-tab`}
                  data-bs-toggle="tab"
                  data-bs-target={`#${campus.id}`}
                  role="tab"
                  aria-controls={campus.id}
                  aria-selected={campus.active}
                  data-aos="fade-up"
                >
                  <img src={campus.icon} alt="" />
                  {campus.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="tab-content" id="main-tab-content">
  {schools.map((school, schoolIndex) => (
    <div
      key={school.id}
      className={`tab-pane fade ${
        schoolIndex === 0 ? "show active" : ""
      }`}
      id={`tab-${schoolIndex + 1}`}
      role="tabpanel"
    >
      {/* Board Of Directors */}
      <div className="board-of-directors main-box">
        <div className="inner-container">
          <h3 className="title-h3">
            Ban giám hiệu
          </h3>

          <div className="items">
            {school.boardOfDirectors.map((teacher) => (
              <div
                key={teacher.id}
                className="item"
                onClick={() => setSelectedTeacher(teacher)}
                data-aos="fade-up"
              >
                <div className="image">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                  />
                </div>

                <div className="name">
                  {teacher.name}
                </div>

                <div className="position">
                  {teacher.position}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* School Box */}
      <div className="school-box">
        <div className="box-color">
          <div className="inner-container">
            <div
              className="main-schools nav nav-tabs"
              role="tablist"
            >
              {school.groups.map((group, groupIndex) => (
                <a
                  key={group.id}
                  className={`school nav-link ${
                    groupIndex === 0 ? "active" : ""
                  }`}
                  data-bs-toggle="tab"
                  data-bs-target={`#school-${school.id}-${group.id}`}
                  data-aos="fade-up"
                >
                  {group.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="inner-container">
          <div className="tab-content">
            {school.groups.map((group, groupIndex) => (
              <div
                key={group.id}
                id={`school-${school.id}-${group.id}`}
                className={`tab-pane fade ${
                  groupIndex === 0
                    ? "show active"
                    : ""
                }`}
              >
                <div className="main-schools main-box">
                  <div className="items">
                    {group.members.map((teacher) => (
                      <div
                        key={teacher.id}
                        className="item"
                        onClick={() => setSelectedTeacher(teacher)}
                        data-aos="fade-up"
                      >
                        <div className="image">
                          <img
                            src={teacher.image}
                            alt={teacher.name}
                          />
                        </div>

                        <div className="name">
                          {teacher.name}
                        </div>

                        <div className="position">
                          {teacher.position}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

{selectedTeacher && (
<section
  className="modal-popup"
  style={{ padding: 0 }}
>
  <div
    className="modal fade show"
    id={`member-${selectedTeacher.id}`}
    tabIndex={-1}
    aria-labelledby={`member-${selectedTeacher.id}`}
    aria-modal="true"
    role="dialog"
    style={{ display: "block" }}
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <button
          type="button"
          className="btn-close custom-close-btn"
          aria-label="Close"
          onClick={() => setSelectedTeacher(null)}
        />

        <div className="modal-body">
          {/* Left */}
          <div className="left-box">
            <div className="box">
              <img
                src={selectedTeacher.image}
                alt={selectedTeacher.name}
              />

              <div className="temp-div">
                <div className="name">
                  {selectedTeacher.name}
                </div>

                <div className="position">
                  {selectedTeacher.position}
                </div>
                <div className="info">
                    {selectedTeacher.infor?.length > 0 && (
                      <div style={{ marginBottom: "16px" }}>
                          Faculty Information
                      </div>
                    )}
                    {selectedTeacher.infor?.map(
                        (item: string, index: number) => (
                        <p key={index}>{item}</p>
                        )
                    )}
                </div>
                

                <div className="email">
                  School Email
                  <br />

                  {selectedTeacher.email && (
                    <a
                      href={`mailto:${selectedTeacher.email}`}
                    >
                      {selectedTeacher.email}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="right-box">
            <div className="box">
              <div
              />
              {selectedTeacher.content?.map(
                        (item: string, index: number) => (
                        <p key={index}>{item}</p>
                        )
                    )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    className="modal-backdrop fade show"
    onClick={() => setSelectedTeacher(null)}
  />
</section>
)}
    </>
  );
}