
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const GenerateExam = () => {
  const [file, setFile] = useState<File | null>(null);
  const [numQuestions, setNumQuestions] = useState([20]);
  const [difficulty, setDifficulty] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf" || selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setFile(selectedFile);
        toast({
          title: "Archivo subido correctamente",
          description: `${selectedFile.name} está listo para procesar`,
        });
      } else {
        toast({
          title: "Formato no válido",
          description: "Solo se aceptan archivos PDF y DOCX",
          variant: "destructive",
        });
      }
    }
  };

  const handleGenerate = async () => {
    if (!file || !difficulty) {
      toast({
        title: "Faltan datos",
        description: "Por favor, sube un archivo y selecciona la dificultad",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simular procesamiento con IA
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast({
      title: "¡Examen generado exitosamente!",
      description: `Se han creado ${numQuestions[0]} preguntas de dificultad ${difficulty.toLowerCase()}`,
    });
    
    setIsGenerating(false);
    navigate("/exams/new");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Generar examen con IA</h1>
        <p className="text-gray-600">Sube un documento y nuestra IA creará preguntas personalizadas para ti</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-600" />
              Subir documento
            </CardTitle>
            <CardDescription>Formatos admitidos: PDF, DOCX (máx. 10MB)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.docx"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                {file ? (
                  <div>
                    <p className="text-sm font-medium text-green-600 mb-1">Archivo seleccionado:</p>
                    <p className="text-sm text-gray-600">{file.name}</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Haz clic para subir</p>
                    <p className="text-xs text-gray-500">o arrastra y suelta tu archivo aquí</p>
                  </div>
                )}
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Configuration Section */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Configuración del examen
            </CardTitle>
            <CardDescription>Personaliza las características de tu examen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Number of Questions */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                Número de preguntas: {numQuestions[0]}
              </label>
              <Slider
                value={numQuestions}
                onValueChange={setNumQuestions}
                max={50}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>50</span>
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                Dificultad
              </label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona la dificultad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facil">Fácil</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="dificil">Difícil</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generate Button */}
      <Card className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">¿Listo para generar tu examen?</h3>
              <p className="text-blue-100">La IA procesará tu documento y creará preguntas únicas</p>
            </div>
            <Button 
              onClick={handleGenerate}
              disabled={!file || !difficulty || isGenerating}
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generar examen
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenerateExam;
