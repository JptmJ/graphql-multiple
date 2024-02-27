import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_MEDIA = gql`
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

function ThirdMethod() {
  const { loading, error, data } = useQuery(GET_MEDIA);

  return (
    <div>
      <h1>Apollo Method</h1>
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
                  <td>{media.title?.english || "Unknown"}</td>
                  <td>{media.description}</td>
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

export default ThirdMethod;
