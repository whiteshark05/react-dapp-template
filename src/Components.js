import React, {Component} from 'react';
import {setProfile, getUser, postMessage, getMessage, getAllMessage, getAccount} from './ContractInterface/contractInterface.js'


export class UserInfo extends Component {
    constructor(){
        super();
        this.state = {
            name: "",
            age: "",
        }    
    }
    
    getUserInfo = async () => {
        let user = await getUser();
        //console.log(user)
        if (typeof user !== 'undefined')
        this.setState({
            name: user[0],
            age: user[1]
        }) 
    }


    changeUserInfo = async () => {
        setProfile(this.state.name, this.state.age)
        .on('confirmation', () => console.log('confirmed'))
    }

    componentDidMount () {
        this.getUserInfo();
    }

    

    render () {
        return (
            <div className = 'User'>
                <h2>User</h2>
                <form>
                    <input
                        type = 'text'
                        value = {this.props.account}
                        disabled
                    />
                    <br/>
                    <input
                        type = 'text'
                        placeholder = 'Enter your name'
                        value = {this.state.name}
                        onChange = {e => this.setState({name:e.target.value})}
                    />
                    <br/>  
                    <input
                        type = 'text'
                        placeholder = 'Enter your age'
                        value = {this.state.age}
                        onChange = {e => this.setState({age:e.target.value})}
                    />
                    <br/>
                    <button onClick = {this.changeUserInfo}>Confirm</button>
                </form>
            </div>
        )
    }
}

export class ChatBox extends Component {
    constructor (props){
        super(props)
        this.state = {
            name: null,
            title:"",
            content:"",
            name: "",
            messages: []
        }
    }

    getUserInfo = async () => {
        let user = await getUser();
        //console.log(user)
        if (typeof user !== 'undefined')
        this.setState({
            ...this.state,
            name: user[0],
        }) 
    }

    postMessage = async () => {
        postMessage(this.state.title, this.state.content)
        //.on('confirmation', () => console.log('confirmed'))
    }

    componentDidMount() {
        getAllMessage()
        .then(data => {console.log(data); this.setState({messages:data})})
        .then(this.getUserInfo)
    }

    render () {
        return (
            <div className = 'ChatBox'>
                <h2>ChatBox</h2>
                <form>
                    <textarea
                        type = 'text'
                        cols = '60'
                        placeholder = 'Enter your title'
                        value = {this.state.title}
                        onChange = {e => this.setState({title:e.target.value})}                
                    >
                    </textarea>
                    <br/>
                    <textarea
                        type = 'text'
                        rows = '4'
                        cols = '60'
                        placeholder = 'Enter your content'
                        value = {this.state.content}
                        onChange = {e => this.setState({content:e.target.value})}                
                    >
                    </textarea>
                    <br/>
                    <button onClick = {this.postMessage}>Post</button>
                </form>
                <br/>
                <br/>
                <div>
                    {
                        this.state.messages.map((post,key) => <ReplyBox
                        key = {key}
                        account = {this.props.account}
                        name = {this.state.name}
                        title = {post.title}
                        content = {post.content}
                        />)
                    }
                </div>
            </div>
        )
    }

}

const ReplyBox = ({account, name, title, content}) => (
    <div className = "ReplyBox">
        <table>
            <tr>
                <th>Address</th>
                <tr>{account}</tr>
            </tr>
            <tr>
                <th>Name</th>
                <tr>{name}</tr>
            </tr>
            <tr>
                <th>Title</th>
                <tr>{title}</tr>
            </tr>
            <tr>
                <th>Content</th>
                <tr>{content}</tr>
            </tr>
        </table>
    </div>
)