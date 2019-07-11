const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');

const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const FileReader = require('filereader')


/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

router.post('/', function (req, res) {

    let form = new formidable.IncomingForm();
    let fields = {};
    let _name;
    let isError = false;
  

  form.parse(req);


    form.on('field', function (name, value) {
        //console.log('name:', name, 'value:', value)
        if(name && value){
        _name = value;
        fields[name] = value;
        if (!fs.existsSync(_name)) {
            fs.mkdirSync(_name);
        }
      }
      else {

      }
        
    })


    form.on('fileBegin', function (name, file) {
        // file.path = __dirname + '/uploads/' + file.name;
        try{
        console.log("Path:", path.join(__dirname , '../../../../', _name , file.name));
        file.path = path.join(__dirname , '../../../../', _name , file.name);
        }
        catch(err){
          console.log("Error:",err);
          isError =true;
         // res.json({success:false,message : 'An error occured while uploading the file.'})
          //res.end();  

        }
    });

    form.on('file', function (name, file) {
        console.log('Uploaded ' + file.name);
        //res.json({success: true,message : 'File has been uploaded successfully.'})
    });

    form.on('error', function(error){
        console.log("Error:",error);
        isError = true;
    })

    form.on('end', function(error){
      if(isError){
        res.json({success:false,message : 'An error occured while uploading the file.'})

      }
      else{
        res.json({success: true,message : 'File has been uploaded successfully.'})

      }
  })
});
/**
 * GET v1/docs
 */


router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);


module.exports = router;
