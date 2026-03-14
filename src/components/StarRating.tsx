import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";

interface StarRatingProps {
  rating: number;
  onChange: (value: number) => void;
}

export default function StarRating({ rating, onChange }: StarRatingProps) {
  return (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => onChange(star)}>
          <Ionicons
            name={star <= rating ? "star" : "star-outline"}
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}
