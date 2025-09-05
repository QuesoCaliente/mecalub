import { ActivityIndicator } from "react-native";
import { Image, Text, View } from "tamagui";

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
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        marginVertical: 8,
      }}
    >
      {left && (
        <Image
          source={{ uri: imageSource }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            marginRight: 8,
            borderWidth: 2,
            borderColor: "#e0e0e0",
          }}
        />
      )}
      <View
        style={{
          backgroundColor: "#f5f6fa",
          borderRadius: 16,
          paddingVertical: 10,
          paddingHorizontal: 16,
          maxWidth: "75%",
          boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#888" />
        ) : (
          <Text style={{ color: "#222", fontSize: 16, lineHeight: 22 }}>
            {message}
          </Text>
        )}
      </View>
      {!left && (
        <Image
          source={{ uri: imageSource }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            marginLeft: 8,
            borderWidth: 2,
            borderColor: "#e0e0e0",
          }}
        />
      )}
    </View>
  );
}
