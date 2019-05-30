import * as React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Firebase from '../Firebase';

class Chat extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'UserName',
    headerStyle: {
        backgroundColor: '#fd0759',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
  });
  componentDidMount() {
    Firebase.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  state = {
    messages: [],
  };

  get user() {
    return {
      name: this.props.navigation.state.params.name,
      _id: Firebase.shared.uid,
    };
  }
  
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        user={this.user}
        onSend={Firebase.shared.send}
      />
    );
  }
  componentWillUnmount() {
    Firebase.shared.off();
  }
}
export default Chat;
