import React from 'react';
import { StyleSheet,Text} from 'react-native';
import { Container, Form, Input, Item, Button, Label } from 'native-base'
class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title:'LCO Chat Room',
    headerStyle: {
        backgroundColor: '#fd0759',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
  });

  state = 
  {
    name: '',
  };

  render() {
    return (
   
      <Container style={styles.container}>
      <Form>
        <Item floatingLabel>
        <Item floatingLabel></Item>
              <Label>Username</Label>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={this.onChangeText}
            onChangeText={name => this.setState({ name })}
          />
        </Item>  
        <Button style={{ marginTop: 20 }}
          full
          rounded
          success  
          onPress={() =>  this.props.navigation.navigate('Chat', { name: this.state.name })}
        >
          <Text style={{ color: 'white' }}> Start Chat</Text>
         </Button>
      </Form>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
});

export default Home;
