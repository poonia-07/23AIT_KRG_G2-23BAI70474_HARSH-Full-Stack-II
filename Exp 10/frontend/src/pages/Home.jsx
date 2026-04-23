import { useState } from "react";
import UrlForm from "../components/UrlForm";
import ResultBox from "../components/ResultBox";
import { shortenUrl } from "../services/api";

const Home = () => {
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async (longUrl) => {
    try {
      setError("");
      setLoading(true);
      const res = await shortenUrl(longUrl);
      setShortUrl(`http://localhost:8080/${res.data.shortUrl}`);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Failed to shorten URL");
    }
    } finally {
      setLoading(false);  
    }
  };

  return (
    <div className="container">
      <h1 className="title">URL Shortener</h1>

      <UrlForm onShorten={handleShorten} />

      {loading && <p className="loading">Shortening...</p>}
      {error && <p className="error">{error}</p>}
      {shortUrl && <ResultBox shortUrl={shortUrl} />}
    </div>
  );
};

export default Home;
