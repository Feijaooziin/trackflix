import { View, Text, StyleSheet, ScrollView } from "react-native";
import Container from "@/components/Container";
import PosterCard from "@/components/PosterCard";
import ProgressBar from "@/components/ProgressBar";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { useTheme } from "@/theme/useTheme";
import { useNavigation } from "@react-navigation/native";
import FAB from "@/components/FAB";

export default function TestScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const continueWatching = [
    {
      id: "1",
      title: "Scott Pilgrim Takes Off",
      poster:
        "https://image.tmdb.org/t/p/original/rsYIfv87omjFZlVoKqzXZrEyk2k.jpg",
      progress: 45,
    },
    {
      id: "2",
      title: "Um Cabra Bom de Bola",
      poster:
        "https://image.tmdb.org/t/p/original/x0SRTrltSJi1iQiIAUpyvkxnr41.jpg",
      progress: 90,
    },
    {
      id: "3",
      title: "Stranger Things",
      poster: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
      progress: 15,
    },
  ];

  const posters = [
    {
      id: "1",
      title: "Scott Pilgrim vs. the World",
      poster:
        "https://image.tmdb.org/t/p/original/gBfeXTFkFXD9ts61NZ4oNjJelRN.jpg",
    },
    {
      id: "2",
      title: "The Batman",
      poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    },
    {
      id: "3",
      title: "Interstellar",
      poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    },
    {
      id: "4",
      title: "Dune",
      poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    },
    {
      id: "5",
      title: "Avatar",
      poster: "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
    },
  ];

  return (
    <Container>
      <ScrollView>
        {/* Continue Watching */}

        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Continue Watching
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {continueWatching.map((item) => (
            <View key={item.id} style={styles.posterContainer}>
              <PosterCard title={item.title} poster={item.poster} />

              <ProgressBar progress={item.progress} />
            </View>
          ))}
        </ScrollView>

        {/* Grid de posters */}

        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Popular
        </Text>

        <View style={styles.grid}>
          {posters.map((item) => (
            <PosterCard key={item.id} title={item.title} poster={item.poster} />
          ))}
        </View>
      </ScrollView>
      <FAB onPress={() => navigation.navigate("Adicionar" as never)} />
    </Container>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    ...typography.title,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },

  posterContainer: {
    marginRight: spacing.md,
    width: 120,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
});
