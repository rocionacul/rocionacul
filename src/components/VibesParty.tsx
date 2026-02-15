import React, { useEffect, useState } from 'react';
import './VibesParty.css';

const YOUTUBE_PLAYLIST_ID = 'PLSOnp1hkRjZVGVU1NWoCBuvLJc11JjY4z';
const VIDEOS_PER_SLIDE = 4;

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  videoId: string;
}

interface VibesPartyProps {
  embedded?: boolean;
}

export const VibesParty: React.FC<VibesPartyProps> = ({ embedded = false }) => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [useCarousel, setUseCarousel] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    if (!apiKey) {
      setLoading(false);
      return;
    }

    const fetchPlaylist = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${YOUTUBE_PLAYLIST_ID}&key=${apiKey}`
        );
        const data = await res.json();
        if (data.error || !data.items?.length) {
          setLoading(false);
          return;
        }
        const list: YouTubeVideo[] = data.items
          .filter((item: { snippet?: { resourceId?: { videoId?: string } } }) => item.snippet?.resourceId?.videoId)
          .map((item: {
            id: string;
            snippet: {
              title: string;
              thumbnails: { medium?: { url: string }; high?: { url: string }; default?: { url: string } };
              resourceId: { videoId: string };
            };
          }) => ({
            id: item.id,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url || '',
            videoId: item.snippet.resourceId.videoId,
          }));
        setVideos(list);
        setUseCarousel(true);
      } catch {
        setUseCarousel(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const totalSlides = Math.ceil(videos.length / VIDEOS_PER_SLIDE);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  const goToSlide = (index: number) => setCurrentSlide(index);
  const loadMore = () => setVisibleCount((prev) => Math.min(prev + 6, videos.length));

  const renderVideoCard = (video: YouTubeVideo) => (
    <a
      key={video.id}
      href={`https://www.youtube.com/watch?v=${video.videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="youtube-video-card"
    >
      <div className="youtube-video-thumb">
        <img src={video.thumbnail} alt="" loading="lazy" />
        <span className="youtube-play-icon" aria-hidden>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </span>
      </div>
      <p className="youtube-video-title">{video.title}</p>
    </a>
  );

  const content = (
    <div className="container">
      {!embedded && (
        <h2 className="section-title text-gradient-purple">Vibes de la Fiesta</h2>
      )}
      <p className="vibes-party-intro">
        La banda sonora de mi cumpleaños
      </p>

      {loading && (
        <div className="youtube-loading">
          <p>Cargando videos...</p>
        </div>
      )}

      {!loading && useCarousel && videos.length > 0 && (
        <>
          {!isMobile ? (
            <>
              <div className="youtube-carousel">
                <button
                  type="button"
                  className="carousel-button carousel-button-prev"
                  onClick={prevSlide}
                  aria-label="Anterior"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <div className="youtube-carousel-container">
                  <div
                    className="youtube-carousel-track"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {Array.from({ length: totalSlides }, (_, i) => (
                      <div key={i} className="youtube-carousel-slide">
                        <div className="youtube-videos-grid">
                          {videos.slice(i * VIDEOS_PER_SLIDE, (i + 1) * VIDEOS_PER_SLIDE).map(renderVideoCard)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  className="carousel-button carousel-button-next"
                  onClick={nextSlide}
                  aria-label="Siguiente"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
              <div className="carousel-dots youtube-carousel-dots">
                {Array.from({ length: totalSlides }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`carousel-dot ${currentSlide === i ? 'active' : ''}`}
                    onClick={() => goToSlide(i)}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="youtube-videos-grid-mobile">
                {videos.slice(0, visibleCount).map(renderVideoCard)}
              </div>
              {visibleCount < videos.length && (
                <div className="youtube-load-more">
                  <button type="button" className="load-more-button" onClick={loadMore}>
                    Cargar más videos
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}

      {!loading && !useCarousel && (
        <div className="youtube-playlist-container">
          <div className="youtube-embed-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/videoseries?list=${YOUTUBE_PLAYLIST_ID}&autoplay=0&mute=0`}
              title="Playlist de la Fiesta"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="youtube-iframe"
            />
          </div>
          <div className="playlist-description">
            <p>Esta es la playlist que va a sonar durante toda la fiesta.</p>
          </div>
        </div>
      )}

      <div className="youtube-link">
        <a
          href={`https://www.youtube.com/playlist?list=${YOUTUBE_PLAYLIST_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="youtube-button"
        >
          <svg className="youtube-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span>Ver playlist completa en YouTube</span>
        </a>
      </div>
    </div>
  );

  if (embedded) {
    return <div className="vibes-party vibes-party--embedded">{content}</div>;
  }

  return (
    <section id="vibes-party" className="vibes-party section">
      {content}
    </section>
  );
};
