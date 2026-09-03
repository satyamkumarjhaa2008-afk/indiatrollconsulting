import React from "react";
import "./television.css";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";
interface YouTubeVideo {
  id: string;
  url: string;
  flag: "latest" | "old";
}

const youtubeVideos: YouTubeVideo[] = [
  {
    id: "I6HVFMo9r7Y",
    url: "https://www.youtube.com/embed/I6HVFMo9r7Y",
    flag: "latest",
  },
  {
    id: "28-V2s2q69s",
    url: "https://www.youtube.com/embed/28-V2s2q69s",
    flag: "latest",
  },
  {
    id: "81V87rHQgmY",
    url: "https://www.youtube.com/embed/81V87rHQgmY",
    flag: "latest",
  },
  {
    id: "qQCJ9BDEpQc",
    url: "https://www.youtube.com/embed/qQCJ9BDEpQc",
    flag: "latest",
  },
  {
    id: "FX5Pzg8XdQU",
    url: "https://www.youtube.com/embed/FX5Pzg8XdQU",
    flag: "latest",
  },
  {
    id: "PoroZyPT5Fw",
    url: "https://www.youtube.com/embed/PoroZyPT5Fw",
    flag: "latest",
  },
  {
    id: "jQB6Op9aG9k",
    url: "https://www.youtube.com/embed/jQB6Op9aG9k",
    flag: "latest",
  },
  {
    id: "876HroUKNBc",
    url: "https://www.youtube.com/embed/876HroUKNBc",
    flag: "latest",
  },
  {
    id: "BNazsqOm0bM",
    url: "https://www.youtube.com/embed/BNazsqOm0bM",
    flag: "latest",
  },
  {
    id: "5iNdWm_F-vo",
    url: "https://www.youtube.com/embed/5iNdWm_F-vo",
    flag: "old",
  },
  {
    id: "-BWZDNYJd6M",
    url: "https://www.youtube.com/embed/-BWZDNYJd6M",
    flag: "old",
  },
  {
    id: "Mti95Q70N2g",
    url: "https://www.youtube.com/embed/Mti95Q70N2g",
    flag: "old",
  },
  {
    id: "4eI_CjOr9Sk",
    url: "https://www.youtube.com/embed/4eI_CjOr9Sk",
    flag: "old",
  },
  {
    id: "4_dXvN0zqb4",
    url: "https://www.youtube.com/embed/4_dXvN0zqb4",
    flag: "old",
  },
];

const Television: React.FC = () => {
  const latestVideos = youtubeVideos.filter(
    (video) => video.flag === "latest"
  );

  const oldVideos = youtubeVideos.filter(
    (video) => video.flag === "old"
  );

  return (
    <main className="television-page">
        <SiteNavbar/>

      {/* Page Header */}
      <section className="television-header">
        <div className="television-header-content">
          <span className="television-eyebrow">VIDEO NEWS</span>

          <h1 className="television-title">
            Television
          </h1>

          <p className="television-description">
            Watch the latest news, political updates, interviews,
            and important stories from across India.
          </p>
        </div>
      </section>

      {/* Latest Videos */}
      <section className="television-section">
        <div className="television-section-header">
          <div>
            <span className="section-label">LATEST</span>
            <h2>Latest Videos</h2>
          </div>

          <span className="video-count">
            {latestVideos.length} Videos
          </span>
        </div>

        <div className="youtube-grid">
          {latestVideos.map((video, index) => (
            <article
              className="youtube-card"
              key={video.id}
            >
              <div className="youtube-frame">
                <iframe
                  src={video.url}
                  title={`YouTube video ${index + 1}`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="youtube-card-footer">
                <span className="youtube-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="youtube-type">
                  Latest
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Older Videos */}
      {oldVideos.length > 0 && (
        <section className="television-section television-old-section">
          <div className="television-section-header">
            <div>
              <span className="section-label">ARCHIVE</span>
              <h2>Previous Videos</h2>
            </div>

            <span className="video-count">
              {oldVideos.length} Videos
            </span>
          </div>

          <div className="youtube-grid">
            {oldVideos.map((video, index) => (
              <article
                className="youtube-card"
                key={video.id}
              >
                <div className="youtube-frame">
                  <iframe
                    src={video.url}
                    title={`Previous YouTube video ${index + 1}`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                <div className="youtube-card-footer">
                  <span className="youtube-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="youtube-type">
                    Archive
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
      <SiteFooter/>
    </main>
  );
};

export default Television;