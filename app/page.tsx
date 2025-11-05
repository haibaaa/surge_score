"use client";

import React, { useState, useEffect } from "react";
import { fetchSports, fetchScoresBySport, fetchAllScores } from "@/lib/api";
import "./page.css";
import Image from "next/image";

// --------------------- CHILD COMPONENTS ---------------------

function Navbar({ onAllMatchesClick, isAllMatchesActive, onHomeClick }) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <Image
            src="/image.png"
            alt="Surge Logo"
            width={230}
            height={40}
            className="logo-image"
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button 
            className="navbar-button navbar-button-small"
            onClick={onHomeClick}
            aria-label="Go to Home"
          >
            Home
          </button>
          <button 
            className={`navbar-button ${isAllMatchesActive ? 'navbar-button-active' : ''}`}
            onClick={onAllMatchesClick}
          >
            All Matches
          </button>
        </div>
      </div>
    </nav>
  );
}

function SportsNav({ sports, activeSport, onSelectSport, isLoading }) {
  if (isLoading) {
    return (
      <>
        <div className="mb-8 flex gap-3 overflow-x-auto pb-4 scrollbar-hide sports-nav-loading">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-12 w-28 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"
            ></div>
          ))}
        </div>
        <div className="sports-dropdown-loading">
          <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </>
    );
  }

  const handleDropdownChange = (e) => {
    onSelectSport(e.target.value);
  };

  return (
    <>
      {/* Desktop: Button Navigation */}
      <div className="sports-nav">
        {sports.map((sport) => (
          <button
            key={sport}
            onClick={() => onSelectSport(sport)}
            className={`sport-button ${
              activeSport === sport
                ? "sport-button-active"
                : "sport-button-inactive"
            }`}
          >
            {sport.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Mobile: Dropdown Navigation */}
      <div className="sports-dropdown">
        <select
          value={activeSport || ""}
          onChange={handleDropdownChange}
          className="sports-select"
        >
          {sports.map((sport) => (
            <option key={sport} value={sport}>
              {sport.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

function ScoreboardTable({ scores, sportName, isLoading, showAllMatches }) {
  return (
    <div className="scoreboard-container">
      <div className="scoreboard-header">
        <h2 className="scoreboard-title">
          {showAllMatches ? "ALL MATCHES" : (sportName ? sportName.toUpperCase() : "SELECT A SPORT")}
        </h2>
        <p className="scoreboard-subtitle"></p>
      </div>

      {/* Desktop Table View */}
      <div className="scoreboard-table-wrapper">
        <table className="scoreboard-table">
          <thead>
            <tr>
              <th>DATE</th>
              <th>COMPETING</th>
              <th>MATCH TYPE</th>
              <th>POINTS</th>
              <th className="text-right">WINNER</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5}>
                  <div className="loading-container">
                    <svg
                      className="loading-spinner"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth={4}
                        fill="none"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <p className="loading-text">Loading results...</p>
                  </div>
                </td>
              </tr>
            ) : scores.length > 0 ? (
              scores.map((match) => (
                <tr key={showAllMatches ? `${match.sport}-${match.id}` : match.id}>
                  <td className="date-cell">{match.date}</td>
                  <td>
                    <div className="match-info">
                      {showAllMatches && match.sport && (
                        <span className="sport-badge">{match.sport}</span>
                      )}
                      <span className="team-name">{match.team1}</span>
                      <span className="vs-text">vs</span>
                      <span className="team-name">{match.team2}</span>
                    </div>
                  </td>
                  <td>{match.matchType}</td>
                  <td>{match.points}</td>
                  <td className="text-right">
                    <span
                      className={`winner-badge ${
                        match.winner === "Draw"
                          ? "winner-badge-draw"
                          : "winner-badge-win"
                      }`}
                    >
                      {match.winner}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>
                  <p className="empty-state">
                    {showAllMatches ? "No matches available yet." : `No results available for ${sportName} yet.`}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="scoreboard-cards">
        {isLoading ? (
          <div className="loading-container">
            <svg
              className="loading-spinner"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth={4}
                fill="none"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="loading-text">Loading results...</p>
          </div>
        ) : scores.length > 0 ? (
          scores.map((match) => (
            <div key={showAllMatches ? `${match.sport}-${match.id}` : match.id} className="score-card">
              <div className="score-card-header">
                <div className="score-card-date">
                  <span>{match.date}</span>
                  <span
                    className={`winner-badge ${
                      match.winner === "Draw"
                        ? "winner-badge-draw"
                        : "winner-badge-win"
                    }`}
                  >
                    {match.winner}
                  </span>
                </div>
              </div>
              <div className="score-card-body">
                {showAllMatches && match.sport && (
                  <div className="score-card-sport">
                    <span className="sport-badge">{match.sport}</span>
                  </div>
                )}
                <div className="score-card-teams">
                  <span className="team-name">{match.team1}</span>
                  <span className="vs-text">vs</span>
                  <span className="team-name">{match.team2}</span>
                </div>
                <div className="score-card-details">
                  <div className="score-card-detail-item">
                    <span className="score-card-label">Match Type:</span>
                    <span className="score-card-value">{match.matchType}</span>
                  </div>
                  <div className="score-card-detail-item">
                    <span className="score-card-label">Points:</span>
                    <span className="score-card-value score-card-points">{match.points}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-state">
            {showAllMatches ? "No matches available yet." : `No results available for ${sportName} yet.`}
          </p>
        )}
      </div>
    </div>
  );
}

// --------------------- MAIN PAGE ---------------------

export default function HomePage() {
  const [sportsList, setSportsList] = useState([]);
  const [scores, setScores] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [isLoadingSports, setIsLoadingSports] = useState(true);
  const [isLoadingScores, setIsLoadingScores] = useState(false);
  const [error, setError] = useState(null);
  const [showAllMatches, setShowAllMatches] = useState(false);

  useEffect(() => {
    const loadSports = async () => {
      try {
        const sports = await fetchSports();
        setSportsList(sports);
        if (sports.length > 0) setSelectedSport(sports[0]);
      } catch (err) {
        setError("Failed to load sports. Please refresh.");
        console.error(err);
      } finally {
        setIsLoadingSports(false);
      }
    };
    loadSports();
  }, []);

  useEffect(() => {
    if (showAllMatches) {
      const loadAllScores = async () => {
        setIsLoadingScores(true);
        setError(null);
        try {
          const data = await fetchAllScores();
          setScores(data);
        } catch (err) {
          setError("Failed to load all matches.");
          setScores([]);
          console.error(err);
        } finally {
          setIsLoadingScores(false);
        }
      };
      loadAllScores();
    } else if (selectedSport) {
      const loadScores = async () => {
        setIsLoadingScores(true);
        setError(null);
        try {
          const data = await fetchScoresBySport(selectedSport);
          setScores(data);
        } catch (err) {
          setError(`Failed to load scores for ${selectedSport}.`);
          setScores([]);
          console.error(err);
        } finally {
          setIsLoadingScores(false);
        }
      };
      loadScores();
    }
  }, [selectedSport, showAllMatches]);

  const handleAllMatchesClick = () => {
    setShowAllMatches(true);
    setSelectedSport(null);
  };

  const handleSportSelect = (sport) => {
    setShowAllMatches(false);
    setSelectedSport(sport);
  };

  const handleHomeClick = () => {
    setShowAllMatches(false);
    // if there's no selected sport yet, default to first sport when available
    if (!selectedSport && sportsList && sportsList.length > 0) {
      setSelectedSport(sportsList[0]);
    }
  };

  return (
    <div className="page-container">
      <Navbar 
        onAllMatchesClick={handleAllMatchesClick}
        isAllMatchesActive={showAllMatches}
        onHomeClick={handleHomeClick}
      />
      <div className="page-content">
        {/* Hero Header */}
        <div className="hero-header">
          <h1 className="hero-title">
            Scoreboard
          </h1>
        
        </div>

        {/* Error */}
        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Sports Nav - Hide when showing all matches */}
        {!showAllMatches && (
          <SportsNav
            sports={sportsList}
            activeSport={selectedSport}
            onSelectSport={handleSportSelect}
            isLoading={isLoadingSports}
          />
        )}

        {/* Scoreboard */}
        <ScoreboardTable
          scores={scores}
          sportName={selectedSport}
          isLoading={isLoadingScores}
          showAllMatches={showAllMatches}
        />
      </div>
    </div>
  );
}
