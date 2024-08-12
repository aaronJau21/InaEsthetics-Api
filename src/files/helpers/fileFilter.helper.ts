export const fileFilter = ( req: Express.Request, file: Express.Multer.File, cb: Function ) => {

  if ( !file ) return cb( new Error( 'File is empty' ), false );

  const fileExptension = file.mimetype.split( '/' )[ 1 ];
  const validExtensions = [ 'jpg', 'jpeg', 'png' ];

  if ( validExtensions.includes( fileExptension ) ) {
    return cb( null, true );
  }

  cb( null, false );


};