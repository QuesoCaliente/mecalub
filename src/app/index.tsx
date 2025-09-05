import { StyleSheet } from "react-native";

import tokenizer from "@/src/core/models/llama32/tokenizer.json";
import tokenizerConfig from "@/src/core/models/llama32/tokenizer_config.json";
import { useState } from "react";
import { useLLM } from "react-native-executorch";
import { Button, Input, Theme, View, YStack } from "tamagui";
import { BubbleMessage } from "../components/BubbleMessage";

export default function Chat() {
  const [value, setValue] = useState("");

  const llm = useLLM({
    model: {
      modelSource:
        "https://huggingface.co/software-mansion/react-native-executorch-llama-3.2/resolve/main/llama-3.2-1B/QLoRA/llama3_2_qat_lora.pte",
      tokenizerSource: tokenizer,
      tokenizerConfigSource: tokenizerConfig,
    },
  });

  const sendMessage = async () => {
    console.log("Testing LLM...");
    console.log("LLM instance:", llm);
    if (!llm || !llm.isReady || llm.isGenerating) return;
    llm.configure({
      chatConfig: {
        systemPrompt: "You are a helpful assistant.",
        contextWindowLength: 2048,
      },
    });
    llm.sendMessage(value);
  };

  return (
    <YStack
      alignItems="center"
      flex={1}
      style={{
        flex: 1,
        backgroundColor: "#212121",
      }}
    >
      <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
        {llm.messageHistory.map((msg, index) => (
          <BubbleMessage
            key={index}
            imageSource={
              msg.role === "user"
                ? "https://i.pravatar.cc/300?img=3"
                : "https://i.pravatar.cc/300?img=5"
            }
            message={msg.content}
            left={msg.role !== "user"}
            isLoading={false}
          />
        ))}
      </View>
      <View display="flex" alignItems="center" style={{ width: "100%" }}>
        <Input
          value={value}
          onChangeText={setValue}
          placeholder="Type something..."
          style={styles.input}
        />
        <Theme name="dark">
          <Theme name="blue">
            <Button width="100%" onPress={sendMessage} theme="subtle">
              Enviar
            </Button>
          </Theme>
        </Theme>
      </View>
    </YStack>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    padding: 12,
    width: "90%",
    marginBottom: 10,
  },
});
