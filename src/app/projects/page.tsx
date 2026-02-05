"use client";

import Link from "next/link";
import type { ChangeEvent, MouseEvent } from "react";
import { useEffect, useMemo, useRef } from "react";
import { useNowPlaying } from "../../components/NowPlayingProvider";

const projects = [
  {
    title: "Habit Tracker",
    time: "February 2026",
    link: "https://habitstracker.ca",
    bullets: [
      "Built a full-stack habit tracking application using Next.js, TypeScript, Express.js, and PostgreSQL, supporting habit creation, daily check-ins, streak calculation, and goal management.",
      "Deployed the system end-to-end on AWS (RDS, Elastic Beanstalk, Amplify), configuring environment variables, API endpoints, and database connections across services; added unit and end-to-end tests with Jest and Cypress",
    ],
  },
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
        coverSrc:
          item.title === "Habit Tracker"
            ? "/habits_tracker_logo.png"
            : "/jeffrey.png",
        audioSrc:
          item.title === "Food Delivery Time Predictor"
            ? "/first_heartbreak.mp3"
            : item.title === "Habit Tracker"
              ? "/motion_peter.mp3"
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
  const handleSeekChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!duration) {
      return;
    }
    seekTo(Number(event.target.value));
  };
  const suppressTooltip = (event: MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.dataset.tooltipSuppressed = "true";
  };
  const handleTooltipMouseLeave = (event: MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.blur();
    delete event.currentTarget.dataset.tooltipSuppressed;
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
  const getVolumeIcon = (value: number) => {
    if (value === 0) {
      return "/volume_off.svg";
    }
    if (value <= 0.33) {
      return "/volume_low.svg";
    }
    if (value <= 0.66) {
      return "/volume_medium.svg";
    }
    return "/volume_high.svg";
  };
  const lastVolumeRef = useRef(volume || 1);
  useEffect(() => {
    if (volume > 0) {
      lastVolumeRef.current = volume;
    }
  }, [volume]);
  const handleToggleMute = () => {
    if (volume === 0) {
      setVolume(lastVolumeRef.current || 1);
      return;
    }
    lastVolumeRef.current = volume;
    setVolume(0);
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
            <p className="spotify-kicker">Public Playlist</p>
            <h1>Projects</h1>
            <p className="spotify-meta-line">
              <span className="spotify-meta-name">Jeffrey Peng</span> · 2 songs, 5
              min 23 sec
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
            <span>
              <img src="/duration.svg" alt="Duration" />
            </span>
          </div>
          {projects.map((project, index) => (
            <article key={project.title} className="spotify-track">
              <span className="spotify-track-index">
                {index + 1}
              </span>
              <div>
                <h3>{project.title}</h3>
                {project.link ? (
                  <a
                    className="spotify-project-link"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    habitstracker.ca
                  </a>
                ) : null}
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
                className={`spotify-icon-button spotify-has-tooltip ${
                  isShuffling ? "is-active" : ""
                }`}
                data-tooltip={isShuffling ? "Disable shuffle" : "Enable shuffle"}
                onClick={(event) => {
                  toggleShuffle();
                  suppressTooltip(event);
                }}
                onMouseLeave={handleTooltipMouseLeave}
              >
                <img src="/shuffle.svg" alt="" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Previous"
                className="spotify-icon-button spotify-has-tooltip"
                data-tooltip="Previous"
                onClick={(event) => {
                  prev();
                  suppressTooltip(event);
                }}
                onMouseLeave={handleTooltipMouseLeave}
              >
                <img src="/previous.svg" alt="" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="spotify-now-play-circle spotify-has-tooltip"
                data-tooltip={isPlaying ? "Pause" : "Play"}
                onClick={(event) => {
                  handleGlobalToggle();
                  suppressTooltip(event);
                }}
                onMouseLeave={handleTooltipMouseLeave}
                disabled={!hasNowPlaying}
              >
                {isPlaying ? (
                  <span className="spotify-now-play-fill">
                    <img src="/pause.svg" alt="" aria-hidden="true" />
                  </span>
                ) : (
                  <span className="spotify-now-play-fill">
                    <img src="/play.svg" alt="" aria-hidden="true" />
                  </span>
                )}
              </button>
              <button
                type="button"
                aria-label="Next"
                className="spotify-icon-button spotify-has-tooltip"
                data-tooltip="Next"
                onClick={(event) => {
                  next();
                  suppressTooltip(event);
                }}
                onMouseLeave={handleTooltipMouseLeave}
              >
                <img src="/next.svg" alt="" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Loop"
                className={`spotify-icon-button spotify-has-tooltip ${
                  isLooping ? "is-active" : ""
                }`}
                data-tooltip={isLooping ? "Disable repeat" : "Enable repeat"}
                onClick={(event) => {
                  toggleLoop();
                  suppressTooltip(event);
                }}
                onMouseLeave={handleTooltipMouseLeave}
              >
                <img src="/loop.svg" alt="" aria-hidden="true" />
              </button>
            </div>
            <div className="spotify-progress">
              <span>{formatTime(currentTime)}</span>
              <div
                className="spotify-progress-bar"
                style={{
                  ["--progress" as string]: duration
                    ? `${(currentTime / duration) * 100}%`
                    : "0%",
                }}
              >
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.01}
                  value={duration ? currentTime : 0}
                  onChange={handleSeekChange}
                  className="spotify-progress-range"
                  aria-label="Seek"
                />
              </div>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          <div className="spotify-now-volume">
            <button
              type="button"
              className="spotify-icon-button spotify-has-tooltip"
              aria-label="Lyrics"
              data-tooltip="Coming soon..."
            >
              <img src="/lyrics.svg" alt="" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="spotify-icon-button spotify-has-tooltip"
              aria-label="Queue"
              data-tooltip="Also coming soon..."
            >
              <img src="/queue.svg" alt="" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="spotify-icon-button spotify-has-tooltip"
              aria-label="Connect"
              data-tooltip="Does nothing..."
            >
              <img src="/connect.svg" alt="" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="spotify-icon-button spotify-has-tooltip"
              aria-label={volume === 0 ? "Unmute" : "Mute"}
              data-tooltip={volume === 0 ? "Unmute" : "Mute"}
              onClick={(event) => {
                handleToggleMute();
                suppressTooltip(event);
              }}
              onMouseLeave={handleTooltipMouseLeave}
            >
              <span className="spotify-volume-icon" aria-hidden="true">
                <img src={getVolumeIcon(volume)} alt="" aria-hidden="true" />
              </span>
            </button>
            <div
              className="spotify-volume-slider"
              style={{
                ["--volume" as string]: `${volume * 100}%`,
              }}
            >
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                className="spotify-volume-range"
                aria-label="Volume"
              />
            </div>
            <button
              type="button"
              className="spotify-icon-button spotify-has-tooltip"
              aria-label="Mini player"
              data-tooltip="Also does nothing..."
            >
              <img src="/miniplayer.svg" alt="" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="spotify-icon-button spotify-has-tooltip"
              aria-label="Fullscreen"
              data-tooltip="Still does nothing..."
            >
              <img src="/fullscreen.svg" alt="" aria-hidden="true" />
            </button>
          </div>
        </footer>
      </main>
    </div>
    </div>
  );
}
