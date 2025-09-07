/**
 * Función especial para sanitizar downloadProgress y evitar errores de precisión
 * en React Native bridge y componentes UI
 */
export function sanitizeDownloadProgress(
  progress: number | undefined | null
): number {
  // Verificar si es un número válido
  if (!progress || typeof progress !== "number" || isNaN(progress)) {
    return 0;
  }

  // Si es negativo, establecer a 0
  if (progress < 0) {
    return 0;
  }

  // Si es mayor o igual a 1, establecer a 1
  if (progress >= 1) {
    return 1;
  }

  // Si es muy pequeño (menor a 0.01), establecer a 0 para evitar problemas de precisión
  if (progress < 0.01) {
    return 0;
  }

  // Para valores intermedios, redondear a 2 decimales (0.01, 0.02, 0.03, etc.)
  // Esto evita números como 0.0000069338465535424045 que causan el error
  return Math.round(progress * 100) / 100;
}

/**
 * Convierte el progreso sanitizado a porcentaje entero para mostrar en UI
 */
export function progressToPercentage(progress: number): number {
  const sanitized = sanitizeDownloadProgress(progress);
  return Math.round(sanitized * 100);
}
