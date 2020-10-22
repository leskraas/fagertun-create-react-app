import React, {useEffect, useState} from 'react';
import Loader from 'react-loader-spinner'
import sanityClient from "../client";
import {useParams} from 'react-router-dom';
import {IUserGuide, UserGuideStep} from "../types/userGuide";
import {urlFor} from "../utils/imageUrlBuilder";
import styled from "styled-components";
import {Typography} from "@material-ui/core";
import {MainMargin} from "../utils/dimentions";
import {colors} from "../utils/colors";

interface ImageSize {
    imageHeight: number | undefined;
    imageWidth: number | undefined;
}

export const OneUserGuide: React.FC = () => {
    const [userGuideData, setUserGuideData] = useState<IUserGuide>();
    // const [imageSize, setImageSize] = useState<ImageSize>({imageHeight: undefined, imageWidth: undefined});
    // const imageRef = useRef<HTMLDivElement>(null);

    const {slug} = useParams();

    // useEffect(() => {
    //     console.log('imageRef', imageRef.current);
    //     if (imageRef.current) {
    //         const {offsetHeight, offsetWidth} = imageRef.current;
    //         setImageSize({
    //             imageWidth: offsetWidth > 0 ? offsetWidth : 375,
    //             imageHeight: offsetHeight > 0 ? offsetHeight : 400
    //         });
    //     }
    // }, [imageRef]);

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "userGuide" && slug.current == $slug]{
            title,
            slug,
            mainImage{
                asset->{
                    _id,
                    url
                }
            },
            userGuideSteps[]{
                step,
                image{
                    asset->{
                        _id,
                        url
                    }
                }
            }
         }[0]
         `
            , {slug})
            .then((data) => setUserGuideData(data))
            .catch(console.error);

    }, [slug]);
    return (
        <>
            <Typography gutterBottom variant="h1" component="h1">
                {userGuideData?.title}
            </Typography>
            {userGuideData?.mainImage &&
            <ImageWrapper>
                <Image src={urlFor(userGuideData.mainImage).fit('min')
                    .quality(70)
                    .url()}/>
            </ImageWrapper>
            }
            <GuideSteps>
                {
                    userGuideData?.userGuideSteps &&
                    userGuideData.userGuideSteps.length > 0 &&
                    userGuideData.userGuideSteps.map((step: UserGuideStep, index: number) => {
                            return (
                                <li key={`user-guide-step-${index}`}>
                                    <Typography component="p">
                                        {step.step}
                                    </Typography>
                                    {step.image && <StepImage src={urlFor(step.image).fit('min')
                                        .width(400).height(250)
                                        .url()} alt={'hei'}/>}
                                </li>
                            );
                        }
                    )
                }
            </GuideSteps>
        </>
    );
};

const ImageWrapper = styled.div`
  height: 300px;
  width: 100vw;
  margin: 0 -${MainMargin};
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const StepImage = styled.img`
  width: 100%;
  max-height: 250px;
  max-width: 400px;
  object-fit: cover;
  margin-top: 2rem;
  border-radius: .5em;
`;

const GuideSteps = styled.ol`
  list-style: none;
  padding-bottom: 2rem;
  max-width: 500px;
  margin: 0 auto;
  
  li {
        background: ${colors.iconCore};
        color: #fff;
        counter-increment: myCounter;
        margin: 0 0 1.5em 0;
        padding: 1rem 1rem 1rem 3rem;
        position: relative;
        top: 1em;
        font-size: 1.6rem;
        border-radius: 1em;
        box-shadow: 5px 5px 10px 0 ${colors.shadowCore};
  }
  li:before{
        content: counter(myCounter, decimal-leading-zero);
        text-align: center;
        font-size: 2.5rem;
        height: 3rem;
        width: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${colors.iconCore};
        padding: 10px;
        font-weight: bold;
        position: absolute; 
        top: 0;
        left: -3rem;
        border-radius: 50%;
        box-shadow: 5px 5px 10px 0 ${colors.shadowCore};
    }
     li:nth-child(even){
        background-color: ${colors.iconSecondary};
    }
`;
