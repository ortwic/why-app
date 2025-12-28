
import { MarkedExtension, RendererObject, Token } from "marked";
import { MediaAttributes, Attributes } from "./marked-media.model";

type AsyncValue = {
    value?: string;
    error?: string;
};

/***
 * @param resolveHref
 * @description 
 * https://github.com/airmanxtw/marked-media/blob/master/marked-media.js
 * @example
 * marked.parseInline("![](1 'width:300px,title:test img')")
 * marked.parseInline("![this is audio](1 'type:wav,controls,autoplay,muted')
 * marked.parseInline("![](PB4gId2mPNc 'type:youtube,width:560,height:315')");")
 */
export const markedMedia = (resolveHref: (path: string) => Promise<[string?, string?]>): MarkedExtension => {
    const hrefCache = new Map<string, AsyncValue>();

    const parseAttributes = (title: string) => {
        return title.split(',').reduce((acc, element) => {
            let object = element.split('=');
            acc[object[0]] = object.length < 2 ? true : object[1];
            return acc;
        }, {} as Attributes);
    };

    const isYouTubeId = (id: string) => id.match(/^[\w-]+$/);

    const walkTokens = async (token: Token) => {
        if (token.type === 'image' && !isYouTubeId(token.href)) {
            // Setup cache to prevent race conditions between walkTokens and renderer
            if (!hrefCache.has(token.href)) {
                const [value, error] = await resolveHref(token.href);
                hrefCache.set(token.href, { value, error });
            }
            
            const cached = hrefCache.get(token.href)!;
            token.href = cached.value || token.href;
            if (cached.error) {
                token.title = cached.error;
            }
        }
    };

    const renderer: RendererObject = {
        image(href: string, title: string | null, text: string): string {
            // Prefer href from cache to avoid async race conditions
            const resolvedHref = hrefCache.get(href)?.value || href;
            
            const attr = (title ? parseAttributes(title) : {}) as MediaAttributes;
            
            switch (attr.type) {
                case 'wav':
                    let controls = attr.controls ? ' controls' : '';
                    let autoplay = attr.autoplay ? ' autoplay' : '';
                    let muted = attr.muted ? ' muted' : '';
                    return `<audio alt='${text}'${controls}${autoplay}${muted}><source src='${resolvedHref}' type='audio/wav'></audio>`;
                case 'youtube':
                    let width = attr.width ?? 560;
                    let height = attr.height ?? 315;
                    let allow = attr.allow ?? 'accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture';
                    let allowfullscreen = attr.allowfullscreen ? 'allowfullscreen' : '';
                    return `<iframe width='${width}' height='${height}' src='https://www.youtube.com/embed/${resolvedHref}' title='${attr.title ?? 'YouTube video player'}' frameborder='0' allow='${allow}' ${allowfullscreen}></iframe>`;
                default:
                    let style = attr.style != null ? ` style='${attr.style}'` : '';
                    let titleAttr = attr.title != null ? ` title='${attr.title}'` : '';
                    return `<img class='marked-image' src='${resolvedHref}' alt='${text}'${style}${titleAttr}></img>`;
            }
        },
        blockquote(text: string): string {
            const quote = text.replace(/^<p>|<\/p>$/g, '').split('--');
            if (quote.length == 2) {
                return `<blockquote><p>${quote[0]}</p><cite>${quote[1]}</cite></blockquote>`;
            }
            return `<blockquote>${text}</blockquote>`;
        }
    };

    return { walkTokens, renderer, async: true };
};
