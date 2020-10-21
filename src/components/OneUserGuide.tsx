import React, {useEffect, useState} from 'react';
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
                    assets->{
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

    // const {imageHeight, imageWidth} = imageSize;

    if (!userGuideData) return <div>loading</div>

    return (
        <>
            <Typography gutterBottom variant="h2" component="h1">
                {userGuideData.title}
            </Typography>
            {userGuideData.mainImage &&
            <ImageWrapper>
                <Image src={urlFor(userGuideData.mainImage).fit('min')
                    // .quality(60)
                    .height(300)
                    .url()} alt={'hei'}/>
            </ImageWrapper>
            }
            <GuideSteps>
                {
                    userGuideData.userGuideSteps &&
                    userGuideData.userGuideSteps.length > 0 &&
                    userGuideData.userGuideSteps.map((step: UserGuideStep, index: number) => {
                            return <li key={`user-guide-step-${index}`}>{step.step}</li>
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

const GuideSteps = styled.ol`
  position: absolute;
  list-style: none;
  
  li {
        background: ${colors.iconCore};
        color: #fff;
        counter-increment: myCounter;
        margin: 0 0 3rem 0;
        padding: 1rem 1rem 1rem 3rem;
        position: relative;
        top: 1em;
        border-radius: 1em;
        box-shadow: 5px 5px 10px 0 ${colors.grey900Transparent};
  }
  li:before{
        content: counter(myCounter, decimal-leading-zero);
        text-align: center;
        font-size: 3rem;
        height: 4rem;
        width: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${colors.iconCore};
        padding: 10px;
        font-weight: bold;
        position: absolute; 
        top: 0;
        left: -40px;
        border-radius: 50%;
        box-shadow: 5px 5px 10px 0 ${colors.grey900Transparent};
    }
     li:nth-child(even){
        background-color: ${colors.iconSecondary};
    }
`;
