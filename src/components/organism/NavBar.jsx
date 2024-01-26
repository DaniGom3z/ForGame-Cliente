import React,{useState} from "react";
import BurgerButton from "./BurgerButton";
import styled from "styled-components";

function NavBar (){
  const[clicked,setCliked] =useState(false)
  const handleClick=()=>{
    setCliked(!clicked)
  }
  return (
    <NavContainer className=" bg-nav flex justify-between items-center mb-8 h-16 pl-16 pr-16">
      <h2 className=" text-2xl font-semibold">FORGAME</h2>
      <div className={`links ${clicked ? 'active' : ''}`}>
        <a href="/">Inicio</a>
        <a href="/chat">Chat global</a>
        <a href="/chatFortnite">Chat Fornite</a>
        <a href="/login">Iniciar</a>
      </div>
      <div className=' md:hidden z-10'>
      <BurgerButton clicked={clicked} handleClick={handleClick} />
      </div>
      <BgDiv className={`initial ${clicked ? 'active' : ''}`}></BgDiv>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
z-index:2;
  h2{
    color: white;
    font-size: 24px;
    line-height: 2rem;
    font-family: Acme;
    z-index:2;
  }
  a{
    color: white;
    text-decoration: none;
    margin-right:1rem;
    font-family: Acme;
  }

  .links {
    position: absolute;
    top: -1000px;
    left: 0px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    transition: all .5s ease; 
    a{
      color: white;
      display: block;
    }
    
    @media (min-width: 768px){
      position: initial;
      margin: 0;
      a{
        color: white;
        display: inline;
        &:hover{
          color: #000;
        }
      }
    }
  }
  .links.active {
    z-index:2;
    width: 30%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 30%;
    left: 0;
    right: 0;
    text-align: center;
    a{
      font-size: 2rem;
      color: white;
      &:hover{
        color: #000;
      }
    }
  }

`;


export default NavBar;

const BgDiv = styled.div`
background-color: #4F2EE6;
position: absolute;
top: -1000px;
left: 0px;
width: 100%;
height: 100%;
z-index: 1;
transition: all .6s ease; 
&.active{
  border-radius:0 0 0 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

`