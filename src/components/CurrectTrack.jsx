import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";

export default function CurrectTrack() {
  const [{ token, currentPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    const getCurrectTrack = async () => {
      const res = await axios.get(
        `https://api.spotify.com/v1/me/player/currently-playing/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.data !== "") {
        const { item } = res.data;
        const currentPlaying = {
          id: item.id,
          name: item.name,
          artists: item.artists.map((artist) => artist.name),
          image: item.album.images[2].url,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      }
    };

    getCurrectTrack();
  }, [token, dispatch]);

  return (
    <Container>
      {currentPlaying && (
        <div className="track">
          <div className="track_image">
            <img src={currentPlaying.image} alt="currentplay" />
          </div>
          <div className="track_info">
            <h4>{currentPlaying.name}</h4>
            <h5>{currentPlaying.artists.join(", ")}</h5>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &_info {
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 0.3rem;
      h4 {
        color: white;
      }
      h5 {
        color: #b3b3b3;
      }
    }
  }
  @media (max-width: 600px) {
    width: 100%;

    .track {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
    }
  }
`;
