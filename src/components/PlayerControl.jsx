import React from "react";
import styled from "styled-components";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import {
  BsFillPauseCircleFill,
  BsFillPlayCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { FiRepeat } from "react-icons/fi";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import swal from "sweetalert";
export default function PlayerControl() {
  const [{ token, playerState }, dispatch] = useStateProvider();
  const changeTrack = async (type) => {
    try {
      await axios.post(
        `https://api.spotify.com/v1/me/player/${type}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (err) {
      swal({
        title: err.response.data.error.reason,
        text: err.response.data.error.message,
        icon: "error",
        button: "Sorry! 🗿",
      });
    }

    const res = await axios.put(
      `https://api.spotify.com/v1/me/player/currently-playing`,
      {},
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
    } else {
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
    }
  };

  const changeState = async () => {
    const state = playerState ? "pause" : "play";
    try {
      await axios.put(
        `https://api.spotify.com/v1/me/player/${state}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch({
        type: reducerCases.SET_PLAYER_STATE,
        playerState: !playerState,
      });
    } catch (err) {
      swal({
        title: err.response.data.error.reason,
        text: err.response.data.error.message,
        icon: "error",
        button: "Sorry! 🗿",
      });
    }
  };
  return (
    <Container>
      <div className="shuffle">
        <BsShuffle />
      </div>
      <div className="prev">
        <CgPlayTrackPrev onClick={() => changeTrack("previous")} />
      </div>
      <div className="state">
        {playerState ? (
          <BsFillPauseCircleFill onClick={changeState} />
        ) : (
          <BsFillPlayCircleFill onClick={changeState} />
        )}
      </div>
      <div className="next">
        <CgPlayTrackNext onClick={() => changeTrack("next")} />
      </div>
      <div className="repeat">
        <FiRepeat />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.3s all ease-in-out;
    &:hover {
      color: white;
    }
  }
  .state {
    svg {
      color: white;
    }
  }
  .prev,
  .state,
  .next {
    font-size: 2rem;
  }
`;
