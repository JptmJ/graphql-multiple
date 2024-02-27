import React, { useEffect, useState } from "react";
import axios from "axios";

function FirstMethod() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://graphql.anilist.co", {
          query: `
              {
                Page {
                  media {
                    title {
                      english
                    }
                    description
                  }
                }
              }
            `,
        });

        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Axios Data</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data ? (
        data.data.Page.media.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {data.data.Page.media.slice(0, 10).map((media, index) => (
                <tr key={index}>
                  <td>{media.title?.english || `No Title ${index}`}</td>
                  <td>{media?.description || "No Description"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available.</p>
        )
      ) : null}
    </div>
  );
}

export default FirstMethod;
