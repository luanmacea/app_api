import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';

import { pegarRepositorios } from '../../servicos/requisicoes/repositorios';

import estilos from './estilos';
import { useIsFocused } from '@react-navigation/core';

export default function Repositorios({ route, navigation }) {
  const [repo, setRepo] = useState([]);
  const estaNaTela = useIsFocused()

  useEffect( async () => {
    const resultado = await pegarRepositorios(route.params.id);
    setRepo(resultado);
  }, [])

  return (
    <View style={estilos.container}>
      <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
      <TouchableOpacity
        style={estilos.botao}
        onPress={() => navigation.navigate('CriarRepositorio')}
      >
        <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
      </TouchableOpacity>

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
