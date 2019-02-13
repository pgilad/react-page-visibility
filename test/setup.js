require('babel-register');

const Adapter = require('enzyme-adapter-react-16');
const Enzyme = require('enzyme');

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html lang="en"><body><div id="main"></div></body></html>');

const { window } = jsdom;

global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: 'nodejs',
    platform: 'nodejs',
    appName: 'Netscape',
};

Enzyme.configure({ adapter: new Adapter() });
