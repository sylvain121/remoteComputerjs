# remoteComputerjs

Virtual keyboard buld with electron js, socket.io and robotjs


## required
to compile libturbo-jpeg you must install yasm
	apt-get install yasm
	pacman -Syu yasm

## installation

run _npm i_ to install node modules
run _npm run-script compile_ to rebuild robotjs to support electron
run _npm start_ to launch app


## keyboard layout

layout and keys ares defines in app/index.html file

		<div class="keyboard">
			<div class="key">A</div>
			<div class="key">B</div>
			<div class="key">C</div>
		</div>
	
style sheet need to be adapted 
