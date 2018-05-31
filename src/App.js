import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'


class App extends Component {
  state ={
    contacts: [ ]
  }

//recuperar dados dinamicamente, ou executar uma requisição Ajax, faça isso dentro do método componentDidMount  
//adicionar life cycle ao componente, serve para fazer solicitação de API
//Vai ser invocada pelo react toda vez que o componente for acionado na view
//a função vai ser invocada com os contatos
  componentDidMount(){
    ContactsAPI.getAll().then((contacts)=>{
      //chamar setState e passar os contacts, a sintaxe é a mesma coisa que 
      //this.setState({ contacts : contacts }) mas como recebe o mesmo valor, pode ser só 1 parametreo
      this.setState({ contacts })
    })
  }

  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))

    ContactsAPI.remove(contact)
  }

  createContact(contact){  //Pegar ContactsAPI, chamar create e passar o contato
    ContactsAPI.create(contact).then(contact => {//recebe o contato de volta do servidor
      this.setState(state => ({       //incluir o estado para poder adicionar o contato na lista,
        contacts:state.contacts.concat([]) //retorna o objeto com uma chave chamada contacts, usa o state.contacts atual e 
      }))        //concatena com esse contato. O concat retorna um novo array, assim tem uma nova pessoa na lista
    })
  }

  //se quisermos ter a possibilidade de passar props para um componente específico que o router renderizará, 
  //teremos que usar a propriedade render do Route
  render() {
    return (                   //quando lista os contatos usa o render prop abaixo, assim é possível passar propriedades para o componente
      <div className="app">       
        <Route exact path="/" render={() =>( //o exact serve para mostrar examamente o caminho "/", se nao tiver o exact, vai mostrar essa tela junto com outras  //usar a propriedade de renderização, vai ter uma função
          <ListContacts                 //vai estar o que queremos que o route renderize quando o caminho corresponder ao URL
            onDeleteContact={this.removeContact}   //dentro desse route queremos passar o ListContacts e as propriedades  
            contacts={this.state.contacts} 
          />
      )}/>      
      <Route path="/create" render={({history}) => (  //vai renderizar o componente quando o caminho for correspondente ao URL
        <CreateContact            //propriedade history do react router---   //// componente para ser renderizado, esta passando o componente para o react router
          onCreateContact={(contact) => { //vai passar o contato, vai passar a propriedade onCreateContact 
            this.createContact(contact)
            history.push('/')  //cria o contato e volta para a lista
          }}
        />
        )}/>  
      </div>
    )
  }
}


export default App;