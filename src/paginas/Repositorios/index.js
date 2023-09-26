import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';

import { pegarRepositorios, pesquisarRepositorios } from '../../servicos/requisicoes/repositorios';

import estilos from './estilos';
import { useIsFocused } from '@react-navigation/native';

export default function Repositorios({ route, navigation }) {
  const [repo, setRepo] = useState([]);
  const estaNaTela = useIsFocused()
  const [repositorio, setRepositorio] = useState({});

  useEffect(() => {
    const teste = async () => {
      const resultado = await pegarRepositorios(route.params.login)
        setRepo(resultado)
      console.log(resultado)
    }
    teste();

  }, [estaNaTela])

  async function pesquisar() {
    const resultadoBusca = await pesquisarRepositorios(repositorio);

    if (resultadoBusca){
      setRepo(resultadoBusca);
    } else {
      setRepo(resultado);
    }
  }

  return (
    <View style={estilos.container}>
      <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
      <TouchableOpacity
        style={estilos.botao}
        onPress={() => navigation.navigate('CriarRepositorio', { id: route.params.id })}
      >
        <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
      </TouchableOpacity>
      <View style={estilos.pesquisa}>
        <TextInput
          placeholder='busque por um repositorio'
          autoCapitalize="none"
          style={estilos.entrada}
          value={repositorio}
          onChangeText={setRepositorio}
        />
        <TouchableOpacity style={estilos.botaoPesquisa} onPress={pesquisar}>
          <Text style={estilos.textoBotao}>
            Buscar
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={repo}
        style={{ width: '100%' }}
        keyExtractor={repo => repo.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={estilos.repositorio}
            onPress={() => navigation.navigate('InfoRepositorio', { item })}
          >
            <Text style={estilos.repositorioNome}>{item.name}</Text>
            <Text style={estilos.repositorioData}>Atualiado em {item.data}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
