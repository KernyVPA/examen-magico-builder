
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Eye, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const UploadAiken = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewText, setPreviewText] = useState("");
  const [questions, setQuestions] = useState<any[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const parseAikenFormat = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    const parsedQuestions = [];
    let currentQuestion: any = {};
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.endsWith('?') && !line.startsWith('A)') && !line.startsWith('B)') && !line.startsWith('C)') && !line.startsWith('D)') && !line.startsWith('ANSWER:')) {
        // New question
        if (currentQuestion.question) {
          parsedQuestions.push(currentQuestion);
        }
        currentQuestion = { question: line, options: {}, answer: '' };
      } else if (line.startsWith('A)')) {
        currentQuestion.options.A = line.substring(2).trim();
      } else if (line.startsWith('B)')) {
        currentQuestion.options.B = line.substring(2).trim();
      } else if (line.startsWith('C)')) {
        currentQuestion.options.C = line.substring(2).trim();
      } else if (line.startsWith('D)')) {
        currentQuestion.options.D = line.substring(2).trim();
      } else if (line.startsWith('ANSWER:')) {
        currentQuestion.answer = line.substring(7).trim();
      }
    }
    
    if (currentQuestion.question) {
      parsedQuestions.push(currentQuestion);
    }
    
    return parsedQuestions;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === "text/plain" || selectedFile.name.endsWith('.txt')) {
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          setPreviewText(text);
          const parsed = parseAikenFormat(text);
          setQuestions(parsed);
        };
        reader.readAsText(selectedFile);
        
        toast({
          title: "Archivo subido correctamente",
          description: `${selectedFile.name} está listo para previsualizar`,
        });
      } else {
        toast({
          title: "Formato no válido",
          description: "Solo se aceptan archivos .txt con formato Aiken",
          variant: "destructive",
        });
      }
    }
  };

  const handleSaveAndPractice = () => {
    if (questions.length === 0) {
      toast({
        title: "No hay preguntas válidas",
        description: "Verifica que el formato Aiken sea correcto",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "¡Examen guardado exitosamente!",
      description: `Se han importado ${questions.length} preguntas`,
    });
    
    navigate("/practice/imported");
  };

  const sampleAiken = `¿Cuál es la capital de España?
A) Barcelona  
B) Madrid
C) Valencia
D) Sevilla
ANSWER: B

¿En qué año se descubrió América?
A) 1491
B) 1492
C) 1493
D) 1494
ANSWER: B`;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Subir examen formato Aiken</h1>
        <p className="text-gray-600">Importa preguntas desde un archivo de texto con formato Aiken estándar</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-green-600" />
                Seleccionar archivo
              </CardTitle>
              <CardDescription>Archivo .txt con preguntas en formato Aiken</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                <input
                  type="file"
                  id="aiken-upload"
                  className="hidden"
                  accept=".txt"
                  onChange={handleFileChange}
                />
                <label htmlFor="aiken-upload" className="cursor-pointer">
                  <FileText className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  {file ? (
                    <div>
                      <p className="text-sm font-medium text-green-600 mb-1">Archivo seleccionado:</p>
                      <p className="text-sm text-gray-600">{file.name}</p>
                      <p className="text-xs text-green-600 mt-1">{questions.length} preguntas detectadas</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Haz clic para subir archivo .txt</p>
                      <p className="text-xs text-gray-500">Formato Aiken requerido</p>
                    </div>
                  )}
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Format Example */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800 text-lg">Formato Aiken - Ejemplo</CardTitle>
              <CardDescription className="text-blue-600">Así debe verse tu archivo .txt:</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-white p-4 rounded border text-gray-700 overflow-x-auto">
{sampleAiken}
              </pre>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-purple-600" />
              Vista previa
            </CardTitle>
            <CardDescription>
              {previewText ? `${questions.length} preguntas detectadas` : "Selecciona un archivo para ver la vista previa"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {previewText ? (
              <div className="space-y-4">
                <Textarea
                  value={previewText}
                  readOnly
                  className="min-h-[300px] font-mono text-sm resize-none"
                  placeholder="La vista previa aparecerá aquí..."
                />
                
                {questions.length > 0 && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">Preguntas procesadas correctamente:</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      {questions.slice(0, 3).map((q, index) => (
                        <li key={index} className="truncate">• {q.question}</li>
                      ))}
                      {questions.length > 3 && (
                        <li className="text-green-600">... y {questions.length - 3} preguntas más</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="min-h-[300px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Vista previa del archivo aparecerá aquí</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Action Button */}
      {questions.length > 0 && (
        <Card className="mt-8 bg-gradient-to-r from-green-500 to-teal-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">¡Examen listo para importar!</h3>
                <p className="text-green-100">Se han detectado {questions.length} preguntas válidas</p>
              </div>
              <Button 
                onClick={handleSaveAndPractice}
                size="lg"
                className="bg-white text-green-600 hover:bg-green-50"
              >
                <Play className="w-4 h-4 mr-2" />
                Guardar y practicar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UploadAiken;
