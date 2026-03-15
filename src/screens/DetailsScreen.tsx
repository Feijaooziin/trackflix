import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import Container from "@/components/Container";
import ProgressBar from "@/components/ProgressBar";
import Button from "@/components/Button";
import { updateProgress } from "@/database/contentRepository";
import { Content } from "@/database/contentTypes";

type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Detalhes"
>;

export default function DetailsScreen() {
  const route = useRoute();
  const { content } = route.params as any;

  async function handleUpdateProgress() {
    const newProgress = content.progress + 10;
    await updateProgress(content.id, newProgress);
  }

  return (
    <Container>
      <Image source={{ uri: content.poster ?? "" }} style={styles.poster} />

      <Text style={styles.title}>{content.title}</Text>

      <Text style={styles.info}>
        {content.platform} • {content.type}
      </Text>

      <View style={styles.section}>
        <Text>Temporada: {content.season}</Text>
        <Text>Episódio: {content.episode}</Text>
        <Text>Duração: {content.duration} min</Text>
      </View>

      <ProgressBar progress={content.progress ?? 0} />

      <Button title="Assistir +10 min" onPress={handleUpdateProgress} />
    </Container>
  );
}

const styles = StyleSheet.create({
  poster: {
    width: "100%",
    height: 400,
    borderRadius: 16,
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
  },

  info: {
    opacity: 0.7,
    marginBottom: 20,
  },

  section: {
    marginBottom: 20,
    gap: 6,
  },
});
