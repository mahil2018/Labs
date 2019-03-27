import React,  {Component } from 'react';

class StudentList extends Component{
    constructor(){
        super();
        this.state = {
            students: ["Camilo", "Chris", "Will", "Miller"]
        }
    }

    addStudent(){
        const newStudent = prompt ("What's student name?");
        const {students} = this.state;
        console.log(students);
        // this.setState bih no no => don't mutate the state
        // this.students.unshift(newStudent);
        // first step: make a copy of the array
        const studentsCopy = [...students];
         // 2nd step: set the state of the original array
        studentsCopy.unshift(newStudent);
        // 3rd step: set the state of the original array to the new array
        this.setState({
            students: studentsCopy
        })

    }

    deleteStudent(index){
        const {students}= this.state;

        console.log(students);
        const studentCopy = [...students];
        studentCopy.splice(index, 1);
        this.setState({
            students: studentCopy
        })
    }
    render(){
        const { students } = this.state; // destructuring, it's the same as:
        //const students = this.state.students
        return (
          <div>
               <button onClick={ () => this.addStudent() }>Add new student</button>
            <ul>
                { students.map ((oneStudent, index) =>{
                    // key prop neds to be unique 
                    // in this case we use "index"
                    //In some other that's going to be _id from 
                    return (
                        <li key={ index }> 
                        { oneStudent } 
                        <button onClick={ () => this.deleteStudent(index) } >Delete</button>
                    </li>
                    
                )
              })}
            </ul>
          </div>
        )
    }
}

export default StudentList;