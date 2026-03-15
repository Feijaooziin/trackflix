import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import Container from "@/components/Container";
import Button from "@/components/Button";

import { searchMovies, getPosterUrl } from "@/services/tmdbService";
import { addContent } from "@/database/contentRepository";

import { spacing } from "@/theme/spacing";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";

export default function AddContentScreen() {
  const { theme } = useTheme();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [platform, setPlatform] = useState("");

  async function handleSearch(text: string) {
    setQuery(text);

    if (text.length < 2) {
      setResults([]);
      return;
    }

    const data = await searchMovies(text);

    setResults(data);
  }

  async function handleSave() {
    if (!selected) return;

    // Detecta se é série ou filme
    const isSeries = !!selected.season_number || !!selected.episode_number;

    await addContent({
      title: selected.title || selected.name,
      type: isSeries ? "series" : "movie",
      platform: platform,
      poster: getPosterUrl(selected.poster_path),
      progress: 0,
      status: "watching",
      season: isSeries ? (selected.season_number ?? null) : null,
      episode: isSeries ? (selected.episode_number ?? null) : null,
      duration: selected.runtime ?? selected.episode_runtime ?? null,
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
        placeholder="Buscar filme ou série..."
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
            onPress={() => setSelected(item)}
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

          <TextInput
            placeholder="Plataforma (Netflix, Prime...)"
            placeholderTextColor="#999"
            value={platform}
            onChangeText={setPlatform}
            style={[
              styles.input,
              { color: theme.text, borderColor: theme.border },
            ]}
          />

          <Button title="Salvar" onPress={handleSave} />
        </View>
      )}
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
});
