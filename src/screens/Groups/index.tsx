import { useState } from 'react';
import { FlatList } from 'react-native';
import { Container } from './styles';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { useNavigation } from '@react-navigation/native';

export function Groups() {

  const [groups, setGroups] = useState([]);


  const navigation = useNavigation();
  function handleNewGroup(){
    navigation.navigate('groups');
  }

  return (
    <Container>
      <Header/>
      <Highlight
        title='Turmas'
        subtitle="Jogue com a sua turma"
      />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <GroupCard title={item}
        />)}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={() => <ListEmpty message='Que tal cadastrar a primeira turma?'/>}
        showsVerticalScrollIndicator={false}
      />
      <Button
        title='Criar nova turma'
        onPress={handleNewGroup}
      />
      
    </Container>
  );
}