
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Play, Edit, Search, Calendar, FileText, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const MyExams = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - en una app real vendría de una API
  const exams = [
    {
      id: 1,
      name: "Historia de España - Siglo XX",
      questions: 25,
      date: "2024-01-15",
      difficulty: "Media",
      score: 85,
      attempts: 3,
      category: "Historia"
    },
    {
      id: 2,
      name: "Matemáticas Básicas - Álgebra",
      questions: 30,
      date: "2024-01-12",
      difficulty: "Fácil", 
      score: 92,
      attempts: 2,
      category: "Matemáticas"
    },
    {
      id: 3,
      name: "Biología Celular - Estructura",
      questions: 20,
      date: "2024-01-10",
      difficulty: "Difícil",
      score: 78,
      attempts: 5,
      category: "Biología"
    },
    {
      id: 4,
      name: "Literatura Española - Generación del 98",
      questions: 15,
      date: "2024-01-08",
      difficulty: "Media",
      score: 88,
      attempts: 1,
      category: "Literatura"
    },
    {
      id: 5,
      name: "Química Orgánica - Compuestos",
      questions: 35,
      date: "2024-01-05",
      difficulty: "Difícil",
      score: 72,
      attempts: 4,
      category: "Química"
    }
  ];

  const filteredExams = exams.filter(exam =>
    exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil": return "bg-green-100 text-green-800";
      case "Media": return "bg-yellow-100 text-yellow-800";
      case "Difícil": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mis exámenes</h1>
        <p className="text-gray-600">Gestiona, edita y practica todos tus exámenes</p>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <Card className="lg:col-span-2 bg-white">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar exámenes por nombre o categoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total exámenes</p>
                <p className="text-2xl font-bold">{exams.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Promedio</p>
                <p className="text-2xl font-bold">83%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map((exam) => (
          <Card key={exam.id} className="bg-white hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary" className="text-xs">
                  {exam.category}
                </Badge>
                <Badge className={getDifficultyColor(exam.difficulty)}>
                  {exam.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-lg leading-tight">{exam.name}</CardTitle>
              <CardDescription className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  {exam.questions} preguntas
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(exam.date).toLocaleDateString('es-ES')}
                </span>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              {/* Stats */}
              <div className="flex justify-between items-center mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Mejor puntuación</p>
                  <p className={`font-bold ${getScoreColor(exam.score)}`}>{exam.score}%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Intentos</p>
                  <p className="font-bold text-gray-700">{exam.attempts}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link to={`/practice/${exam.id}`} className="flex-1">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Play className="w-4 h-4 mr-2" />
                    Practicar
                  </Button>
                </Link>
                <Link to={`/exams/${exam.id}`}>
                  <Button variant="outline" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExams.length === 0 && searchTerm && (
        <Card className="bg-white text-center py-12">
          <CardContent>
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No se encontraron exámenes</h3>
            <p className="text-gray-500">Intenta con otros términos de búsqueda</p>
          </CardContent>
        </Card>
      )}

      {exams.length === 0 && (
        <Card className="bg-white text-center py-12">
          <CardContent>
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">Aún no tienes exámenes</h3>
            <p className="text-gray-500 mb-6">Crea tu primer examen para comenzar a practicar</p>
            <div className="flex gap-4 justify-center">
              <Link to="/generate">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Generar con IA
                </Button>
              </Link>
              <Link to="/upload-aiken">
                <Button variant="outline">
                  Subir Aiken
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MyExams;
