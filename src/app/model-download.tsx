import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useLLM } from "react-native-executorch";
import { Text, YStack } from "tamagui";

import tokenizer from "@/src/core/models/llama32/tokenizer.json";
import tokenizerConfig from "@/src/core/models/llama32/tokenizer_config.json";

export default function ModelDownloadScreen() {
  const [downloadStatus, setDownloadStatus] = useState<{
    isDownloading: boolean;
    progress: number;
    isComplete: boolean;
    error: string | null;
  }>({
    isDownloading: false,
    progress: 0,
    isComplete: false,
    error: null,
  });

  const [filesInfo, setFilesInfo] = useState<any[]>([]);

  const llm = useLLM({
    model: {
      modelSource:
        "https://huggingface.co/software-mansion/react-native-executorch-llama-3.2/resolve/main/llama-3.2-1B/QLoRA/llama3_2_qat_lora.pte",
      tokenizerSource: tokenizer,
      tokenizerConfigSource: tokenizerConfig,
    },
    preventLoad: true, // Prevenir carga automática
  });

  // Verificar archivos descargados
  const checkDownloadedFiles = async () => {
    try {
      const executorchPath =
        FileSystem.documentDirectory + "react-native-executorch/";

      console.log("🔍 Verificando ruta ExecuTorch:", executorchPath);

      try {
        const executorchDir = await FileSystem.readDirectoryAsync(
          executorchPath
        );
        console.log("🤖 Archivos en react-native-executorch:", executorchDir);

        const fileInfos = [];
        for (const file of executorchDir) {
          const filePath = executorchPath + file;
          const fileInfo = await FileSystem.getInfoAsync(filePath);
          fileInfos.push({
            name: file,
            size: "size" in fileInfo ? fileInfo.size : 0,
            sizeInMB: ("size" in fileInfo ? fileInfo.size : 0) / 1024 / 1024,
            exists: fileInfo.exists,
            modificationTime:
              "modificationTime" in fileInfo ? fileInfo.modificationTime : null,
          });
        }
        setFilesInfo(fileInfos);

        // Verificar si el modelo principal está descargado
        const modelExists = fileInfos.some((f) => f.name.includes(".pte"));
        if (modelExists) {
          setDownloadStatus((prev) => ({ ...prev, isComplete: true }));
        }
      } catch (error) {
        console.log("❌ Directorio react-native-executorch no existe aún");
        setFilesInfo([]);
      }
    } catch (error) {
      console.error("Error verificando directorios:", error);
      setDownloadStatus((prev) => ({
        ...prev,
        error: "Error verificando directorios",
      }));
    }
  };

  // Inicializar descarga del modelo
  const startDownload = async () => {
    try {
      setDownloadStatus({
        isDownloading: true,
        progress: 0,
        isComplete: false,
        error: null,
      });

      // La descarga se inicia automáticamente cuando se usa useLLM
      // Solo necesitamos monitorear el progreso
      console.log("🚀 Iniciando descarga del modelo...");
    } catch (error) {
      console.error("Error iniciando descarga:", error);
      setDownloadStatus((prev) => ({
        ...prev,
        isDownloading: false,
        error: "Error iniciando descarga",
      }));
    }
  };

  // Monitorear el estado del LLM
  useEffect(() => {
    if (!llm) return;

    const status = {
      isReady: llm.isReady || false,
      isGenerating: llm.isGenerating || false,
      downloadProgress: llm.downloadProgress || 0,
      isDownloading: (llm.downloadProgress || 0) > 0 && !(llm.isReady || false),
    };

    console.log("🤖 Estado del LLM:", status);

    setDownloadStatus((prev) => ({
      ...prev,
      isDownloading: status.isDownloading,
      progress: status.downloadProgress,
      isComplete: status.isReady,
    }));
  }, [llm.isReady, llm.isGenerating, llm.downloadProgress]);

  // Verificar archivos al cargar la página
  useEffect(() => {
    checkDownloadedFiles();
    const interval = setInterval(() => {
      if (downloadStatus.isDownloading || !downloadStatus.isComplete) {
        checkDownloadedFiles();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [downloadStatus.isDownloading, downloadStatus.isComplete]);

  //     return () => clearInterval(interval);
  //   }, [downloadStatus.isDownloading]);

  return (
    <YStack gap={"$1"} style={styles.container}>
      <Text style={{ color: "#fff", fontSize: 24, marginBottom: 20 }}>
        {downloadStatus.isComplete
          ? "Modelo descargado"
          : "Descarga del modelo"}
      </Text>
      <Text style={{ color: "#ccc", marginBottom: 20 }}>
        {downloadStatus.isDownloading
          ? `Descargando... ${Math.round(downloadStatus.progress * 100)}%`
          : null}
      </Text>
    </YStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
  },
});
