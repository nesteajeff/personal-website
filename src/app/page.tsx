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
  return (
    <div className="spotify-shell">
      <aside className="spotify-sidebar">
        <div className="spotify-brand">Portfolio</div>
        <nav>
          <a href="/" aria-current="page">
            Home
          </a>
          <a href="/experience">Experience</a>
          <a href="/projects">Projects</a>
        </nav>
      </aside>

      <main className="spotify-content spotify-content-immersive spotify-has-bars">
        <div className="spotify-topbar spotify-fixed-top">
          <a className="spotify-top-logo" href="/" aria-label="Home">
            <img src="/jeffrey.png" alt="Jeffrey Peng" />
          </a>
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
          <div>
            <h1>Jeffrey Peng</h1>
            <p className="spotify-lede">
              Data Scientist
            </p>
          </div>
          <div className="spotify-contact-block">
            <p>Toronto, ON</p>
            <p>Open to Summer 2026</p>
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
        </header>

        <section className="spotify-section">
          <h2 className="spotify-section-title">Playlists</h2>
          <div className="spotify-playlists">
            <a className="spotify-playlist-card" href="/experience">
              <div>
                <h3>Experience</h3>
                <p>3 tracks</p>
              </div>
              <span className="spotify-play">Play</span>
            </a>
            <a className="spotify-playlist-card" href="/projects">
              <div>
                <h3>Projects</h3>
                <p>2 tracks</p>
              </div>
              <span className="spotify-play">Play</span>
            </a>
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
            <p>Open to Summer 2026 · Let&apos;s connect.</p>
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
            <div className="spotify-now-cover">
              <img src="/jeffrey.png" alt="Jeffrey Peng" />
            </div>
            <div>
              <p className="spotify-now-title">Now playing</p>
              <p className="spotify-now-sub">Sleepy Fish, Philanthrope</p>
            </div>
            <span className="spotify-now-check" aria-hidden="true">
              ✓
            </span>
          </div>
          <div className="spotify-now-center">
            <div className="spotify-now-controls">
              <button type="button" aria-label="Shuffle" className="spotify-icon-button">
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
              <button type="button" aria-label="Previous" className="spotify-icon-button">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 5v14M20 6l-10 6 10 6z" fill="currentColor" />
                </svg>
              </button>
              <button type="button" className="spotify-now-play-circle">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 6l10 6-10 6z" fill="currentColor" />
                </svg>
              </button>
              <button type="button" aria-label="Next" className="spotify-icon-button">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18 5v14M4 6l10 6-10 6z" fill="currentColor" />
                </svg>
              </button>
              <button type="button" aria-label="Loop" className="spotify-icon-button">
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
              <span>0:00</span>
              <div className="spotify-progress-bar" />
              <span>2:34</span>
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
              value={0.6}
              className="spotify-volume-range"
              aria-label="Volume"
              style={{ ["--volume" as string]: "60%" }}
              readOnly
            />
          </div>
        </footer>
      </main>
    </div>
  );
}
