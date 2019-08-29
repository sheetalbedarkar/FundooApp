var aws = require('aws-sdk')
var express = require('express')
var multer = require('multer')
var multerS3 = require('multer-s3')
require('dotenv').config();
var app = express()

//configuring the AWS environment
var s3 = new aws.S3()
 
//configuring parameters 
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'fundoo-app',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;