"use client";

import Link from "next/link";
import type { ChangeEvent, MouseEvent } from "react";
import { useMemo, useRef } from "react";
import { useNowPlaying } from "../../components/NowPlayingProvider";

const projects = [
  {
    title: "Food Delivery Time Predictor",
    time: "January 2024",
    bullets: [
      "Performed exploratory data analysis and feature engineering using scikit-learn, pandas, numpy, and matplotlib, applying one-hot encoding, ordinal encoding, and MinMax scaling to normalize features.",
      "Created and compared a neural network model using TensorFlow with Keras and a gradient boosting model using XGBoost, tuning hyperparameters with GridSearchCV on validation data to improve accuracy by 8%.",
    ],
  },
  {
    title: "Spotify Song Recommender",
    time: "December 2023",
    bullets: [
      "Analyzed audio feature data for over 1 million songs and used Spotify's API to extract song features.",
      "Scaled, one-hot encoded, and mapped the features of the data in Jupyter Notebook using scikit-learn, pandas, and numpy, and used cosine similarity to measure likeness between two songs.",
    ],
  },
];

export default function ProjectsPage() {
  const queueKey = "projects";
  const projectsQueue = useMemo(
    () =>
      projects.map((item, index) => ({
        id: `${item.title}-${index}`,
        title: item.title,
        subtitle: "Personal Project",
        coverSrc: "/jeffrey.png",
        audioSrc:
          item.title === "Food Delivery Time Predictor"
            ? "/first_heartbreak.mp3"
            : "/sleepy_fish_away_with_the_fairies.mp3",
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
    toggle(queueKey, projectsQueue, 0);
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
            <Link href="/experience">Experience</Link>
            <Link href="/projects" aria-current="page">
              Projects
            </Link>
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
            <h1>Projects</h1>
            <p className="spotify-meta-line">
              Jeffrey Peng · 2 tracks · Data Scientist
            </p>
            <button
              type="button"
              className="spotify-main-play"
              onClick={() =>
                toggle(
                  queueKey,
                  projectsQueue,
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
          {projects.map((project, index) => (
            <article key={project.title} className="spotify-track">
              <span className="spotify-track-index">
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <div>
                <h3>{project.title}</h3>
                <ul className="spotify-bullets">
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
              <div className="spotify-track-actions">
                <span className="spotify-track-meta">{project.time}</span>
                <button
                  type="button"
                  className="spotify-play-button"
                  onClick={() => toggle(queueKey, projectsQueue, index)}
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
                    {nowPlayingItem?.title ?? "Project track"}
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
