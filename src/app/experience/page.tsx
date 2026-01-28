"use client";

import Link from "next/link";
import type { ChangeEvent, MouseEvent } from "react";
import { useMemo, useRef } from "react";
import { useNowPlaying } from "../../components/NowPlayingProvider";

const experience = [
  {
    role: "Data Scientist",
    company: "Loblaw Digital",
    location: "Toronto, ON",
    time: "September - December 2025",
    logo: "/loblaw_digital_logo.jpeg",
    bullets: [
      "Led development of a Python-based LLM system for invoice anomaly detection to reduce $300M in annual maintenance spend by 10%, integrating SQL and Looker dashboards to visualize model insights for business teams.",
      "Built a batch-processing system in Python (JSONL + LiteLLM) with prompt caching to operate within API rate limits, cutting request volume from 600,000+ to 600 and enabling cost-efficient, scalable processing on enterprise data.",
      "Engineered and selected features for LLM invoice classification, improving model accuracy from 62% to 85%.",
    ],
  },
  {
    role: "Data Scientist",
    company: "Miovision",
    location: "Kitchener, ON",
    time: "May - August 2024",
    logo: "/miovision_logo.jpg",
    bullets: [
      "Built and tuned logistic regression, decision tree, and random forest ML models to predict traffic collisions using scikit-learn, pandas, numpy, and matplotlib, helping city planners identify high-risk intersections.",
      "Created dashboards and reports in Looker, leveraging SQL to join, filter, and transform raw traffic data into meaningful visual insights for stakeholders.",
      "Developed a Python package for traffic flow modeling, signal optimization, and traffic model validation.",
    ],
  },
  {
    role: "Software Engineer",
    company: "University of Waterloo - W Store",
    location: "Waterloo, ON",
    time: "January - April 2023",
    logo: "/w_store_logo.jpeg",
    bullets: [
      "Optimized W Store product filtering by creating and populating new index tables with SQL and BASIC, cutting query time from 2.3 seconds to <0.01 seconds for 40,000+ students.",
      "Owned the end-to-end design and development of a new web application that allowed professors to submit an exam print form using PHP, MySQL, AJAX, jQuery, and HTML/CSS.",
      "Modernized Docker dependencies for Magento upgrades, improving system stability and deployment efficiency.",
    ],
  },
];

