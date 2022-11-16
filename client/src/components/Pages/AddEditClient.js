import React from 'react'
import {useEffect,Component} from 'react';
import {useParams,Link} from 'react-router-dom';
import './AddEditClient.css'
import Axios from 'axios'
import {toast} from 'react-toastify';


class AddEditClient extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            client_id:'',
            fname:'',
            mname:'',
            lname:'',
            phone:'',
            email:'',
            passport:'',
            id:useParams()
        };
        useEffect(()=>{
            Axios.get(`http://localhost:5000/api/remove/${id}`).then((response)=>{

                this.setState({client_id: response.data[0].client_id});
                this.setState({fname: response.data[0].fname});
                this.setState({mname: response.data[0].mname});
                this.setState({lname: response.data[0].lname});
                this.setState({phone: response.data[0].phone});
                this.setState({email: response.data[0].email});
                this.setState({passport: response.data[0].passport});
            })
        },[this.state.id]) 
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        if(!this.state.client_id || !this.state.fname || !this.state.lname || !this.state.mname || !this.state.phone || !this.state.email || !this.state.passport)
        toast.error('Each and every field is required!');
        else{
            Axios.post('http://localhost:5000/api/post',{
                client_id:this.state.client_id,
                fname:this.state.fname,
                mname:this.state.mname,
                lname:this.state.lname,
                phone:this.state.phone,
                email:this.state.email,
                passport:this.state.passport
            }).then(()=>{
                this.setState({client_id:'',fname:'',mname:'',lname:'',phone:'',email:'',passport:''})
            }).catch((err)=>{
                toast.error(err.response.data);
            })
            toast.success('Client added successfully!');
            setTimeout(()=> this.props.history.push('/Client'),500)

        }
    }

    handleID=(event)=>{
        console.log(event.target.value)
        this.setState({client_id: event.target.value}); 
        
    }

    handleFname=(event)=>{
        this.setState({fname: event.target.value}); 
    }

    handleMname=(event)=>{
        this.setState({mname: event.target.value}); 
    }

    handleLname=(event)=>{
        this.setState({lname: event.target.value}); 
    }

    handlePhone=(event)=>{
        this.setState({phone: event.target.value}); 
    }

    handleEmail=(event)=>{
        this.setState({email: event.target.value}); 
    }

    handlePass=(event)=>{
        this.setState({passport: event.target.value}); 
    }
    render(){

        return (
          <div style={{marginTop:'100px'}}>
              <form style={{margin:'auto',padding:'15px',maxWidth:'600px',alignContent:'center',backgroundColor:'grey',borderRadius:'10px'}}
               onSubmit={this.handleSubmit}>
                  <label htmlFor='client-id'>Client ID</label>
                  <input type='text' placeholder='ID' required onChange={this.handleID}/>
                  
                  <label htmlFor='fname'>First Name</label>
                  <input type='text' placeholder='First Name' onChange={this.handleFname}/>
                  
                  <label htmlFor='mname'>Middle Name</label>
                  <input type='text' placeholder='Middle Name' onChange={this.handleMname}/>
                  
                  <label htmlFor='lname'>Last Name</label>
                  <input type='text' placeholder='Last Name'  onChange={this.handleLname}/>
                  
                  
                  <label htmlFor='phone'>Phone</label>
                  <input type='number' placeholder='Phone'  onChange={this.handlePhone}/>
                  
                  <label htmlFor='email'>Email</label>
                  <input type='email' placeholder='Email'  onChange={this.handleEmail}/>
                  
                  <label htmlFor='passport'>Passport</label>
                  <input type='text' placeholder='Passport'  onChange={this.handlePass}/>
                  <input type='submit' value={this.state.client_id ? 'Update' : 'Save'}/>
                  <Link to='/Client'>
                      <input type='button' value='Back'></input>
                  </Link>
              </form>
          </div>
        )
    }
}

export default AddEditClient