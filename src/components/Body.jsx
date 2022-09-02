import React, { useEffect } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { FiClock } from "react-icons/fi";

export default function Body({ headerBackground }) {
  const [{ token, selectedList, selectedPlaylist }, dispatch] =
    useStateProvider();

  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedList}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        desc: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2],
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      console.log(response);
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
      console.log(selectedList.tracks[0].items[0].track.name);
    };
    getInitialPlaylist();
  }, [token, dispatch, selectedList]);

  const msToMinutesSecond = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);

    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <Container headerBackground={headerBackground}>
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} alt={selectedPlaylist.name} />
            </div>
            <div className="details">
              <span className="type">Playlist</span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header_row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>Title</span>
              </div>
              <div className="col">
                <span>Album</span>
              </div>
              <div className="col">
                <span>
                  <FiClock />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    album,
                    duration,
                    context,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div className="row" key={id}>
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="image">
                          <img src={image.url} alt={name} />
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span>{artists}</span>
                        </div>
                      </div>

                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>{msToMinutesSecond(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.7) 0px 25px 50px -12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 4rem;
      }
    }
  }

  .list {
    .header_row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      color: #dddcdc;
      margin: 1rem 0 0 0;
      position: sticky;
      top: 100px;
      padding: 1rem 3rem;
      transition: all 0.3s ease-in-out;
      background-color: ${({ headerBackground }) =>
        headerBackground ? "#121212" : "none"};
    }
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 10rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          img {
            height: 40px;
          }
        }
        .detail {
          display: flex;
          gap: 1rem;
          .info {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
`;
