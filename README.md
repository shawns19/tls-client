# wails-botbase

This is an example of a desktop application created using Wails. This should be used as a template to get started on your own desktop application, removing the need to write the boilerplate code to get started!

Key Features

- React, Redux, React Router and Chakra UI for frontend
- Leverages Go routines, channels, context and sync to run tasks and handle status updates
- Functional task page with stop, start, status updates and create tasks
- Wails event emitting for inter-process communication

To start application run `wails dev` in the myproject directory.

Run `npm i` in Frontend directory

If there any issues with starting the application due to import errors from converting Go methods to Javascript, delete the directory myproject/Frontend/wailsjs.

See Wails docs for more information on packaging the application and any other concerns.

See the following article for a brief review of the application and key points to consider:
https://medium.com/@shawnsdev1902/exploring-desktop-application-development-with-golang-4acc76a69fda
