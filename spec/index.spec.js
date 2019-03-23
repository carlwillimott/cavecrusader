import jsdom from 'jsdom';
const { JSDOM } = jsdom;

const { document } = (new JSDOM('<!DOCTYPE html><html lang="en"><canvas id="cc" width="1000px" height="1000px"></canvas></html>')).window;
global.document = document;
global.window = document.defaultView;

import CaveCrusader from '../script.js';


describe('Given the Cave Crusader Class', () => {

    it('Should construct successfully', () => {

        const map = [
            '####',
            '#@ #',
            '####',
        ];

        const cc = new CaveCrusader('cc', map);
        expect(typeof cc).toBe('object');

    });

    it('Should be able to handle movement', () => {

        const map = [
            '####',
            '#@ #',
            '####',
        ];

        const cc = new CaveCrusader('cc', map);

        expect(cc.position).toEqual([1, 1]);

        document.dispatchEvent(new window.KeyboardEvent('keydown', { keyCode: 39 }));

        expect(cc.position).toEqual([2, 1]);

    });

    it('Should be able to increment the score', () => {

        const map = [
            '####',
            '#@ #',
            '####',
        ];

        const cc = new CaveCrusader('cc', map);

        expect(cc.score).toEqual(0);

        document.dispatchEvent(new window.KeyboardEvent('keydown', { keyCode: 39 }));

        expect(cc.score).toEqual(1);

        document.dispatchEvent(new window.KeyboardEvent('keydown', { keyCode: 37 }));

        expect(cc.score).toEqual(2);

        document.dispatchEvent(new window.KeyboardEvent('keydown', { keyCode: 39 }));

        expect(cc.score).toEqual(3);

        document.dispatchEvent(new window.KeyboardEvent('keydown', { keyCode: 37 }));

        expect(cc.score).toEqual(4);

    });

});