export interface Slug {
    _type: 'slug';
    current: string;
}

export interface UserGuideStep {
    step: string,
    image: IImage,
}

export interface IImage {
    _type: 'image';
    _key: string;
    asset: Asset;
    crop?: Crop;
    hotspot?: Hotspot;
}

interface Asset {
    _ref: string;
    _type: 'reference';
}

interface Crop {
    _type: 'sanity.imageCrop';
    bottom: number;
    left: number;
    right: number;
    top: number;
}

interface Hotspot {
    _type: 'sanity.imageHotspot';
    height: number;
    width: number;
    x: number;
    y: number;
}


export interface IUserGuide {
    title: string,
    slug: Slug,
    mainImage: IImage,
    description: string,
    userGuideSteps: UserGuideStep[]
}


export interface IPage {
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: "page";
    _updatedAt: string;
    title: string;
    content: Content[];
}

export type Content = IHero | ITextSection;

export interface IHero {
    _key: string;
    _type: 'hero';
    heading: string;
    backgroundImage: IImage;
}

export interface ITextSection {
    _key: string;
    _type: 'textSection';
    heading: string;
    text: IBlock;
}


interface SerializersType {
    [key: string]: React.ReactNode;
}
export interface Serializers {
    types: SerializersType;
    marks?: object;
    block?: () => void;
    span?: () => void;
}

export interface IBlock {
    _key: string;
    _type: 'block';
    children: any;
    markDefs: any;
    style: 'normal' | 'h1' | 'h2' | 'h3';
}
