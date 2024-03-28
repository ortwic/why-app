import { MarkedPipe, resourceUrl } from './marked.pipe';

describe('MarkedPipe', () => {
    const pipe = new MarkedPipe();

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('test img', () => {
        expect(pipe.transform("![test](1.jpg 'style=width:300px,title=test img')")).toMatch(
            `<p><img class='marked-image' src='${resourceUrl}1.jpg' alt='test' style='width:300px' title='test img'></img></p>`
        );
    });

    it('test img external', () => {
        expect(pipe.transform("![test](http://example.com/media/2.jpg 'style=width:300px;height:200px,title=test img')")).toMatch(
            "<p><img class='marked-image' src='http://example.com/media/2.jpg' alt='test' style='width:300px;height:200px' title='test img'></img></p>"
        );
    });

    it('test wav', () => {
        expect(pipe.transform("![this is audio](1.wav 'type=wav,controls,autoplay,muted')")).toMatch(
            `<p><audio alt='this is audio' controls autoplay muted><source src='${resourceUrl}1.wav' type='audio/wav'></audio></p>`
        );
    });

    it('test youtube', () => {
        expect(pipe.transform("![](PB4gId2mPNc 'type=youtube,width=320,height=240,allow=accelerometer;autoplay;clipboard-write,allowfullscreen')")).toMatch(
            "<p><iframe width='320' height='240' src='https://www.youtube.com/embed/PB4gId2mPNc' title='YouTube video player' frameborder='0' allow='accelerometer;autoplay;clipboard-write' allowfullscreen></iframe></p>"
        );
    });
});
