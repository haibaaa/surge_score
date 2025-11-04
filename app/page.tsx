"use client";

import React, { useState, useEffect } from "react";
import { fetchSports, fetchScoresBySport } from "@/lib/api";
import "./page.css";
import Image from "next/image";

// --------------------- CHILD COMPONENTS ---------------------

function Navbar() {
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
        <button className="navbar-button">
          All Matches
        </button>
      </div>
    </nav>
  );
}

function SportsNav({ sports, activeSport, onSelectSport, isLoading }) {
  if (isLoading) {
    return (
      <div className="mb-8 flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-12 w-28 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"
          ></div>
        ))}
      </div>
    );
  }

  return (
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
  );
}

function ScoreboardTable({ scores, sportName, isLoading }) {
  return (
    <div className="scoreboard-container">
      <div className="scoreboard-header">
        <h2 className="scoreboard-title">
          {sportName ? sportName.toUpperCase() : "SELECT A SPORT"}
        </h2>
        <p className="scoreboard-subtitle"></p>
      </div>

      <div className="overflow-x-auto">
        <table className="scoreboard-table">
          <thead>
            <tr>
              <th>DATE</th>
              <th>COMPETING</th>
              <th className="text-right">WINNER</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3}>
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
                <tr key={match.id}>
                  <td className="date-cell">{match.date}</td>
                  <td>
                    <div className="match-info">
                      <span className="team-name">{match.team1}</span>
                      <span className="vs-text">vs</span>
                      <span className="team-name">{match.team2}</span>
                    </div>
                  </td>
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
                <td colSpan={3}>
                  <p className="empty-state">
                    No results available for {sportName} yet.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
    if (!selectedSport) return;

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
  }, [selectedSport]);

  return (
    <div className="page-container">
      <Navbar />
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

        {/* Sports Nav */}
        <SportsNav
          sports={sportsList}
          activeSport={selectedSport}
          onSelectSport={setSelectedSport}
          isLoading={isLoadingSports}
        />

        {/* Scoreboard */}
        <ScoreboardTable
          scores={scores}
          sportName={selectedSport}
          isLoading={isLoadingScores}
        />
      </div>
    </div>
  );
}
