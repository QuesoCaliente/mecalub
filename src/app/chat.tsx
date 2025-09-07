import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import tokenizer from "@/src/core/models/llama32/tokenizer.json";
import tokenizerConfig from "@/src/core/models/llama32/tokenizer_config.json";
import { useEffect, useState } from "react";
import { useLLM } from "react-native-executorch";
import { BubbleMessage } from "../components/BubbleMessage";
import { DownloadState } from "../components/DownloadState";
import { sanitizeDownloadProgress } from "../utils/sanitizeProgress";

export default function Chat() {
  const [value, setValue] = useState("");
  const [downloadProgress, setDownloadProgress] = useState(0);

  const llm = useLLM({
    model: {
      modelSource:
        "https://huggingface.co/software-mansion/react-native-executorch-llama-3.2/resolve/main/llama-3.2-1B/QLoRA/llama3_2_qat_lora.pte",
      tokenizerSource: tokenizer,
      tokenizerConfigSource: tokenizerConfig,
    },
  });

  useEffect(() => {
    if (llm) {
      llm.configure({
        chatConfig: {
          systemPrompt: `You are a helpful assistant, answers in spanish only. current date is ${new Date().toString()}`,
        },
      });
    }
  }, []);

  useEffect(() => {
    console.log("LLM state changed", llm);
    if (llm) {
      const sanitizedProgress = sanitizeDownloadProgress(llm.downloadProgress);
      setDownloadProgress(sanitizedProgress);
    }
  }, [llm.downloadProgress]);

  const sendMessage = async () => {
    console.log("sendMessage", { llm, value });
    if (!llm || !llm.isReady || llm.isGenerating) return;

    llm.sendMessage(value);
  };

  const llmIsReady = llm && llm.isReady && !llm.isGenerating;

  return (
    <View style={styles.container}>
      <DownloadState downloadProgress={downloadProgress} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.messagesContainer}>
          {llm.messageHistory.map((msg, index) => (
            <View key={index} style={styles.messageItem}>
              <BubbleMessage
                imageSource={
                  msg.role === "user"
                    ? "https://i.pravatar.cc/300?img=3"
                    : "https://i.pravatar.cc/300?img=5"
                }
                message={msg.content}
                left={msg.role !== "user"}
                isLoading={false}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder="Escribe tu mensaje..."
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={[styles.button, !llmIsReady && styles.buttonDisabled]}
          disabled={!llmIsReady}
          onPress={sendMessage}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1b1b",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  scrollView: {
    width: "100%",
    flex: 1,
  },
  messagesContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
  },
  messageItem: {
    width: "100%",
    marginVertical: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  input: {
    padding: 12,
    flex: 1,
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: 8,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    minWidth: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
