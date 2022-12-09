import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import styles from './styles'
import Loading from './Loading'

const PROJECT_QUERY = gql`
  query project($id: ID!) {
    node(id: $id) {
      id
      ... on Repository {
        id
        name
        description
        licenseInfo {
          name
          nickname
          description
        }
        defaultBranchRef {
          target {
            ... on Commit {
              id
              history {
                totalCount
              }
            }
          }
        }
        stargazerCount
        forkCount
      }
    }
  }
`;


export default ({ route }) => {
  const { data, loading, error } = useQuery(PROJECT_QUERY, {
    variables: { id: route.params.repository.id },
  });

  if (loading) {
    return <Loading />
  }
    else if(error){
        console.log(error);
    }
  const projectInfo = data.node;

  return (
   <View>
       <View>
         <Text style={styles.header}>
           {projectInfo.name}
         </Text>
         <Text>{projectInfo.description}</Text>
       </View>
       <View>
         <View>
           <Text>License: </Text>
           <Text>
             {projectInfo.licenseInfo ? projectInfo.licenseInfo.name : 'None'}
           </Text>
         </View>
         <View>
           <Text>Number of Commits: </Text>
           <Text>{projectInfo.defaultBranchRef.target.history.totalCount}</Text>
         </View>
         <View>
           <Text>Number of Stars: </Text>
           <Text>{projectInfo.stargazerCount}</Text>
         </View>
         <View>
           <Text>Number of Forks: </Text>
           <Text>{projectInfo.forkCount}</Text>
         </View>
       </View>
     </View>
  )
}