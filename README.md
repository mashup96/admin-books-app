# admin-books-app
An dashboard for book publisher created with React, Redux-Saga and Firebase-Cloud-Firestore

## Getting Started
1) git clone https://github.com/mashup96/admin-books-app.git <br/>
2) cd admin-books-app <br/>
3) `npm install`

## Development server
Run `npm start` for a dev server. Navigate to `http://localhost:3000/`. 
The app will automatically reload if you change any of the source files.
<br/> <br/> 
Since this is an example project, the login credentials are:
<br/>  <br/> 
Username: mattia.carria@gmail.com
<br/> 
Password: 123456
## Build
Run `npm run build` to build the project. The build artifacts will be stored in the `build/` directory.

## Screenshot to consult
In the `screenshot-webapp` folder there are all screenshot related to the web application pages. <br/>
In the `screenshot-firebase` folder there are all screenshot of how cloud firestore documents are structured.

## Use of security rules for CRUD on Firebase
condition <strong>create</strong>: `request.resource.data.uid == request.auth.uid`; <br/> 
for files `request.resource.metadata.uid == request.auth.uid` <br/>
( if the sent uid is equal to the uid of the authenticated user ) 
<br/><br/>
condition <strong>update,delete,read</strong>: `resource.data.uid == request.auth.uid`; <br/> 
for files `resource.metadata.uid == request.auth.uid` <br/>
( if the uid of the stored resource is equal to the uid of the authenticated user )

