import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { drop, getContents, getMovies } from "@/database/contentRepository";
import { Content } from "@/database/contentTypes";
import { spacing } from "@/theme/spacing";
import PosterCard from "@/components/PosterCard";
import Container from "@/components/Container";
import { colors } from "@/theme/colors";
import { useTheme } from "@/theme/useTheme";
import { typography } from "@/theme/typography";
import FAB from "@/components/FAB";
import Button from "@/components/Button";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Main"
>;

export default function MoviesScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    loadContents();
  }, []);

  async function loadContents() {
    const data = await getMovies();
    setContents(data);
  }

  return (
    <Container>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Continue Watching
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.grid}>
          {contents.map((item) => (
            <PosterCard
              key={item.id}
              title={item.title}
              poster={item.poster ?? ""}
              progress={item.progress ?? 0}
              onPress={() => navigation.navigate("Detalhes", { content: item })}
            />
          ))}
        </View>
      </ScrollView>

      <FAB
        onPress={() =>
          navigation.navigate("Adicionar", { type: "movie" } as any)
        }
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    ...typography.title,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
});
