export interface MarkdownContent {
    type: 'text';
    value: string;
}

export interface ExpandContent {
    type: 'expand';
    value: {
        title: string;
        description: string;
        content: string;
    };
}

export interface QuoteContent {
    type: 'quote';
    value: {
        text: string;
        cite: string;
    };
}

export interface IFrameContent {
    type: 'iframe';
    value: {
        src: string;
        title: string;
        type: 'custom' | 'youtube';
    };
}

export interface ImagesContent {
    type: 'images';
    value: string[];
}

export interface SectionContent {
    type: 'section';
    value: {
        title: string;
        content: string; // Markdown
        link: string; // URL
        image: string; // URL
    }
}

export interface SliderContent {
    type: 'slider';
    value: SliderImage[];
}

export interface SliderImage {
    title: string;
    file: string;
    url: string;
}

export interface FormContent {
    type: 'stepper';
    value: InputDefinition[];
}

export type InputDefinition = SelectList | TextField;
export type InputValue = string[] | string | number | boolean | undefined;

interface SelectList {
    type: 'select';
    value: {
        id: string;
        caption: string;
        options: string[];
        multiple: boolean;
        multiline: boolean;
    };
}

interface TextField {
    type: 'text' | 'textarea';
    value: {
        id: string;
        caption: string;
        placeholder: string;
        validation: string;
        message: string;
    };
}