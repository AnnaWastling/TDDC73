import React,{useState} from 'react'
import { Text, FlatList, Pressable, View, Image } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import { Dropdown } from 'react-native-element-dropdown';
import Loading from './Loading'
import styles from './styles'
import star from '../star.png'
//https://docs.github.com/en/graphql/overview/explorer
//https://docs.github.com/en/graphql/guides/forming-calls-with-graphql
//caching using Query
//https://docs.github.com/en/graphql/reference/objects#repository
const GITHUB_QUERY = gql`
  query MyQuery($Query: String!) {
    search(query: $Query, type: REPOSITORY, first: 20) {
      nodes {
        ... on Repository {
          id
          description
          stargazerCount
          nameWithOwner
          name
          forkCount
        }
      }
    }
  }
`;

  const language = [
    { label: 'JavaScript', value: 'JavaScript' },
    { label: 'Java', value: 'Java' },
    { label: 'Go', value: 'Go' },
    { label: 'Rust', value: 'Rust' },
    { label: 'TypeScript', value: 'TypeScript' },
    { label: 'Swift', value: 'Swift' },
    { label: 'C#', value: 'C#' },
    { label: 'C++', value: 'C++' },
    { label: 'Python', value: 'Python' },
    { label: 'PHP', value: 'PHP' },
    { label: 'Ruby', value: 'Ruby' },
    { label: 'CSS', value: 'CSS' },
  ];
const DropdownComponent = ({ chosenLanguage, updateLanguage }) => {
  return (
      <View>
          <Dropdown
              data={language}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Language"
              value={chosenLanguage}
              onChange={item => {updateLanguage(item.value);
              }}
          />
      </View>
  );
};
const RepositoryItem = ({ project, onPress }) => {
  return (
    <Pressable style={styles.item} onPress={onPress}>
      <Text style={styles.header}>{project.name}</Text>
      <View style={styles.row}>
      <Image style={styles.tinyLogo} source={star}/>
      <Text>{project.stargazerCount}</Text>
      </View>
      <Text style={styles.subheader}>{project.description}</Text>
    </Pressable>
  );
};

export default ({ navigation }) => {
    const [chosenLanguage, updateLanguage] = useState("any");

    const { data, loading, error } = useQuery(GITHUB_QUERY,
    {variables: {Query: 'stars:>1000 language:' + chosenLanguage}, //asking to only get result with more than 1000 stars in the chosen language
    }) //hook https://www.apollographql.com/docs/react/data/queries/

    if (loading) {
      return <Loading />
    }
    else if (error) {
      console.log(error);
    }
    const repositories = data.search.nodes;
    return (
    <View>
      <DropdownComponent language={chosenLanguage} updateLanguage={updateLanguage} />
      <FlatList
        data={repositories}
            renderItem={({ item }) => (
                <RepositoryItem
                  project={item}
                  onPress={() => navigation.navigate('Info', { repository: item })} //send chosen repository to infoScreen
                />
            )}
        keyExtractor={(item) => item.id.toString()} //part of flatlist, used to extract a unique key that is used for caching
      />
    </View>

    )
}