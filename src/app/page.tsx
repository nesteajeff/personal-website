"use client";

import Link from "next/link";
import type { ChangeEvent } from "react";
import { useMemo } from "react";
import { useNowPlaying } from "../components/NowPlayingProvider";

const experience = [
  {
    role: "Software Engineer",
    company: "Loblaw Digital",
    location: "Toronto, ON",
    time: "September - December 2025",
    bullets: [
      "Led development of a Python-based LLM system for invoice anomaly detection to reduce $300M in annual maintenance spend by 10%, integrating SQL and Looker dashboards to visualize model insights for business teams.",
      "Built a batch-processing system in Python (JSONL + LiteLLM) with prompt caching to operate within API rate limits, cutting request volume from 600,000+ to 600 and enabling cost-efficient, scalable processing on enterprise data.",
      "Engineered and selected features for LLM invoice classification, improving model accuracy from 62% to 85%.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Miovision",
    location: "Kitchener, ON",
    time: "May - August 2024",
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
    bullets: [
      "Optimized W Store product filtering by creating and populating new index tables with SQL and BASIC, cutting query time from 2.3 seconds to <0.01 seconds for 40,000+ students.",
      "Owned the end-to-end design and development of a new web application that allowed professors to submit an exam print form using PHP, MySQL, AJAX, jQuery, and HTML/CSS.",
      "Modernized Docker dependencies for Magento upgrades, improving system stability and deployment efficiency.",
    ],
  },
];

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

const education = {
  school: "University of Waterloo",
  time: "September 2021 - December 2026",
  program: "Candidate for Bachelor of Computer Science, Honours",
  courses:
    "Databases (SQL), Artificial Intelligence (Python), Agile Web Dev (Python, SQL & JS), Software Design, Financial Data Analytics (Python), OOP (bash & C++), Data Structures (C++), Algorithms, Functional Programming",
};

export default function Home() {
  const queueKey = "home";
  const homeQueue = useMemo(
    () => [
      {
        id: "home-track",
        title: "Now playing",
        subtitle: "Sleepy Fish, Philanthrope",
        coverSrc: "/jeffrey.png",
        audioSrc: "/sleepy_fish_away_with_the_fairies.mp3",
      },
    ],
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
  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };
  const nowPlayingItem = currentItem;
  const hasNowPlaying = Boolean(currentItem);
  const handleGlobalToggle = () => {
    if (activeQueueKey && activeQueue.length) {
      toggle(activeQueueKey, activeQueue, currentIndex);
      return;
    }
    toggle(queueKey, homeQueue, 0);
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
            <Link href="/" aria-current="page">
              Home
            </Link>
            <Link href="/experience">Experience</Link>
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

        <header className="spotify-header">
          <img
            className="spotify-hero-avatar"
            src="/me_with_cow.jpeg"
            alt="Jeffrey Peng portrait with cow"
          />
          <div className="spotify-header-info">
            <div>
              <h1 className="spotify-hero-title">
                Jeffrey <span className="spotify-hero-highlight">Peng</span>
              </h1>
              <p className="spotify-lede spotify-hero-subtitle">
                Data Scientist
              </p>
            </div>
            <div className="spotify-contact-block">
              <p>University of Waterloo</p>
              <p>Seeking Summer 2026 Internships</p>
              <a href="mailto:jeffrey.peng@uwaterloo.ca">
                jeffrey.peng@uwaterloo.ca
              </a>
              <a
                href="https://linkedin.com/in/jmpeng/"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/jmpeng/
              </a>
            </div>
          </div>
        </header>

        <section className="spotify-section">
          <h2 className="spotify-section-title">Playlists</h2>
          <div className="spotify-playlists">
            <div className="spotify-playlist-card">
              <div>
                <h3>Experience</h3>
                <p>3 tracks</p>
              </div>
              <Link className="spotify-play" href="/experience">
                Play
              </Link>
            </div>
            <div className="spotify-playlist-card">
              <div>
                <h3>Projects</h3>
                <p>2 tracks</p>
              </div>
              <Link className="spotify-play" href="/projects">
                Play
              </Link>
            </div>
          </div>
        </section>

        <section className="spotify-section">
          <h2 className="spotify-section-title">Education</h2>
          <article className="spotify-item">
            <div>
              <h3>{education.school}</h3>
              <p>{education.program}</p>
              <p className="spotify-detail">Courses: {education.courses}</p>
            </div>
            <span className="spotify-meta">{education.time}</span>
          </article>
        </section>

        <section className="spotify-section">
          <h2 className="spotify-section-title">Contact</h2>
          <div className="spotify-contact-card">
            <p>Seeking Summer 2026 Internships · Let&apos;s connect!</p>
            <div className="spotify-actions">
              <a
                className="spotify-button spotify-button-primary"
                href="mailto:jeffrey.peng@uwaterloo.ca"
              >
                Email
              </a>
              <a
                className="spotify-button spotify-button-ghost"
                href="https://linkedin.com/in/jmpeng/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
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
                    {nowPlayingItem?.title ?? "Now playing"}
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
                className={`spotify-icon-button ${isShuffling ? "is-active" : ""}`}
                onClick={toggleShuffle}
              >
                <img src="/shuffle.svg" alt="" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Previous"
                className="spotify-icon-button"
                onClick={prev}
              >
                <img src="/previous.svg" alt="" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="spotify-now-play-circle"
                onClick={handleGlobalToggle}
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
                className="spotify-icon-button"
                onClick={next}
              >
                <img src="/next.svg" alt="" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Loop"
                className={`spotify-icon-button ${isLooping ? "is-active" : ""}`}
                onClick={toggleLoop}
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
            <button type="button" className="spotify-icon-button" aria-label="Lyrics">
              <img src="/lyrics.svg" alt="" aria-hidden="true" />
            </button>
            <button type="button" className="spotify-icon-button" aria-label="Queue">
              <img src="/queue.svg" alt="" aria-hidden="true" />
            </button>
            <button type="button" className="spotify-icon-button" aria-label="Connect">
              <img src="/connect.svg" alt="" aria-hidden="true" />
            </button>
            <span className="spotify-volume-icon" aria-hidden="true">
              <img src={getVolumeIcon(volume)} alt="" aria-hidden="true" />
            </span>
            <div
              className="spotify-volume-slider"
              style={{ ["--volume" as string]: `${volume * 100}%` }}
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
            <button type="button" className="spotify-icon-button" aria-label="Mini player">
              <img src="/miniplayer.svg" alt="" aria-hidden="true" />
            </button>
            <button type="button" className="spotify-icon-button" aria-label="Fullscreen">
              <img src="/fullscreen.svg" alt="" aria-hidden="true" />
            </button>
          </div>
        </footer>
      </main>
    </div>
    </div>
  );
}
