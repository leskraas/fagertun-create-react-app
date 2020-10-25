import React from 'react';
import {IHero} from "../types/sanity";
import {Typography} from "@material-ui/core";
import styled from "styled-components";
import {MainMargin} from "../utils/dimentions";
import {SanityImage} from "../utils/SanityImage";

export const Hero: React.FC<IHero> = (content) => {
    return (
        <HeroWrapper>
            <StyledTypography variant="h1">{content.heading}</StyledTypography>
            <ImageWrapper>
                <Image image={content.backgroundImage}/>
            </ImageWrapper>
        </HeroWrapper>
    );
};


const HeroWrapper = styled.div`
  position: relative;
`;


const StyledTypography = styled(Typography)`
  && {
      color: white;
      top: 1rem;
      position: absolute;
      z-index: 1;
  }
`;

const ImageWrapper = styled.div`
  height: 300px;
  width: 100vw;
  margin: -${MainMargin} -${MainMargin} 2rem;
  position: relative;
  &::after{
    content: ' ';
    position: absolute;
    width: 100%; height:100%;
    top:0; left:0;
    background:rgba(0,0,0,0.6);
  }
`;

const Image = styled(SanityImage)`
  height: 100%;
  width: 100%;
  object-fit: cover;

`;
