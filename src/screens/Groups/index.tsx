import { useState, useCallback} from "react";
import { Alert, FlatList } from "react-native";
import { Container } from "./styles";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { groupsGetAll } from "@storage/groupsGetAll";
import { Loading } from "@components/Loading";

export function Groups() {

  const [isLoading, setIsLoading] = useState(true);

  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  async function fetchGroups() {
    try{
      setIsLoading(true);
      const data = await groupsGetAll();
      setGroups(data);
    }catch (error){
      console.log(error);
      Alert.alert('Turmas', 'Não foi possível carregar as turmas');
    } finally {
      setIsLoading(false); // Dessa forma caso aconteça algum erro ele finaliza o na busca dos grupos ele finaliza o loading
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group });
  }

  function handleNewGroup() {
    navigation.navigate("new");
  }

  // Use focus para atualizar a lista 
  // use callback para executar o fetch quando o componente for renderizado sem executar desnecessariamente
  useFocusEffect(useCallback(() => {
    fetchGroups();
  },[]));

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      {
        isLoading ? <Loading /> :
        <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item}  onPress={() => handleOpenGroup(item)}/>}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => <ListEmpty message="Que tal cadastrar a primeira turma?" />}
        showsVerticalScrollIndicator={false}
        />
      }
      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
