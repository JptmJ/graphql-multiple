import React, { useEffect, useState } from "react";
import { request, gql } from "graphql-request";

function SecondMethod() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = gql`
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
        `;
        const response = await request("https://graphql.anilist.co", query);

        setData(response);
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
      <h1>Fetch Data</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data ? (
        data.Page.media.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {data.Page.media.slice(0, 10).map((media, index) => (
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

export default SecondMethod;
