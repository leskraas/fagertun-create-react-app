import React, {useEffect, useState} from 'react';
import sanityClient from "../client";
import {IUserGuide} from "../types/userGuide";
import {Card} from "./Card";
import {urlFor} from "../utils/imageUrlBuilder";
import {Grid, Typography} from '@material-ui/core';
import styled from "styled-components";


export const AllUserGuide: React.FC = () => {
    const [allGuideData, setAllGuideDate] = useState<IUserGuide[]>([]);

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "userGuide"]{
                        title,
                        slug,
                        description,
                         mainImage{
                            asset->{
                                _id,
                                url
                            }
                        },
                     }
         `
        )
            .then((data) => setAllGuideDate(data))
            .catch(console.error);

    }, [])
    return (
        <>
            <Typography gutterBottom variant="h3" component="h1">
                Brukermanualer
            </Typography>
                <StyledGrid container spacing={3}>
                    {allGuideData.length > 0 &&
                    allGuideData.map(
                        (userGuide: IUserGuide, index: number) =>
                            <Grid key={`userGuide-${index}`} item xs={"auto"}>
                                <Card title={userGuide.title}
                                      description={userGuide.description}
                                      image={urlFor(userGuide.mainImage).fit('min')
                                          .height(400).url()}
                                      slug={`/brukermanual/${userGuide.slug.current}`}
                                />
                            </Grid>
                    )}
                </StyledGrid>
        </>
    );
};


const StyledGrid = styled(Grid)`
  //align-content: center;
  //justify-content: center;
`;
