import React from "react";
import styled from "styled-components";
import CurrectTrack from "./CurrectTrack";
import PlayerControl from "./PlayerControl";
import Volume from "./Volume";

export default function Footer() {
  return (
    <Container>
      <CurrectTrack />
      <PlayerControl />
      <Volume />
    </Container>
  );
}

const Container = styled.div`
  background-color: #181818;
  height: 100%;
  width: 100%;
  border-top: 1px solid #282828;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  @media (max-width: 600px) {
    grid-template-columns: none;
    display: flex;
  }
`;
