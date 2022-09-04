import React from "react";
import { BiLogOut, BiSearch, BiUserCircle } from "react-icons/bi";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import swal from "sweetalert";

export default function Navbar({ navBackground }) {
  const [{ userInfo }] = useStateProvider();

  const logoutClick = () => {
    swal({
      title: "Thanks for coming here!",
      text: "Remove access `Spotify Clone` in your account.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("You need remove access `SpotifyClone`", {
          icon: "warning",
        }).then(() => {
          window.location = "https://www.spotify.com/id/account/apps/";
        });
      } else {
        swal("It's fine if you won't remove access, pretty sure no problem");
      }
    });
  };

  return (
    <Container navBackground={navBackground}>
      <div className="search_bar">
        <BiSearch />
        <input type="text" placeholder="Artists, songs, or podcasts" />
      </div>
      <div className="avatar">
        <span className="ava">
          <BiUserCircle />
          <span>{userInfo?.userName}</span>
        </span>
        <div onClick={logoutClick}>
          Logout <BiLogOut />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 100px;
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
    cursor: pointer;
    gap: 2rem;

    div {
      text-decoration: none;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      text-transform: uppercase;
      svg {
        font-size: 1.2rem;
      }
    }
    span {
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
  @media (max-width: 600px) {
    padding: 1rem 0.5rem;
    flex-direction: column;
    gap: 0.5rem;
    .search_bar {
      width: 80%;
      padding: 0.1rem 1rem;
      input {
        height: 1.5rem;
      }
    }
    .avatar {
      span {
        font-size: 0.6rem;
      }
      div {
        font-size: 0.6rem;
        svg {
          font-size: 0.9rem;
        }
      }
    }
  }
`;
