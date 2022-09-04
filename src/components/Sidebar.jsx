import React from "react";
import styled from "styled-components";
import { IoMdHome, IoMdSearch } from "react-icons/io";
import { BiLibrary } from "react-icons/bi";
import Playlist from "./Playlist";

const Container = styled.div`
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .top__links {
    display: flex;
    flex-direction: column;

    .logo {
      text-align: center;
      margin: 1rem 0;
      img {
        max-inline-size: 80%;
        block-size: auto;
      }
    }
    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      li {
        gap: 1rem;
        display: flex;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        &:hover {
          color: white;
        }
      }
    }
    @media (max-width: 600px) {
      position: absolute;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100vh;
      background-color: black;
      z-index: 9;
      transform: translateX(-100%);
      .logo {
        text-align: left;
        padding: 16px;
        img {
          width: 100px;
          height: 30px;
        }
      }
    }
  }
`;

export default function Sidebar() {
  return (
    <Container>
      <div className="top__links">
        <div className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
            alt="logo spotify"
          />
        </div>
        <ul>
          <li>
            <IoMdHome />
            <span>Home</span>
          </li>
          <li>
            <IoMdSearch />
            <span>Search</span>
          </li>
          <li>
            <BiLibrary />
            <span>Your Library</span>
          </li>
        </ul>
      </div>
      <Playlist />
    </Container>
  );
}
