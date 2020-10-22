export interface Slug {
    _type: 'slug';
    current: string;
}

export interface UserGuideStep {
    step: string,
    image: Image,
}

export interface Image {
    _type: 'image';
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
    mainImage: Image,
    description: string,
    userGuideSteps: UserGuideStep[]
}
