
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Play, BookOpen, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    { label: "Exámenes creados", value: "12", icon: BookOpen, color: "text-blue-600" },
    { label: "Preguntas generadas", value: "248", icon: Plus, color: "text-green-600" },
    { label: "Prácticas realizadas", value: "34", icon: Play, color: "text-purple-600" },
    { label: "Tiempo de estudio", value: "15h", icon: Clock, color: "text-orange-600" },
  ];

  const recentExams = [
    { id: 1, name: "Historia de España", questions: 25, date: "Hace 2 días" },
    { id: 2, name: "Matemáticas Básicas", questions: 30, date: "Hace 4 días" },
    { id: 3, name: "Biología Celular", questions: 20, date: "Hace 1 semana" },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">¡Bienvenido a Exam Maker!</h1>
        <p className="text-blue-100 text-lg">Crea, practica y domina tus exámenes con inteligencia artificial</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/generate">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-blue-700">Generar examen IA</CardTitle>
              <CardDescription>Sube un documento y genera preguntas automáticamente</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/upload-aiken">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-green-300 bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-green-700">Subir examen Aiken</CardTitle>
              <CardDescription>Importa preguntas desde un archivo de texto</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/practice/last">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-purple-300 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-purple-700">Practicar último examen</CardTitle>
              <CardDescription>Continúa donde lo dejaste</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Exams */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Exámenes recientes
          </CardTitle>
          <CardDescription>Tus últimos exámenes creados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentExams.map((exam) => (
              <div key={exam.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div>
                  <h3 className="font-medium text-gray-800">{exam.name}</h3>
                  <p className="text-sm text-gray-500">{exam.questions} preguntas • {exam.date}</p>
                </div>
                <Link to={`/practice/${exam.id}`}>
                  <Button variant="outline" size="sm">
                    <Play className="w-4 h-4 mr-2" />
                    Practicar
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
