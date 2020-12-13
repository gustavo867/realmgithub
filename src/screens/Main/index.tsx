import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Repository from '../../components/Repository';

import api from '../../services/api';
import getRealm from '../../services/realm';

import { Container, Title, Form, Input, Submit, List } from './styles';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
}

interface Repositories {
  id: number;
  name: string;
  stars: number;
  forks: number;
  description: string;
}

const Main: React.FC = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [repositories, setRepositories] = useState<Repositories[]>([]);

  useEffect(() => {
    async function loadRepositories() {
      const realm = await getRealm();

      const data: any = realm.objects('Repository').sorted('stars', true);

      setRepositories(data);
    }

    loadRepositories();
  }, []);

  async function handleRefreshRepository(repository: { fullName: string }) {
    const response = await api.get(`/repos/${repository.fullName}`);

    const data = await saveRepository(response.data);

    setRepositories(
      repositories.map((repo) => (repo.id === data.id ? data : repo))
    );
  }

  const saveRepository = useCallback(async (repository: Repository) => {
    const data = {
      id: repository.id,
      name: repository.name,
      fullName: repository.full_name,
      description: repository.description,
      stars: repository.stargazers_count,
      forks: repository.forks_count,
    };

    const realm = await getRealm();

    realm.write(() => {
      realm.create('Repository', data, 'modified');
    });

    return data;
  }, []);

  async function handleAddRepository() {
    try {
      const res = await api.get(`/repos/${input}`);

      await saveRepository(res.data);

      setInput('');
      setError(false);
      Keyboard.dismiss();
    } catch (err) {
      console.tron.warn('Erro');
      setError(true);
    }
  }

  return (
    <Container>
      <Title>Repositórios</Title>
      <Form>
        <Input
          error={error}
          value={input}
          onChangeText={(text) => setInput(text)}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Procurar um repositório"
        />
        <Submit onPress={() => handleAddRepository()}>
          <Icon name="add" size={22} color="#FFF" />
        </Submit>
      </Form>
      <List
        keyboardShouldPersistTaps="handled"
        data={repositories}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={({ item }: any) => (
          <Repository
            item={item}
            onRefresh={() => handleRefreshRepository(item)}
          />
        )}
      />
    </Container>
  );
};

export default Main;
