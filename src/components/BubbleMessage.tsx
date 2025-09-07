import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

interface BubbleMessageProps {
  imageSource: string;
  message: string;
  isLoading: boolean;
  left?: boolean;
}

export function BubbleMessage({
  imageSource,
  message,
  left,
  isLoading,
}: BubbleMessageProps) {
  return (
    <View style={styles.container}>
      {left && (
        <Image source={{ uri: imageSource }} style={styles.avatarLeft} />
      )}
      <View style={styles.bubble}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#888" />
        ) : (
          <Text style={styles.messageText}>{message}</Text>
        )}
      </View>
      {!left && (
        <Image source={{ uri: imageSource }} style={styles.avatarRight} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "flex-end",
    marginVertical: 8,
  },
  avatarLeft: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  avatarRight: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  bubble: {
    backgroundColor: "#f5f6fa",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    maxWidth: "75%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    color: "#222",
    fontSize: 16,
    lineHeight: 22,
  },
});
