import React from "react";
import { BiSearch, BiUserCircle } from "react-icons/bi";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";

export default function Navbar({ navBackground }) {
  const [{ userInfo }] = useStateProvider();
  return (
    <Container navBackground={navBackground}>
      <div className="search_bar">
        <BiSearch />
        <input type="text" placeholder="Artists, songs, or podcasts" />
      </div>
      <div className="avatar">
        <a href="#">
          <BiUserCircle />
          <span>{userInfo?.userName}</span>
        </a>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 68px;
  position: sticky;
  top: 0;
  transition: all 0.3s ease-in-out;
  background-color: ${({ navBackground }) =>
    navBackground ? "rgba(0,0,0,0.7)" : "none"};
  .search_bar {
    background-color: #fff;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      border: none;
      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .avatar {
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        color: #c7c5c5;
        border-radius: 1rem;
      }
    }
  }
`;
