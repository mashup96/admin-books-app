# admin-books-app
A dashboard for book publisher created with React, Redux-Saga and Firebase-Cloud-Firestore

## Development server
Run `npm start` for a dev server. Navigate to `http://localhost:3000/`. 
The app will automatically reload if you change any of the source files.

## Build
Run `npm run build` to build the project. The build artifacts will be stored in the `build/` directory.

## Screenshot to consult
In the `screenshot-webapp` folder there are all screenshot related to the web application pages. <br/>
In the `screenshot-firebase` folder there are all screenshot of how cloud firestore documents are structured.

## Use of security rules for CRUD
condition <strong>create</strong>: `request.resource.data.uid == request.auth.uid` ( if the sent uid is equal to the uid of the authenticated user ) 
<br/><br/>
condition <strong>update,delete,read</strong>: `resource.data.uid == request.auth.uid` ( if the sent uid is equal to the uid of the authenticated user )

