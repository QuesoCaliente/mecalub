import { Link } from "expo-router";
import { Bot } from "lucide-react-native";
import { Image, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/mecalub-logo-sinfondo-white.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.buttonsContainer}>
        <Link style={styles.button} href="/chat">
          <Bot
            size={28}
            style={{ backgroundColor: "#d12121ff", height: "100%" }}
            color="#fff"
          />
          <Text style={styles.buttonText}>Chat</Text>
        </Link>
        <Link style={styles.button} href="/chat">
          <Text style={styles.buttonText}>🖼️ Reconocimiento de imagenes</Text>
        </Link>
      </View>
      <View style={styles.alertContainer}>
        <Text style={{ color: "#a00", fontWeight: "600" }}>
          Esta aplicación es una versión de prueba. La precisión de las
          respuestas puede variar y no debe ser utilizada para decisiones
          críticas.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1b1b",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  alertContainer: {
    backgroundColor: "#ffdddd",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
    textAlign: "center",
  },
  buttonsContainer: {
    width: "100%",
    gap: 20,
  },
  button: {
    width: "100%",
    backgroundColor: "#474747ff",
    borderRadius: 8,
    textAlign: "center",
    color: "#fff",
    padding: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    backgroundColor: "blue",
    fontWeight: "500",
  },
  logo: {
    maxWidth: 300,
  },
});
