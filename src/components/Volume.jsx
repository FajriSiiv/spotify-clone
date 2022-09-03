import axios from "axios";
import React from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import swal from "sweetalert";
export default function Volume() {
  const [{ token }] = useStateProvider();

  const funVolume = async (e) => {
    try {
      await axios.put(
        `https://api.spotify.com/v1/me/player/volume`,
        {},
        {
          params: {
            volume_percent: parseInt(e.target.value),
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (err) {
      console.log("error volume");
    }
  };
  return (
    <Container>
      <input type="range" min={0} max={100} onMouseUp={(e) => funVolume(e)} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  input {
    width: 14rem;
    border-radius: 2rem;
    height: 0.2rem;
    background-color: #181818;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      background-color: red;
    }
  }
`;
