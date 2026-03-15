import { Content } from "@/database/contentTypes";

export type RootStackParamList = {
  Main: undefined;
  Detalhes: { content: Content };
  Adicionar: undefined;
};
