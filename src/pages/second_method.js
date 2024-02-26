import { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request';

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
        }`;
                const response = await request('https://graphql.anilist.co', query);

                setData(response);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="App">
            <h1>Fetch Method</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.Page.media.map((media) => (
                            <tr key={media.title?.english || "Unknown"}>
                                <td>{media.title?.english || "Unknown"}</td>
                                <td>{media.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default SecondMethod;
