import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Keyboard,
  Modal,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Container from "@/components/Container";
import Button from "@/components/Button";

import {
  searchMovies,
  getPosterUrl,
  searchSeries,
} from "@/services/tmdbService";
import { addContent } from "@/database/contentRepository";

import { spacing } from "@/theme/spacing";
import { useTheme } from "@/theme/useTheme";

export default function AddContentScreen() {
  const { theme } = useTheme();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [platform, setPlatform] = useState("");
  const [showPlatformModal, setShowPlatformModal] = useState(false);

  const platforms = [
    { name: "Netflix", icon: "netflix", color: "#E50914" },
    { name: "Prime Video", icon: "play-circle-outline", color: "#00A8E1" },
    { name: "Disney+", icon: "castle", color: "#113CCF" },
    { name: "HBO Max", icon: "television", color: "#5A2D82" },
    { name: "Apple TV+", icon: "apple", color: "#555555" },
    { name: "Outra", icon: "skull-crossbones-outline", color: "#A1A1A1" },
  ];

  const route = useRoute();
  const { type } = route.params as { type: "movie" | "series" };

  async function handleSearch(text: string) {
    setQuery(text);
    let data;

    if (type === "movie") {
      data = await searchMovies(text);
    } else {
      data = await searchSeries(text);
    }

    setResults(data);
  }

  async function handleSave() {
    if (!selected) return;

    // Detecta se é série ou filme
    const isSeries = !!selected.season_number || !!selected.episode_number;

    await addContent({
      title: selected.title || selected.name,
      type: type,
      platform: platform,
      poster: getPosterUrl(selected.poster_path),
      progress: 0,
      status: "watching",
      season: type === "series" ? 1 : null,
      episode: type === "series" ? 1 : null,
      duration:
        selected.runtime ??
        (selected.episode_runtime ? selected.episode_runtime[0] : null),
      rating: selected.vote_average ?? null,
    });

    // Limpa estado da busca
    setQuery("");
    setResults([]);
    setSelected(null);
    setPlatform("");
  }

  return (
    <Container>
      <TextInput
        placeholder={type === "series" ? "Buscar Série..." : "Buscar Filme..."}
        placeholderTextColor="#999"
        value={query}
        onChangeText={handleSearch}
        style={[styles.input, { color: theme.text, borderColor: theme.border }]}
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.resultItem}
            onPress={() => {
              Keyboard.dismiss();
              setSelected(item);
              setShowPlatformModal(true);
            }}
          >
            <Image
              source={{ uri: getPosterUrl(item.poster_path) }}
              style={styles.poster}
            />

            <Text style={{ color: theme.text }}>{item.title || item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {selected && (
        <View style={styles.selected}>
          <Text style={{ color: theme.text }}>
            Selecionado: {selected.title || selected.name}
          </Text>

          <TouchableOpacity
            style={[styles.input, { borderColor: theme.border }]}
            onPress={() => setShowPlatformModal(true)}
          >
            <Text style={{ color: platform ? theme.text : "#999" }}>
              {platform || "Selecionar plataforma"}
            </Text>
          </TouchableOpacity>

          <Button title="Salvar" onPress={handleSave} />
        </View>
      )}

      <Modal visible={showPlatformModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalBox, { backgroundColor: theme.background }]}
          >
            <Text style={{ color: theme.text, marginBottom: 12 }}>
              Escolha a plataforma
            </Text>

            {platforms.map((item) => (
              <TouchableOpacity
                key={item.name}
                style={styles.platformItem}
                onPress={() => {
                  setPlatform(item.name);
                  setShowPlatformModal(false);
                }}
              >
                <View style={styles.platformRow}>
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={32}
                    color={item.color}
                  />

                  <Text
                    style={{ color: theme.text, marginLeft: 12, fontSize: 18 }}
                  >
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </Container>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: spacing.sm,
    borderRadius: 8,
    marginBottom: spacing.md,
  },

  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },

  poster: {
    width: 40,
    height: 60,
    marginRight: spacing.sm,
  },

  selected: {
    marginTop: spacing.lg,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "80%",
    padding: 20,
    borderRadius: 12,
  },

  platformItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },

  platformRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
