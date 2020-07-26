import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import React, { Component } from 'react';
import '../App.css'

class UserTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            
            time: null,
            current_id: null,
            temp: {
                id: null
            }
        }
    }

    getUserDetailsFromMockApi = () => {
        fetch('https://79a4a7a3-1373-4441-9fea-2a4b9ca78214.mock.pstmn.io/users', { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                this.setState({ users: data.members })
            });
    }

    componentDidMount() {
        this.getUserDetailsFromMockApi();
    }

    toggleModal = (id) => {
        // if (this.state.showModal === false)
        //     this.setState({ showModal: true });
        // else if (this.state.showModal === true)
        //     this.setState({ showModal: false });
        this.setState({
            showmodal: !this.state.showModal,
            current_id: id
        })

      this.showSelectedUserActivity(id);
    }

    renderTd = () => {
        let tdDiv = this.state.users.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td><a href="#" onClick={() => { this.toggleModal(user.id); this.state.temp.id = user.id }}>{user.real_name}</a></td>
                    <td>{user.tz}</td>
                </tr>
            )
        });

        return tdDiv;
    }

    showSelectedUserActivity = (id) => {
       
        
        let userDetailss = this.state.users.filter((user) => id === user.id )
        let userDetails = userDetailss[0]
        this.setState({
            time: "Active Time Range"
        })
        console.log(userDetails.activity_periods[0]['start_time']);

     //  let activity = userDetails.activity_periods.map(day => day)
    //   return (
    //      
    // )
      
       
            
        }
    render() {
        console.log(this.state.showModal);
        let userId = null;
        let id = this.state.current_id;
        if(this.state.users != [] && this.state.current_id != null){

            let userDetailss = this.state.users.filter((user) => id=== user.id )
            console.log(userDetailss[0]);
            let v1 = userDetailss[0];
            let v2 = v1.activity_periods;
            // console.log(v2.activity_periods);
            // let v2 = v1.activity_periods;
            console.log(v2);
            userId = v2.map((user, index) => {
                console.log(user);
                return(
                <div >  <table className="table text-center td tb"><td><div key={index}>{user['start_time']}</div>
                    <div key={index}>{user['end_time']}</div></td></table>
                   </div> 
                )
            });
        }
        
            let displayer = () =>{
                if(this.state.time == null){
                    return(
                        <div></div>
                    )
                }
                else{
                    return(
                        <div>{this.state.time}</div>
                    )
                }
                
            }

        return (
            <>

                <div className="main-div container">
        
                

                    <h2 className="text-center" style={{backgroundColor: "lightblue",textAlign:"center"}}>User Details</h2>
                   

                    <table className="table tr td th  text-center">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Time Zone</th> <th>..............................................................................................................</th>
                                <th><Calendar/></th>
                             
                            </tr>
                        </thead>
                        <tbody>
                        
                            {this.renderTd()}
                        </tbody>
       

                    </table>
                    {/* {this.showSelectedUserActivity()} */}
                    
                </div>
              
                {displayer()}
                {userId} 

             
            </>
        )

    }
}
export default UserTable;