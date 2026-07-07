import React, { useState, useEffect, useMemo } from "react";
import "./main_content_people.css";

// Hàm hỗ trợ xóa thẻ HTML khỏi tiêu đề (VD: <strong>Ban Giám hiệu </strong> -> Ban Giám hiệu)
const stripHtml = (html?: string | null) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").trim();
};

// Định nghĩa kiểu dữ liệu cho bài viết Giáo viên (Member)
interface TeacherNode {
  id: string;
  title: string;
  content?: string;
  excerpt?: string;
  featuredImage?: {
    node?: {
      sourceUrl?: string;
      altText?: string;
    };
  };
  memberInfo?: {
    position?: string;
    email?: string;
    infor?: string[];
  };
}

interface TeamTeachGroup {
  schoolName?: string | null;
  title?: string | null;
  listTeacher?: {
    teacher?: {
      nodes?: TeacherNode[];
    };
  }[];
  generalEducation?: {
    name?: string | null;
    members?: any[];
  }[];
}

interface MainContentPeopleProps {
  data?: {
    teamTeach?: TeamTeachGroup[];
  };
}


export default function MainContentPeople({ data }: MainContentPeopleProps) {
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherNode | null>(null);

  // Khóa cuộn trang khi mở Modal chi tiết giáo viên
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

  // CHUYỂN ĐỔI DỮ LIỆU GRAPHQL SANG CẤU TRÚC SCHOOLS ĐỂ HIỂN THỊ ĐỘNG
  const schools = useMemo(() => {
    const rawList = data?.teamTeach || [];
    const schoolMap = new Map<string, any>();

    rawList.forEach((group, idx) => {
      // Xác định cơ sở trường học (Mặc định nếu null là Vạn Phúc)
      const campusName = group.schoolName || "EMASI VẠN PHÚC";
      const campusId = campusName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-");

      if (!schoolMap.has(campusName)) {
        schoolMap.set(campusName, {
          id: `${campusId}-${idx}`,
          name: campusName,
          boardTitle: "Ban giám hiệu",
          boardOfDirectors: [],
          groups: [],
        });
      }

      const currentSchool = schoolMap.get(campusName);

      // --- 1. XỬ LÝ BAN GIÁM HIỆU (Từ listTeacher) ---
      const mainTeachers: TeacherNode[] = [];
      group.listTeacher?.forEach((item) => {
        if (item.teacher?.nodes && item.teacher.nodes.length > 0) {
          mainTeachers.push(...item.teacher.nodes);
        }
      });

      const cleanTitle = stripHtml(group.title) || "Ban giám hiệu";

      if (currentSchool.boardOfDirectors.length === 0 && mainTeachers.length > 0) {
        currentSchool.boardTitle = cleanTitle;
        currentSchool.boardOfDirectors = mainTeachers;
      } else if (mainTeachers.length > 0) {
        currentSchool.groups.push({
          id: `group-main-${idx}`,
          name: cleanTitle,
          members: mainTeachers,
        });
      }

      // --- 2. XỬ LÝ CÁC TAB BÊN DƯỚI (Từ generalEducation) ---
      group.generalEducation?.forEach((edu, eduIdx) => {
        const eduTeachers: TeacherNode[] = [];
        
        edu.members?.forEach((m: any) => {
          // Khớp chính xác cấu trúc thực tế: m.thanhvien.nodes từ JSON API
          if (m?.thanhvien?.nodes && Array.isArray(m.thanhvien.nodes)) {
            eduTeachers.push(...m.thanhvien.nodes);
          } 
          // Các phương án dự phòng nếu thay đổi cấu trúc trong tương lai
          else if (m?.node && typeof m.node === "object") {
            eduTeachers.push(m.node);
          } else if (Array.isArray(m?.nodes)) {
            eduTeachers.push(...m.nodes);
          } else if (m && m.title) {
            eduTeachers.push(m);
          }
        });

        if (eduTeachers.length > 0) {
          currentSchool.groups.push({
            id: `group-gen-${idx}-${eduIdx}`,
            name: stripHtml(edu.name) || "Giáo viên bộ môn",
            members: eduTeachers,
          });
        }
      });
    });

    return Array.from(schoolMap.values());
  }, [data]);

  return (
    <>
      {/* PHẦN HEADER & TABS CHỌN CƠ SỞ TRƯỜNG */}
      <section className="sc-main-content">
        <div className="inner-container">
          <div className="page-content d-flex flex-wrap">

            <div className="main-content">
              {/* TABS TRƯỜNG HỌC */}
              <div className="button ast-flex nav nav-tabs" id="myTab" role="tablist">
                {schools.map((school, schoolIndex) => (
                  <a
                    key={school.id}
                    className={`item nav-link ${schoolIndex === 0 ? "active" : ""}`}
                    id={`${school.id}-tab`}
                    data-bs-toggle="tab"
                    data-bs-target={`#tab-${schoolIndex + 1}`}
                    role="tab"
                    aria-controls={school.id}
                    aria-selected={schoolIndex === 0}
                    data-aos="fade-up"
                    style={{ cursor: "pointer" }}
                  >
                    <img src="/assets/images/demo/icon-marker-large.png" alt="" />
                    {school.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NỘI DUNG HIỂN THỊ ĐỘI NGŨ THEO TRƯỜNG */}
      <div className="tab-content" id="main-tab-content">
        {schools.map((school, schoolIndex) => (
          <div
            key={school.id}
            className={`tab-pane fade ${schoolIndex === 0 ? "show active" : ""}`}
            id={`tab-${schoolIndex + 1}`}
            role="tabpanel"
          >
            {/* KHỐI 1: BAN GIÁM HIỆU */}
            {school.boardOfDirectors.length > 0 && (
              <div className="board-of-directors main-box">
                <div className="inner-container">
                  <h3 className="title-h3">{school.boardTitle}</h3>

                  <div className="items">
                    {school.boardOfDirectors.map((teacher: TeacherNode) => (
                      <div
                        key={teacher.id}
                        className="item"
                        onClick={() => setSelectedTeacher(teacher)}
                        data-aos="fade-up"
                        style={{ cursor: "pointer" }}
                      >
                        <div className="image">
                          <img
                            src={
                              teacher.featuredImage?.node?.sourceUrl ||
                              "/assets/images/demo/default-avatar.png"
                            }
                            alt={teacher.title || ""}
                          />
                        </div>
                        <div className="name">{teacher.title}</div>
                        <div className="position">
                          {teacher.memberInfo?.position || ""}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* KHỐI 2: CÁC TAB GIÁO VIÊN CON (CHỦ NHIỆM / BỘ MÔN) */}
            {school.groups.length > 0 && (
              <div className="school-box">
                <div className="box-color">
                  <div className="inner-container">
                    <div className="main-schools nav nav-tabs" role="tablist">
                      {school.groups.map((group: any, groupIndex: number) => (
                        <a
                          key={group.id}
                          className={`school nav-link ${groupIndex === 0 ? "active" : ""}`}
                          data-bs-toggle="tab"
                          data-bs-target={`#school-${school.id}-${group.id}`}
                          data-aos="fade-up"
                          style={{ cursor: "pointer" }}
                        >
                          {group.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="inner-container">
                  <div className="tab-content">
                    {school.groups.map((group: any, groupIndex: number) => (
                      <div
                        key={group.id}
                        id={`school-${school.id}-${group.id}`}
                        className={`tab-pane fade ${groupIndex === 0 ? "show active" : ""}`}
                      >
                        <div className="main-schools main-box">
                          <div className="items">
                            {group.members.map((teacher: TeacherNode, mIdx: number) => (
                              <div
                                key={teacher.id || mIdx}
                                className="item"
                                onClick={() => setSelectedTeacher(teacher)}
                                data-aos="fade-up"
                                style={{ cursor: "pointer" }}
                              >
                                <div className="image">
                                  <img
                                    src={
                                      teacher.featuredImage?.node?.sourceUrl ||
                                      "/assets/images/demo/default-avatar.png"
                                    }
                                    alt={teacher.title || ""}
                                  />
                                </div>
                                <div className="name">{teacher.title}</div>
                                <div className="position">
                                  {teacher.memberInfo?.position || ""}
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
            )}
          </div>
        ))}
      </div>

      {/* POPUP MODAL HIỂN THỊ CHI TIẾT GIÁO VIÊN KHI CLICK */}
      {selectedTeacher && (
        <section className="modal-popup" style={{ padding: 0 }}>
          <div
            className="modal fade show"
            id={`member-${selectedTeacher.id || "detail"}`}
            tabIndex={-1}
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
                  {/* Cột trái: Ảnh và chức vụ */}
                  <div className="left-box">
                    <div className="box">
                      <img
                        src={
                          selectedTeacher.featuredImage?.node?.sourceUrl ||
                          "/assets/images/demo/default-avatar.png"
                        }
                        alt={selectedTeacher.title || ""}
                      />

                      <div className="temp-div">
                        <div className="name">{selectedTeacher.title}</div>
                        <div className="position">
                          {selectedTeacher.memberInfo?.position || ""}
                        </div>

                        {selectedTeacher.memberInfo?.infor &&
                          selectedTeacher.memberInfo.infor.length > 0 && (
                            <div className="info">
                              <div style={{ marginBottom: "16px", fontWeight: "bold" }}>
                                Faculty Information
                              </div>
                              {selectedTeacher.memberInfo.infor.map(
                                (item: string, index: number) => (
                                  <p key={index}>{item}</p>
                                )
                              )}
                            </div>
                          )}

                        {selectedTeacher.memberInfo?.email && (
                          <div className="email">
                            School Email
                            <br />
                            <a href={`mailto:${selectedTeacher.memberInfo.email}`}>
                              {selectedTeacher.memberInfo.email}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Cột phải: Tiểu sử chi tiết */}
                  <div className="right-box">
                    <div className="box">
                      <div />
                      {selectedTeacher.content ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: selectedTeacher.content,
                          }}
                        />
                      ) : (
                        <p>Đang cập nhật thông tin chi tiết...</p>
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