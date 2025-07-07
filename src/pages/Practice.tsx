import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle } from "lucide-react";

const Practice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime] = useState(Date.now());

  // Mock exam data - en una app real vendría de una API
  const examData = {
    name: "Historia de España - Siglo XX",
    questions: [
      {
        id: 1,
        question: "¿En qué año comenzó la Guerra Civil Española?",
        options: {
          A: "1935",
          B: "1936", 
          C: "1937",
          D: "1938"
        },
        answer: "B"
      },
      {
        id: 2,
        question: "¿Quién fue el primer presidente de la Segunda República?",
        options: {
          A: "Manuel Azaña",
          B: "Niceto Alcalá-Zamora",
          C: "Alejandro Lerroux", 
          D: "Francisco Largo Caballero"
        },
        answer: "B"
      },
      {
        id: 3,
        question: "¿Cuándo murió Francisco Franco?",
        options: {
          A: "1974",
          B: "1975",
          C: "1976",
          D: "1977"
        },
        answer: "B"
      },
      {
        id: 4,
        question: "¿Qué evento marcó el inicio de la Transición Española?",
        options: {
          A: "La muerte de Franco",
          B: "La aprobación de la Constitución",
          C: "Las primeras elecciones democráticas",
          D: "El 23-F"
        },
        answer: "A"
      },
      {
        id: 5,
        question: "¿En qué año se aprobó la Constitución española actual?",
        options: {
          A: "1977",
          B: "1978",
          C: "1979", 
          D: "1980"
        },
        answer: "B"
      }
    ]
  };

  useEffect(() => {
    // Si no hay ID, redirigir a mis exámenes
    if (!id) {
      navigate("/exams");
      return;
    }

    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [id, navigate, startTime]);

  const handleAnswerSelect = (option: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: option
    }));
  };

  const handleNext = () => {
    if (currentQuestion < examData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleFinish = () => {
    setShowResults(true);
  };

  const calculateResults = () => {
    const correctAnswers = examData.questions.filter((q, index) => 
      selectedAnswers[index] === q.answer
    ).length;
    
    const percentage = Math.round((correctAnswers / examData.questions.length) * 100);
    
    const wrongAnswers = examData.questions
      .map((q, index) => ({ ...q, questionIndex: index }))
      .filter((q, index) => selectedAnswers[index] !== q.answer);

    return { correctAnswers, percentage, wrongAnswers };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Si no hay ID, mostrar mensaje de carga mientras redirige
  if (!id) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Card className="bg-white">
          <CardContent className="p-8 text-center">
            <p className="text-gray-600">Redirigiendo...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    const { correctAnswers, percentage, wrongAnswers } = calculateResults();
    
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Card className="bg-white">
          <CardHeader className="text-center pb-8">
            <div className="w-20 h-20 mx-auto mb-4">
              {percentage >= 70 ? (
                <CheckCircle className="w-20 h-20 text-green-500" />
              ) : (
                <XCircle className="w-20 h-20 text-red-500" />
              )}
            </div>
            <CardTitle className="text-3xl mb-2">
              {percentage >= 70 ? "¡Excelente trabajo!" : "Sigue practicando"}
            </CardTitle>
            <p className="text-gray-600">Has completado el examen "{examData.name}"</p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Results Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">{percentage}%</div>
                <div className="text-sm text-blue-700">Puntuación final</div>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {correctAnswers}/{examData.questions.length}
                </div>
                <div className="text-sm text-green-700">Respuestas correctas</div>
              </div>
              
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">{formatTime(timeSpent)}</div>
                <div className="text-sm text-purple-700">Tiempo empleado</div>
              </div>
            </div>

            {/* Wrong Answers */}
            {wrongAnswers.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Respuestas incorrectas</h3>
                <div className="space-y-4">
                  {wrongAnswers.map((question, index) => (
                    <Card key={question.id} className="border border-red-200 bg-red-50">
                      <CardContent className="p-4">
                        <p className="font-medium text-gray-800 mb-3">
                          Pregunta {question.questionIndex + 1}: {question.question}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-red-600 mb-1">Tu respuesta:</p>
                            <p className="bg-red-100 p-2 rounded border">
                              {selectedAnswers[question.questionIndex] ? 
                                `${selectedAnswers[question.questionIndex]}) ${question.options[selectedAnswers[question.questionIndex] as keyof typeof question.options]}` :
                                "Sin responder"
                              }
                            </p>
                          </div>
                          <div>
                            <p className="text-green-600 mb-1">Respuesta correcta:</p>
                            <p className="bg-green-100 p-2 rounded border">
                              {question.answer}) {question.options[question.answer as keyof typeof question.options]}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 justify-center pt-6">
              <Button 
                onClick={() => {
                  setShowResults(false);
                  setCurrentQuestion(0);
                  setSelectedAnswers({});
                }}
                variant="outline"
              >
                Repetir examen
              </Button>
              <Button onClick={() => navigate("/exams")}>
                Volver a mis exámenes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = examData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / examData.questions.length) * 100;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">{examData.name}</h1>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTime(timeSpent)}
            </Badge>
            <Badge>
              {currentQuestion + 1} de {examData.questions.length}
            </Badge>
          </div>
        </div>
        
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="bg-white mb-6">
        <CardHeader>
          <CardTitle className="text-xl">
            Pregunta {currentQuestion + 1}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Question */}
          <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-lg text-gray-800 leading-relaxed">{question.question}</p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {Object.entries(question.options).map(([option, text]) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === option
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold ${
                    selectedAnswers[currentQuestion] === option
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-gray-300 text-gray-600'
                  }`}>
                    {option}
                  </div>
                  <span className="text-gray-800">{text}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Anterior
        </Button>

        <div className="text-sm text-gray-500">
          {Object.keys(selectedAnswers).length} de {examData.questions.length} respondidas
        </div>

        {currentQuestion === examData.questions.length - 1 ? (
          <Button 
            onClick={handleFinish}
            className="bg-green-600 hover:bg-green-700"
          >
            Finalizar examen
          </Button>
        ) : (
          <Button onClick={handleNext}>
            Siguiente
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Practice;
