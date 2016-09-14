/* eslint-env node, es6 */
// app/main.js

// Module to control application life.
const {app, Tray, Menu, BrowserWindow } = require('electron'); 
const path = require('path');
const capture = require('./capture.js');
const iconPath = path.join(__dirname, '/images/application.png');
let appIcon = null;
let win = null;



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {

//  capture.setDistantScreenSize(1366, 768);
//  capture.toggle();

	var os = require('os');
	var socket = require('./socket');
	var interfaces = os.networkInterfaces();
	var addresses = [];
	for (var k in interfaces) {
		for (var k2 in interfaces[k]) {
			var address = interfaces[k][k2];
			if (address.family === 'IPv4' && !address.internal) {
				addresses.push({label :'http://' + address.address + ':3000/'});

			}

		}

	}

	win = new BrowserWindow({show: false});
	appIcon = new Tray(iconPath);
	var contextMenu = Menu.buildFromTemplate(addresses);
	appIcon.setToolTip('Virtual Keyboard');
	appIcon.setContextMenu(contextMenu);	


});

