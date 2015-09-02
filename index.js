'use strict';
var self = require('sdk/self');
var data = self.data;
var panels = require('sdk/panel');
var windows = require('sdk/window/utils');
var browserWindow = '';
var browserDocument = '';
var { ToggleButton } = require('sdk/ui/button/toggle');

//var screensh = require('./screensh');



var button = ToggleButton({
    id: 'shareIt',
    label: 'Send/Save/Share',
    icon: {
        '16': './USSS.png' //'./FX__USSS-16x16.svg'
    },
    onChange: shareItAction
});

function shareItAction(state) {
    if (state.checked) {
        panel.show({
            position: button
        })
    }
    //var { Cu } = require('chrome');
    //Cu.import('resource://gre/modules/devtools/gcli/commands/screenshot.js');
    console.log(screensh);
}

function panelHide() {
    button.state('window', {checked: false});
    panel.port.emit('resetHome');
    panel.resize(216, 306);
}

var panel = panels.Panel({
    width: 216,
    height: 306,
    contentURL: data.url('usss-nav.html'),
    onHide: panelHide
    //,contentScript: `self.port.emit('resize', {width: document.documentElement.clientWidth, height: document.documentElement.clientHeight});`
});

panel.port.on('resizeP', (width, height) => {
    panel.resize(width, height);
});

panel.port.on('email', ()=> {
    browserWindow.MailIntegration.sendLinkForBrowser(browserWindow.gBrowser.selectedBrowser);
});

//For resizing the panel according to the content  //http://stackoverflow.com/questions/14123936/how-to-change-panel-size-in-mozilla-like-chrome-extension
//panel.port.on("resize", function({width, height})
//{
//    panel.resize(width, height);
//});

exports.main = () => {
    browserWindow = windows.getMostRecentBrowserWindow();
    browserDocument = browserWindow.document;

};
