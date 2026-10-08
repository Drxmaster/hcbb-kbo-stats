import Link from 'next/link';
import { ArrowRight, CalendarRange, ChevronRight, Trophy, Users } from 'lucide-react';
import { getLeagueData } from '@/lib/league-data';

export default function KboHomePage() {
  const data = getLeagueData();
  const topPlayers = [...data.players]
    .sort((a, b) => Number(b.battingAverage.replace('.', '')) - Number(a.battingAverage.replace('.', '')))
    .slice(0, 4);

  return (
    <>
      <header className="topbar">
        <div className="container navbar">
          <Link href="/KBO" className="brand">
            <span className="brand-mark">H</span>
            <span>HCBB KBO Stats</span>
          </Link>
          <nav className="nav-links" aria-label="Main navigation">
            <Link href="/KBO">Home</Link>
            <Link href="/KBO/schedule">Schedule</Link>
            <Link href="/KBO/teams">Teams</Link>
            <Link href="/KBO/standings">Standings</Link>
            <Link href="/KBO/players">Players</Link>
            <Link href="/KBO/statistics">Statistics</Link>
            <Link href="/KBO/news">News</Link>
            <Link href="/KBO/admin">Admin</Link>
          </nav>
          <Link href="/KBO/admin" className="button secondary">Admin</Link>
        </div>
      </header>

      <section className="hero-shell">
        <div className="hero-bg" />
        <div className="container hero-content">
          <div>
            <span className="eyebrow">Official HCBB Baseball Statistics</span>
            <h1>HCBB KBO STATS</h1>
            <p>Official HCBB Baseball Statistics</p>
            <div className="hero-actions">
              <Link href="/KBO/schedule" className="button primary">
                View Schedule <ArrowRight size={16} />
              </Link>
              <Link href="/KBO/standings" className="button secondary">
                Standings
              </Link>
            </div>
          </div>

          <div className="hero-panel">
            <div className="panel-header">
              <CalendarRange size={18} />
              <span>Upcoming Games</span>
            </div>
            {data.games.slice(0, 3).map((game) => (
              <div key={game.id} className="mini-game">
                <div className="mini-game-top">
                  <span>{game.date}</span>
                  <span>{game.status}</span>
                </div>
                <div className="mini-game-match">
                  <span>{game.away}</span>
                  <strong>@</strong>
                  <span>{game.home}</span>
                </div>
                <small>{game.stadium}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container section-space">
        <div className="section-head">
          <div>
            <span className="eyebrow">League Pulse</span>
            <h2>Upcoming games</h2>
          </div>
          <Link href="/KBO/schedule" className="text-link">See full schedule <ChevronRight size={16} /></Link>
        </div>
        <div className="card-grid three-up">
          {data.games.slice(0, 3).map((game) => (
            <div key={game.id} className="score-card">
              <div className="score-date-row">
                <span>{game.date}</span>
                <span>{game.time}</span>
              </div>
              <div className="team-row">
                <span>{game.away}</span>
                <strong>@</strong>
                <span>{game.home}</span>
              </div>
              <small>{game.stadium}</small>
              <div className="status-strip">{game.status}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container section-space">
        <div className="section-head">
          <div>
            <span className="eyebrow">Latest Results</span>
            <h2>Recent results</h2>
          </div>
        </div>
        <div className="card-grid three-up">
          {data.games.filter((game) => game.status === 'Final').slice(0, 3).map((game) => (
            <div key={game.id} className="score-card final-card">
              <div className="score-date-row">
                <span>{game.date}</span>
                <span>{game.time}</span>
              </div>
              <div className="final-score-row">
                <div>
                  <strong>{game.away}</strong>
                  <span>{game.awayScore}</span>
                </div>
                <span className="final-pill">Final</span>
                <div>
                  <strong>{game.home}</strong>
                  <span>{game.homeScore}</span>
                </div>
              </div>
              <small>{game.stadium}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="container section-space">
        <div className="section-head">
          <div>
            <span className="eyebrow">League Table</span>
            <h2>Current standings</h2>
          </div>
          <Link href="/KBO/standings" className="text-link">View full table <ChevronRight size={16} /></Link>
        </div>
        <div className="standings-box">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>GP</th>
                <th>W</th>
                <th>L</th>
                <th>PCT</th>
                <th>DIFF</th>
                <th>STRK</th>
              </tr>
            </thead>
            <tbody>
              {data.standings.slice(0, 5).map((team) => (
                <tr key={team.teamId}>
                  <td>{team.rank}</td>
                  <td>{team.team}</td>
                  <td>{team.gp}</td>
                  <td>{team.w}</td>
                  <td>{team.l}</td>
                  <td>{team.pct}</td>
                  <td>{team.diff}</td>
                  <td>{team.strk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="container section-space">
        <div className="section-head">
          <div>
            <span className="eyebrow">The Best</span>
            <h2>Top players</h2>
          </div>
          <Link href="/KBO/players" className="text-link">Player leaderboard <ChevronRight size={16} /></Link>
        </div>
        <div className="player-grid">
          {topPlayers.map((player) => (
            <Link href={`/KBO/players/${player.id}`} className="player-card" key={player.id}>
              <div className="player-avatar-wrap">
                <img src={player.avatar} alt={player.name} className="player-avatar" />
              </div>
              <h3>{player.name}</h3>
              <p>{player.team} • {player.position}</p>
              <div className="player-badges">
                <span>AVG {player.battingAverage}</span>
                <span>OPS {player.ops}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section-space">
        <div className="section-head">
          <div>
            <span className="eyebrow">League Leaders</span>
            <h2>Top performers</h2>
          </div>
        </div>
        <div className="leader-grid">
          <div className="leader-box">
            <Trophy size={18} />
            <h3>Batting Avg</h3>
            <p>{data.players[0].name} • {data.players[0].battingAverage}</p>
          </div>
          <div className="leader-box">
            <Users size={18} />
            <h3>Home Runs</h3>
            <p>{data.players[1].name} • {data.players[1].homeRuns}</p>
          </div>
          <div className="leader-box">
            <Trophy size={18} />
            <h3>Strikeouts</h3>
            <p>{data.players[2].name} • {data.players[2].pitching.strikeouts}</p>
          </div>
        </div>
      </section>

      <section className="container section-space bottom-space">
        <div className="section-head">
          <div>
            <span className="eyebrow">League Updates</span>
            <h2>Latest news</h2>
          </div>
          <Link href="/KBO/news" className="text-link">All news <ChevronRight size={16} /></Link>
        </div>
        <div className="news-grid">
          {data.news.slice(0, 3).map((article) => (
            <article key={article.id} className="news-card">
              <span className="news-tag">{article.category}</span>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <small>{article.date}</small>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <p>© 2026 HCBB KBO Stats</p>
          <p>Official HCBB Baseball Statistics</p>
        </div>
      </footer>
    </>
  );
}
