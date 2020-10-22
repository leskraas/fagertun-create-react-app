import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../client";
import {Image} from "../types/userGuide";

const builder: SanityImageUrl = imageUrlBuilder(sanityClient);

export const urlFor = (image: Image): SanityImageUrl => {
    return builder.image(image).auto('format');
};
