import { StyleSheet, Text, View } from "react-native";
import {
  progressToPercentage,
  sanitizeDownloadProgress,
} from "../utils/sanitizeProgress";

interface DownloadStateProps {
  downloadProgress: number;
}

export function DownloadState({ downloadProgress }: DownloadStateProps) {
  const sanitizedProgress = sanitizeDownloadProgress(downloadProgress);
  const progressPercentage = progressToPercentage(downloadProgress);

  return (
    <View style={styles.container}>
      {/* Barra de progreso nativa */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View
            style={[styles.progressFill, { width: `${progressPercentage}%` }]}
          />
        </View>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {sanitizedProgress === 1
            ? "Modelo listo"
            : `Descargando... ${progressPercentage}%`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "50%",
    width: "80%",
    padding: 20,
    backgroundColor: "#333",
    borderRadius: 8,
    gap: 12,
  },
  progressContainer: {
    width: "100%",
    marginBottom: 12,
  },
  progressBackground: {
    width: "100%",
    height: 8,
    backgroundColor: "#555",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 4,
    minWidth: 2, // Mínimo ancho visible
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
});
