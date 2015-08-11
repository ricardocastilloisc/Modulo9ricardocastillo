var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var statisticsController= require('../controllers/statistics_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' , errors: []});
});

// Autoload de comandos con :quizId
//Solo se ejecuta en caso de que en los parametros de la ruta exista el parametro 'quizId'
router.param('quizId',quizController.load);

router.get('/quizes',quizController.index);
router.get('/quizes/:quizId(\\d+)',quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',quizController.answer);
router.get('/quizes/author',quizController.author);


router.param('commentId',commentController.load); // autoload :commentId

router.get('/quizes/new',sessionController.loginRequired,quizController.new);
router.post('/quizes/create',sessionController.loginRequired,quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',sessionController.loginRequired,quizController.edit);
router.put('/quizes/:quizId(\\d+)',sessionController.loginRequired,quizController.update);
router.delete('/quizes/:quizId(\\d+)',sessionController.loginRequired,quizController.destroy);

// Definicion de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new',commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',commentController.create);


// Definicion de rutas de sesion
router.get('/login',sessionController.new); // formulario de login
router.post('/login',sessionController.create); // crear sesion
router.get('/logout',sessionController.destroy);


router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',sessionController.loginRequired,commentController.publish);

router.get('/statistics',statisticsController.index);



module.exports = router;
