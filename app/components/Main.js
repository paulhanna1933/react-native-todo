import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView
} from 'react-native';


import { FontAwesome, Octicons } from '@expo/vector-icons';


import Note from './Note';



export default class Main extends React.Component {



constructor(props) {
  super(props);
  this.state = {
    noteArray: [],
    noteText: '',
  }
}

render() {
  let notes = this.state.noteArray.map((val, key) => {
    return <Note key={key} keyval={key} val={val}
            deleteMethod={ () => this.deleteNote(key) } />
  });


return (

    <KeyboardAvoidingView behavior='padding'  style={styles.container}>

      <StatusBar barStyle="light-content"/>

    <View style={styles.header}>
      <Text style={styles.headerText}><Octicons name="tasklist" size={30}  /> Todo List</Text>
    </View>

    <ScrollView style={styles.scrollContainer}>
      {notes}
    </ScrollView>
    <View>
    <ScrollView style={styles.footer}>

        <TextInput
          style={styles.textInput}
          onChangeText={(noteText) => this.setState({noteText})}
          value={this.state.noteText}
          placeholder='Add note'
          placeholderTextColor='rgba(255, 255, 255, 0.7)'
          underlineColorAndroid='transparent'
          returnKeyType='next'

        />

    </ScrollView>

      <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButton}>
        <Text style={styles.addButtonText}>
          <FontAwesome name="plus" size={25}/>
        </Text>
      </TouchableOpacity>
    </View>

  </KeyboardAvoidingView>

);
}

addNote() {
  if (this.state.noteText) {
    var d = new Date();
    this.state.noteArray.push({
      'date':d.getFullYear() +
      '/' + (d.getMonth() + 1) +
      '/' + d.getDate(),
      'note': this.state.noteText
    });
    this.setState({ noteArray: this.state.noteArray })
    this.setState({ noteText: '' });
  }
}

deleteNote(key) {
  this.state.noteArray.splice(key, 1);
  this.setState({ noteArray: this.state.noteArray })
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#1d2731',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
  },
  headerText: {
    color: 'white',
    fontSize: 30,
    padding: 26,
    fontWeight: '700'
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 20,
    backgroundColor: '#328cc1',
    borderTopWidth: 2,
    borderTopColor: '#ededed',
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: '#d9b310',
    width: 65,
    height: 65,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
});
