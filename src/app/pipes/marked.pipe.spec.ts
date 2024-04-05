import { TestBed } from '@angular/core/testing';
import { StorageService } from '../services/storage.service';
import { MarkedPipe } from './marked.pipe';

const resourceUrl = "http://example.com/media/";

describe('MarkedPipe', () => {
    let pipe: MarkedPipe;
    let service: StorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
        providers: [
            MarkedPipe,
            { 
                provide: StorageService, 
                useValue: {
                    downloadUrl: (path: string) => Promise.resolve(resourceUrl + path)
                } 
            }
        ]
        });
        service = TestBed.inject(StorageService);
        pipe = TestBed.inject(MarkedPipe);
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('test img', async () => {
        expect(await pipe.transform("![test](1.jpg 'style=width:300px,title=test img')")).toMatch(
            `<p><img class='marked-image' src='${resourceUrl}1.jpg' alt='test' style='width:300px' title='test img'></img></p>`
        );
    });

    it('test wav', async () => {
        expect(await pipe.transform("![this is audio](1.wav 'type=wav,controls,autoplay,muted')")).toMatch(
            `<p><audio alt='this is audio' controls autoplay muted><source src='${resourceUrl}1.wav' type='audio/wav'></audio></p>`
        );
    });

    it('test youtube', async () => {
        expect(await pipe.transform("![](PB4gId2mPNc 'type=youtube,width=320,height=240,allow=accelerometer;autoplay;clipboard-write,allowfullscreen')")).toMatch(
            "<p><iframe width='320' height='240' src='https://www.youtube.com/embed/PB4gId2mPNc' title='YouTube video player' frameborder='0' allow='accelerometer;autoplay;clipboard-write' allowfullscreen></iframe></p>"
        );
    });
});
