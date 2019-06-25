var chai = require('chai')
var chaiHttp = require('chai-http')
chai.use(chaiHttp);
chai.should()
var server = require('../server.js');
/**
 * @description : Reading JSON
 */
var fs = require('fs')
function readFile() {
    console.log(__dirname);
    var obj = fs.readFileSync(`${__dirname}/testData.json`)
    var data = JSON.parse(obj);
    return data;
}

describe('status and content', () => {
    var data = readFile();

    /**
     * @description : To test the API for registeration of the user
     */
    it('Registration of the user',(done) => {
        chai.request(server).post('/register').send(data.registration).end((err,res) =>{
            if(err){
                console.log("expect ==>",err)
                err.should.have.status(400);
            }
            else{
                console.log('expect Body ==>',res.body)
                res.should.have.status(200);
            }
            done();
        })
    })  

    /**
     * @description : To test the API for verification of the user
     */
    it("To check if the user is verfied",(done) => {
        chai.request(server).post('/isVerified').set('token',data.isVerified.token).send(data.isVerified).end((err,res) => {
            if(err){
                console.log('expect Body ==>',err)
                err.should.have.status(400)
            }
            else{
                console.log('expect Body ==>',res.body);
                res.should.have.status(200);
            }
            done();
        })
    }) 


    /**
     * @description : To test the API for login of the user
     */
    it('login of the user',(done) => {
        chai.request(server).post('/login').send(data.login).end((err,res) =>{
            if(err){
                console.log("expect ==>",err)
                err.should.have.status(400);
            }
            else{
                console.log('expect Body ==>',res.body)
                res.should.have.status(200);
            }
            done();
        })
    })  

    /**
    * @description : To test the API for forget the password of the user
    */
    it("forget the password of the user",(done) => {
            chai.request(server).post('/forgetPassword').send(data.forgetPassword).end((err,res) => {
                if(err)
                {
                    console.log("expect Body ==>",err)
                    err.should.have.status(400)
                }
                else
                {
                    console.log("expect Body ==>",res.body)
                    res.should.have.status(200)
                } 
            done();               
            })
        })                                                    


    /**
     * @description : To test the API for reseting the password of the user
     */
        it("Reset password",(done) => {
        chai.request(server).post('/resetPassword').set('token',data.resetPassword.token).send(data.resetPassword).end((err,res) => {
            if(err){
                console.log('expect Body ==>',err)
                err.should.have.status(400)
            }
            else{
                console.log('expect Body ==>',res.body);
                res.should.have.status(200);
            }
            done();
        })
    }) 


    /**
     * @description : To test the API for creating a note
     */
    it("Create Note",(done) => {
        chai.request(server).post('/createNote').send(data.createNote).end((err,res) => {
            if(err){
                console.log("Expected Body ==> " ,err);
                err.should.have.status(400)                   
            }
            else{
                console.log("Expected Body ==> ",res.body);
                res.should.have.status(200)
            }
            done();
        })
    })

    /**
     * @description : To test the API for getting all the notes
     */
    it("get all Notes",(done) => {
        chai.request(server).get('/getAllNotes').send(data.getAllNotes).end((err,res) => {
            if(err){
                console.log("Expected Body ==> " ,err);
                err.should.have.status(400)                   
            }
            else{
                console.log("Expected Body ==> ",res.body);
                res.should.have.status(200)
            }
            done();
        })
    })

    /**
     * @description : To test the API for geting a note
     */
    it("get a Note",(done) => {
        chai.request(server).get('/getNote').send(data.getNote).end((err,res) => {
            if(err){
                console.log("Expected Body ==> " ,err);
                err.should.have.status(400)                   
            }
            else{
                console.log("Expected Body ==> ",res.body);
                res.should.have.status(200)
            }
            done();
        })
    })

    /**
     * @description : To test the API for updating a note
     */
    it("update the Note",(done) => {
        chai.request(server).put('/updateNote').send(data.updateNote).end((err,res) => {
            if(err){
                console.log("Expected Body ==> " ,err);
                err.should.have.status(400)                   
            }
            else{
                console.log("Expected Body ==> ",res.body);
                res.should.have.status(200)
            }
            done();
        })
    })

    /**
     * @description : To test the API for deleting a note
     */
    it("delete the Note",(done) => {
        chai.request(server).delete('/deleteNote').send(data.deleteNote).end((err,res) => {
            if(err){
                console.log("Expected Body ==> " ,err);
                err.should.have.status(400)                   
            }
            else{
                console.log("Expected Body ==> ",res.body);
                res.should.have.status(200)
            }
            done();
        })
    })

     /**
      * @description : To test the API for trash a note
      */
    it("trash Note",(done) => {
        chai.request(server).post('/trashNote').send(data.trashNote).end((err,res) => {
            if(err){
                console.log("Expected Body ==> ",err);
                err.should.have.status(400)                    
            }
            else{
                console.log("Expected Body ==> ",res.body);
                res.should.have.status(200)                    
            }
            done();
        })
    })


    /**
     * @description : To test the API for archiving a note
     */
    it("archive note",(done) => {
        chai.request(server).post('/archiveNote').send(data.archiveNote).end((err,res) => {
            if(err){
                console.log("Expected Body ==> ",err);
                err.should.have.status(400)                    
            }
            else{
                console.log("Expected Body ==> ",res.body);
                res.should.have.status(200)                    
            }
            done();
        })
    })

   
    /**
     * @description : To test the API for setting a reminder to note
     */
    it("reminder Note",(done) => {
        chai.request(server).post('/reminderNote').send(data.reminderNote).end((err,res) => {
            if(err){
                console.log("Expected Body ==> ",err);
                err.should.have.status(400)                    
            }
            else{
                console.log("Expected Body ==> ",res.body);
                res.should.have.status(200)                    
            }
            done();
        })
    })

    /**
     * @description : To test the API for searching a note by using title
     */
    it("search Note With Title",(done) => {
        chai.request(server).get('/searchNoteWithTitle').send(data.searchNoteWithTitle).end((err,res) => {
            if(err){
                console.log("Expected Body ==> ",err);
                err.should.have.status(400)                    
            }
            else{
                console.log("Expected Body ==> ",res.body);
                res.should.have.status(200)                    
            }
            done();
        })
    })

    /**
 * @description : To test the API for searching a note by using description
 */
    it("search Note With Description", (done) => {
        chai.request(server).get('/searchNoteWithDescription').send(data.searchNoteWithDescription).end((err, res) => {
            if (err) {
                console.log("Expected Body ==> ", err);
                err.should.have.status(400)
            }
            else {
                console.log("Expected Body ==> ", res.body);
                res.should.have.status(200)
            }
            done();
        })
    })

})