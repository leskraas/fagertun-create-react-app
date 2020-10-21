import React, {useEffect, useState} from 'react';
import sanityClient from "../client";
import {useParams} from 'react-router-dom';
import {IUserGuide, UserGuideStep} from "../types/userGuide";
import {urlFor} from "../utils/imageUrlBuilder";
import styled from "styled-components";

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
        <div>
            {userGuideData.title}
            {userGuideData.mainImage &&
            <ImageWrapper>
                <Image src={urlFor(userGuideData.mainImage).fit('min')
                    // .quality(60)
                    .height(300)
                    .url()} alt={'hei'}/>
            </ImageWrapper>
            }
            <ol>
                {
                    userGuideData.userGuideSteps &&
                    userGuideData.userGuideSteps.length > 0 &&
                    userGuideData.userGuideSteps.map((step: UserGuideStep, index: number) => {
                            return <li key={`user-guide-step-${index}`}>{step.step}</li>
                        }
                    )
                }
            </ol>
        </div>
    );
};


const ImageWrapper = styled.div`
  height: 300px;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