export default function ExperiencePage() {
  const queueKey = "experience";
  const experienceQueue = useMemo(
    () =>
      experience.map((item, index) => ({
        id: `${item.company}-${index}`,
        title: item.role,
        subtitle: item.company,
        coverSrc: item.logo,
        audioSrc:
          item.company === "Loblaw Digital"
            ? "/september_song.mp3"
            : item.company === "Miovision"
              ? "/now_we_are_free.mp3"
              : "/clairo_joanie.mp3",
      })),
    []
  );
  const {
    queueKey: activeQueueKey,
    queue: activeQueue,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    isLooping,
    isShuffling,
    currentItem,
    toggle,
    next,
    prev,
    seekTo,
    setVolume,
    toggleLoop,
    toggleShuffle,
  } = useNowPlaying();
  const progressRef = useRef<HTMLDivElement | null>(null);

  const handleSeek = (event: MouseEvent<HTMLDivElement>) => {
    if (!duration || !progressRef.current) {
      return;
    }
    const rect = progressRef.current.getBoundingClientRect();
    const percent = Math.min(
      Math.max((event.clientX - rect.left) / rect.width, 0),
      1
    );
    seekTo(percent * duration);
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };
  const nowPlayingItem = currentItem;
  const isActiveQueue = activeQueueKey === queueKey;
  const hasNowPlaying = Boolean(currentItem);
  const handleGlobalToggle = () => {
    if (activeQueueKey && activeQueue.length) {
      toggle(activeQueueKey, activeQueue, currentIndex);
      return;
    }
    toggle(queueKey, experienceQueue, 0);
  };

  const formatTime = (value: number) => {
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="spotify-layout">
      <input
        className="spotify-sidebar-toggle"
        type="checkbox"
        id="spotify-sidebar-toggle"
      />
      <label
        className="spotify-sidebar-toggle-button"
        htmlFor="spotify-sidebar-toggle"
        aria-label="Toggle navigation"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </label>
      <label
        className="spotify-sidebar-overlay"
        htmlFor="spotify-sidebar-toggle"
        aria-hidden="true"
      />
      <div className="spotify-shell">
        <aside className="spotify-sidebar">
          <div className="spotify-brand">Portfolio</div>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/experience" aria-current="page">
              Experience
            </Link>
            <Link href="/projects">Projects</Link>
          </nav>
        </aside>

      <main className="spotify-content spotify-content-immersive spotify-has-bars">
        <div className="spotify-topbar spotify-fixed-top">
          <Link className="spotify-top-logo" href="/" aria-label="Home">
            <img src="/jeffrey.png" alt="Jeffrey Peng" />
          </Link>
          <div className="spotify-top-actions">
            <a
              className="spotify-top-icon"
              href="mailto:jeffrey.peng@uwaterloo.ca"
              aria-label="Email"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="m22 8-10 6L2 8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </a>
            <a
              className="spotify-top-icon"
              href="https://linkedin.com/in/jmpeng/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="2"
                  y="9"
                  width="4"
                  height="12"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                />
                <circle cx="4" cy="4" r="2" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
        <header className="spotify-playlist-hero">
          <div className="spotify-playlist-art">
            <img src="/jeffrey.png" alt="Jeffrey Peng" />
          </div>
          <div>
            <p className="spotify-kicker">Playlist</p>
            <h1>Experience</h1>
            <p className="spotify-meta-line">
              Jeffrey Peng · 3 songs, 12 min 24 sec
            </p>
            <button
              type="button"
              className="spotify-main-play"
              onClick={() =>
                toggle(
                  queueKey,
                  experienceQueue,
                  isActiveQueue ? currentIndex : 0
                )
              }
            >
              {isActiveQueue && isPlaying ? "Pause" : "Play"}
            </button>
          </div>
        </header>

        <section className="spotify-tracklist">
          <div className="spotify-track-head">
            <span>#</span>
            <span>Title</span>
            <span>Time</span>
          </div>
          {experience.map((item, index) => (
            <article key={`${item.role}-${item.company}`} className="spotify-track">
              <span className="spotify-track-index">
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <div>
                <h3>{item.role}</h3>
                <p>
                  {item.company} · {item.location}
                </p>
                <ul className="spotify-bullets">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
              <div className="spotify-track-actions">
                <span className="spotify-track-meta">{item.time}</span>
                <button
                  type="button"
                  className="spotify-play-button"
                  onClick={() => toggle(queueKey, experienceQueue, index)}
                >
                  {isActiveQueue && currentIndex === index && isPlaying ? "Pause" : "Play"}
                </button>
              </div>
            </article>
          ))}
        </section>
        <footer className="spotify-now-playing spotify-fixed-bottom">
          <div className="spotify-now-left">
            {hasNowPlaying ? (
              <>
                <div className="spotify-now-cover">
                  <img
                    src={nowPlayingItem?.coverSrc ?? "/jeffrey.png"}
                    alt={`${nowPlayingItem?.title ?? "Now playing"} cover`}
                  />
                </div>
                <div>
                  <p className="spotify-now-title">
                    {nowPlayingItem?.title ?? "Experience track"}
                  </p>
                  <p className="spotify-now-sub">
                    {nowPlayingItem?.subtitle ?? "Sleepy Fish, Philanthrope"}
                  </p>
                </div>
                
              </>
            ) : (
              <>
                <div
                  className="spotify-now-cover spotify-now-cover-empty"
                  aria-hidden="true"
                />
                <div className="spotify-now-text-empty" aria-hidden="true" />
              </>
            )}
          </div>
          <div className="spotify-now-center">
            <div className="spotify-now-controls">
              <button
                type="button"
                aria-label="Shuffle"
                className={`spotify-icon-button ${
                  isShuffling ? "is-active" : ""
                }`}
                onClick={toggleShuffle}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M16 4h4v4M4 7h6l8 10h2M4 17h6l3-4M18 18v-4h4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Previous"
                className="spotify-icon-button"
                onClick={prev}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 5v14M20 6l-10 6 10 6z" fill="currentColor" />
                </svg>
              </button>
              <button
                type="button"
                className="spotify-now-play-circle"
                onClick={handleGlobalToggle}
                disabled={!hasNowPlaying}
              >
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="7" y="6" width="4" height="12" fill="currentColor" />
                    <rect x="13" y="6" width="4" height="12" fill="currentColor" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 6l10 6-10 6z" fill="currentColor" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                aria-label="Next"
                className="spotify-icon-button"
                onClick={next}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18 5v14M4 6l10 6-10 6z" fill="currentColor" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Loop"
                className={`spotify-icon-button ${isLooping ? "is-active" : ""}`}
                onClick={toggleLoop}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M7 7h10v4M17 17H7v-4M7 7l-2 2M7 17l-2-2M17 7l2 2M17 17l2-2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="spotify-progress">
              <span>{formatTime(currentTime)}</span>
              <div
                className="spotify-progress-bar"
                ref={progressRef}
                onClick={handleSeek}
                style={{
                  ["--progress" as string]: duration
                    ? `${(currentTime / duration) * 100}%`
                    : "0%",
                }}
              />
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          <div className="spotify-now-volume">
            <button type="button" className="spotify-icon-button" aria-label="Lyrics">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 3a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V7a4 4 0 0 1 4-4ZM6 21h12"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button type="button" className="spotify-icon-button" aria-label="Queue">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 6h16M4 10h16M4 14h10M4 18h10"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button type="button" className="spotify-icon-button" aria-label="Connect">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 8h16v8H4zM8 18h8"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <span className="spotify-volume-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M4 10v4h4l5 4V6l-5 4H4z" fill="currentColor" />
                <path
                  d="M16 9c1.2.9 1.6 1.8 1.6 3s-.4 2.1-1.6 3M18.5 7.5c2 1.5 2.5 3 2.5 4.5s-.5 3-2.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
              className="spotify-volume-range"
              aria-label="Volume"
              style={{
                ["--volume" as string]: `${volume * 100}%`,
              }}
            />
          </div>
        </footer>
      </main>
    </div>
    </div>
  );
}
