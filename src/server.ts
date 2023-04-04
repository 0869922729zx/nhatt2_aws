import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get( "/", async ( req: express.Request, res: express.Response ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  
  app.get("/filteredimage", async ( req: express.Request, res: express.Response  )=>{
    if(req.query.image_url == undefined)
      res.send("Image not found");
    let path = await filterImageFromURL(req.query.image_url);

    res.sendFile(path, function(err){
      if(err){
        console.log("success!");
        res.status(500).send(err.message);
      }else{
        console.log("success!");
        let arr: string [] = [];
        arr.push(path);
        deleteLocalFiles(arr);
      }
    });
  });

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
