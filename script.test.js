/* eslint-disable indent */
/* eslint-disable arrow-body-style */
const lib = require('./jsmodule.js');

describe('test displayText()', () => {
    test('testing displayText()', () => {
        lib.displayText('hello world');
        const element = document.getElementById('displayTextID');
        expect(element).not.toBeNull();
        expect(element.innerHTML).toEqual('hello world');
    });

    test('testing displayImage()', () => {
        lib.displayImage(
            'https://media3.giphy.com/media/lI8YNZc734UH6/giphy-preview.gif?cid=d200e0aev518we42wou6rkxk93fmvf0egfcrsguagi1jhrdn&rid=giphy-preview.gif',
        );
        const element = document.getElementById('imageID');
        expect(element).not.toBeNull();
        expect(element.src).toEqual(
            'https://media3.giphy.com/media/lI8YNZc734UH6/giphy-preview.gif?cid=d200e0aev518we42wou6rkxk93fmvf0egfcrsguagi1jhrdn&rid=giphy-preview.gif',
        );
    });

    test('testing showResult()', async () => {
        const myDiv2 = document.createElement('input');
        document.body.appendChild(myDiv2);
        myDiv2.setAttribute('id', 'city');
        myDiv2.value = 'Philadelphia';
        await lib.showResult().then((data) => {
            expect(data.main.temp).toBe(53.42);
        });
    });

    test('testing getGif for Cloudy condition', async () => {
        const currentCondition = 'Clouds';

        await lib.getGif(currentCondition).then((data) => {
            expect(data).not.toBeNull();
        });
    });

    test('testing getGif for not Cloudy condition', async () => {
        const currentCondition = 'Sunny';

        await lib.getGif(currentCondition).then((data) => {
            expect(data).not.toBeNull();
        });
    });
});
