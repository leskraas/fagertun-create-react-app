import React from 'react';
// import {useParams} from "react-router-dom";
// import sanityClient from "../client";
// import groq from 'groq';
//
//
// const pageQuery = groq`
// *[_type == "route" && slug.current == $slug][0]{
//   page-> {
//     ...,
//     content[] {
//       ...,
//       cta {
//         ...,
//         route->
//       },
//       ctas[] {
//         ...,
//         route->
//       }
//     }
//   }
// }
// `
//
//
export const Page: React.FC = () => {
//     const {slug} = useParams();
//
//     if (slug && slug !== '/') {
//         return sanityClient.fetch(pageQuery, {slug}).then(res => ({...res.page, slug}))
//     }
//
    return (
        <div>

        </div>
    );
};
