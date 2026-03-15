import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { getContents } from "@/database/contentRepository";
import { Content } from "@/database/contentTypes";
import { spacing } from "@/theme/spacing";
import PosterCard from "@/components/PosterCard";
import Container from "@/components/Container";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Main"
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    loadContents();
  }, []);

  async function loadContents() {
    const data = await getContents();
    setContents(data);
  }

  return (
    <Container>
      <Text style={styles.title}>Continue Watching</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
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
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    marginTop: 10,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
});
