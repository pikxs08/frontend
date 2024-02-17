import { set } from "lodash";
import React, { useEffect, useState, useRef } from "react";

function Search() {
  const [search, setSearch] = useState("");
  const [mediaType, setMediaType] = useState("all"); // ["all", "music", "movie", "tvShow"]
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchTerm = useRef(null);

  useEffect(() => {
    console.log("Results: ", results);
  }, [results]);

  async function fetchResults() {
    try {
      let response = "";
      if (mediaType === "all") {
        response = await fetch(
          `https://itunes.apple.com/search?term=${search}`
        );
      } else {
        response = await fetch(
          `https://itunes.apple.com/search?term=${search}&media=${mediaType}`
        );
      }
      const data = await response.json();

      setResults(data.results);
      console.log(results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetchResults();
    // Clear inputs after search
    setSearch("");
    searchTerm.current = search;
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="radio-cont">
          <label>
            <input
              type="radio"
              value="all"
              checked={mediaType === "all"}
              onChange={() => setMediaType("all")}
            />
            all
          </label>
          <label>
            <input
              type="radio"
              value="music"
              checked={mediaType === "music"}
              onChange={() => setMediaType("music")}
            />
            music
          </label>
          <label>
            <input
              type="radio"
              value="movie"
              checked={mediaType === "movie"}
              onChange={() => setMediaType("movie")}
            />
            movie
          </label>
          <label>
            <input
              type="radio"
              value="tvShow"
              checked={mediaType === "tvShow"}
              onChange={() => setMediaType("tvShow")}
            />
            tv show
          </label>
          <label>
            <input
              type="radio"
              value="ebook"
              checked={mediaType === "ebook"}
              onChange={() => setMediaType("ebook")}
            />
            ebook
          </label>
          <label>
            <input
              type="radio"
              value="podcast"
              checked={mediaType === "podcast"}
              onChange={() => setMediaType("podcast")}
            />
            podcast
          </label>
          <label>
            <input
              type="radio"
              value="shortFilm"
              checked={mediaType === "shortFilm"}
              onChange={() => setMediaType("shortFilm")}
            />
            shortFilm
          </label>
          <label>
            <input
              type="radio"
              value="software"
              checked={mediaType === "software"}
              onChange={() => setMediaType("software")}
            />
            software
          </label>
          <label>
            <input
              type="radio"
              value="musicVideo"
              checked={mediaType === "musicVideo"}
              onChange={() => setMediaType("musicVideo")}
            />
            music video
          </label>
        </div>
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      <p>Number of results: {results.length}</p>
      <ul className="results-cont">
        {searchTerm.current === null && !loading ? (
          <li>Search something above...</li>
        ) : results !== undefined && results.length !== 0 ? (
          results.map((result) => (
            <li key={result.trackId + 1} className="card-cont">
              <img
                className="card-img"
                src={result.artworkUrl100}
                alt={result.collectionName || result.trackName}
              />
              <div className="card-body">
                <p>
                  <strong>{result.collectionName || result.trackName}</strong>
                </p>
                <p>{result.artistName}</p>
              </div>
            </li>
          ))
        ) : searchTerm.current === "" ? (
          <li>Please type in a valid search term...</li>
        ) : (
          <li>
            no search result found for "<strong>{searchTerm.current}...</strong>
            "
          </li>
        )}
      </ul>
    </div>
  );
}

export default Search;
