import React, { useState } from "react";
import "./events.css";

//Phụ huynh/ Tin tức và sự kiện
//trang này có sử dụng cái này để render event item: elfsight
//tạm thời sử dụng cấu trúc event item ảo

interface EventItem {
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
}

interface EventTab {
  button: string;
  events: EventItem[];
}

const eventTabs: EventTab[] = [
  {
    button: "EMASI Nam Long",
    events: [
    //   {
    //     title: "Open House 2026",
    //     description:
    //       "Parents and students are invited to explore the EMASI Nam Long campus and experience our learning environment.",
    //     location: "EMASI Nam Long",
    //     date: "15 Jun 2026",
    //     image:
    //       "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
    //   },
    //   {
    //     title: "Science Fair",
    //     description:
    //       "Students showcase innovative STEM projects and scientific research.",
    //     location: "EMASI Nam Long",
    //     date: "22 Jun 2026",
    //     image:
    //       "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800",
    //   },
    //   {
    //     title: "Summer Concert",
    //     description:
    //       "A special evening featuring musical performances by students.",
    //     location: "EMASI Nam Long",
    //     date: "30 Jun 2026",
    //     image:
    //       "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800",
    //   },
    ],
  },
  {
    button: "EMASI VẠN PHÚC",
    events: [
    //   {
    //     title: "Sports Day",
    //     description:
    //       "Annual sports competition for students and families.",
    //     location: "EMASI Vạn Phúc",
    //     date: "18 Jun 2026",
    //     image:
    //       "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800",
    //   },
    //   {
    //     title: "Art Exhibition",
    //     description:
    //       "Showcasing creative artwork from students across all grades.",
    //     location: "EMASI Vạn Phúc",
    //     date: "28 Jun 2026",
    //     image:
    //       "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800",
    //   },
    ],
  },
];

export default function Events() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      className="event-lists sc-main-content"
      style={{
        background:
          "linear-gradient(152deg, #3BACC7 13.03%, #004D6C 86.97%)",
      }}
    >
      <div className="inner-container">
        <div className="page-content">
          <div className="sc-main-title p-0">
            <h4
              className="title title-event fw-bold"
              data-aos="fade-up"
            >
              SỰ KIỆN
            </h4>
          </div>

          <div className="main-content">
            <div className="button ast-flex">
              {eventTabs.map((tab, index) => (
                <a
  href={`#tab-${index + 1}`}
  className={`item nav-link ${
    activeTab === index ? "active" : ""
  }`}
  onClick={(e) => {
    e.preventDefault();
    setActiveTab(index);
  }}
>
  <img src="assets/images/demo/icon-marker-large.png" alt="" />
  {tab.button}
</a>
              ))}
            </div>

            <div className="events-items">
  {eventTabs[activeTab].events?.length > 0 &&
    eventTabs[activeTab].events.map((event, index) => (
      <div className="event-card" key={index}>
        <div className="event-image">
          <img src={event.image} alt={event.title} />
        </div>

        <div className="event-content">
          <div className="event-date">
            {event.date}
          </div>

          <h3>{event.title}</h3>

          <p>{event.description}</p>

          <div className="event-location">
            📍 {event.location}
          </div>
        </div>
      </div>
    ))}
</div>
          </div>
        </div>
      </div>
    </section>
  );
};