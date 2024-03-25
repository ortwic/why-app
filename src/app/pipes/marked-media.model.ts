export type MediaAttributes = ImageAttribute | AudioAttribute | YouTubeAttribute;

interface ImageAttribute {
    type: 'img';
    title: string;
    style: string;
}

interface AudioAttribute {
    type: 'wav';
    controls: boolean;
    autoplay: boolean;
    muted: boolean;
}

interface YouTubeAttribute {
    type: 'youtube';
    title: string;
    width: number;
    height: number;
    allow: string;
    allowfullscreen: boolean;
}

export interface Attributes {
    [key: string]: string | number | boolean;
    title: string;
}