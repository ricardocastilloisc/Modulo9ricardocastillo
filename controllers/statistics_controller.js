var models = require('../models/models.js');

var NumQuizzes;
var NumComments;
var NumQuizzesComment;
var NumPromComment;
var NumQuizzesSComment;

exports.index = function(req,res){
    
    models.Quiz.count().then(
            function(quizes){
               NumQuizzes=quizes;
            }                
    ).then(
    models.Consulta().then(
        function(data){
            var sum = 0;
            for (var i=0; i<data.length; i++) {
                         sum += parseInt(data[i].rep);
            }
            var prom = sum/data.length;
            NumPromComment = prom;
            NumQuizzesComment = data.length;
            
            
        }
    ));
    models.Comment.count().then(
        function(comments){
            NumComments = comments;
            NumQuizzesSComment = NumQuizzes - NumQuizzesComment;
            res.render('statistics/index.ejs',{nquizes:NumQuizzes,ncomments:NumComments,nquizcomment:NumQuizzesComment,prom:NumPromComment,nquizesscomment:NumQuizzesSComment,errors: []});
        }
    );
    
    
    
    
};