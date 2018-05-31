import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ImageInput from './ImageInput';
import serializeForm from 'form-serialize'

class CreateContact extends Component{
    handleSubmit =(e) => { 
        e.preventDefault()  //em vez de serializar numa string e recarregar a página, vai serializar num objeto
        const values = serializeForm(e.target, {hash:true})     // os valores são serializeForm e inclui o evento target. É o formulário em si.  Se colocar hash true, vai ter um objeto
        if (this.props.onCreateContact) // proteger, a pessoa que renderiza, passa alguma coisa antes
        this.props.onCreateContact(values)//--vai mandar os valores--  //o serializeForm vai entrar em todos os inputs dentro do formulário, olhar nome, extrair valores e criar um objeto.;
    }
    render(){
        return (
            <div> 
                <Link className="close-create-contact" to="/">Close</Link> 
                <form onSubmit={this.handleSubmit} className="create-contact-form">
                    <ImageInput        //chamando o componente que permite o upload de imagens para o avatar do contato
                        className="create-contact-avatar-input"  //usar estilos
                        name="avatarURL"
                        maxHeight={64}  //altura máxima 64 pixels
                    />
                    <div className="create-contact-details">
                        <input type="text" name="name" placeholder="Name"/>
                        <input type="text" name="email" placeholder="Email"/>
                        <button>Add Contact</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateContact