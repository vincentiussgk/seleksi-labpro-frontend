import React, {useState, useEffect} from "react"
import axios from "axios"
import "./table-styles.css"
import swal from 'sweetalert';
import FileBase64 from 'react-file-base64';

const EditDorayaki = () => {
  
  const [dorayaki, setDorayaki] =  useState(null)
  const [input, setInput]  =  useState({
    id: 0,
    rasa: "",
    deskripsi: "",
    gambar: "",
  })
  
  const [selectedId, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")

  useEffect( () => {
    if (dorayaki === null){
      axios.get("http://127.0.0.1:5000/dorayaki")
      .then(res => {
        let dorayaki = res.data.map(el => {
          const { id, rasa, deskripsi, gambar } = el; 
          return {
            id,
            rasa,
            deskripsi,
            gambar,
        }})
        setDorayaki(dorayaki)
      })
    }
  }, [dorayaki])
  
  const handleChange = (event) =>{
    let typeOfInput = event?.target?.name 

    switch (typeOfInput){
      case "rasa":
      {
        setInput({...input, rasa: event.target.value});
        break
      }
      case "deskripsi":
      {
        setInput({...input, deskripsi: event.target.value});
          break
      }
    default:
      {
        // Event is already the b64
        setInput({...input, gambar: event});
        break
      }      
    }
  }

  const handleSubmit = (event) =>{
    // menahan submit
    event.preventDefault()

    const { id, rasa, gambar, deskripsi } = input;
    console.log(input)

    if (statusForm === "create"){        
      axios.post(`http://127.0.0.1:5000/dorayaki`, {
        rasa, 
        gambar, 
        deskripsi
      })
      .then(res => {
          setDorayaki([...dorayaki, {id: res.data.id, rasa, gambar, deskripsi}])
          swal("Data successfully created!",{
            button: "Close"
          })
      })
    }

    else if (statusForm === "edit"){
      axios.put(`http://127.0.0.1:5000/dorayaki`, {
        id, 
        rasa, 
        gambar, 
        deskripsi
      })
      .then(res => {
          let editeddorayaki = dorayaki.find(el => el.id === selectedId)
          editeddorayaki.rasa = input.rasa
          editeddorayaki.gambar = input.gambar
          editeddorayaki.deskripsi = input.deskripsi
          setDorayaki([...dorayaki])
          swal("Data successfully changed!",{
            button:"Close"
          })
        })
        
      }
      setStatusForm("create")
      setSelectedId(0)
      setInput({
        id: 0,
        gambar: "",
        rasa: "",
        deskripsi: "",
      })

  }

  const Action = ({itemId}) =>{
    const handleDelete = () => {  
      let filtereddorayaki = dorayaki.filter(el => el.id !== itemId)
  
      axios.delete("http://127.0.0.1:5000/dorayaki",{ data: {id: itemId }})
      .then(res => {
        swal("Data successfully deleted!",{
          button:"Close"
        }).catch(()=>swal("Oops!","Unknown error occured.","error"));
      })
            
      setDorayaki([...filtereddorayaki])
      
    }
    
    const handleEdit = () =>{
      let findDorayaki = dorayaki.find(x => x.id === itemId)
      setInput(findDorayaki)
      setSelectedId(itemId)
      setStatusForm("edit")
    }

    return(
      <>
        <button className="btn btn-outline-warning" style={{marginRight:"1%"}} onClick={handleEdit}>Edit</button>
        &nbsp;
        <button className="btn btn-outline-danger" onClick={handleDelete}>Delete</button>
      </>
    )
  }

  return(
    <>
      <h3>Daftar Varian Dorayaki どら焼きの種類</h3>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Gambar</th>
            <th>Rasa</th>
            <th>Deskripsi</th>
            <th style={{width:"150px"}}>Action</th>
          </tr>
        </thead>
        <tbody>

            {
              dorayaki !== null && dorayaki.map((item, index) => {
                return(                    
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td><img src={`data:image/png;base64,${item.gambar}`} style={{maxWidth: '7rem', maxHeight: '7rem'}}></img></td>
                    <td>{item.rasa}</td>
                    <td>{item.deskripsi}</td>
                    <td>
                      <Action itemId={item.id} />
                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
      {/* Form */}
      <h3 style={{textAlign:"center", marginTop:"1%"}}>{statusForm === "create" ? "Add" : "Edit"} Dorayaki</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label for="inp" className="inp"> Gambar
            <FileBase64 name="gambar" onDone = {res => handleChange(res.base64.substr(23,))}/>
          </label><br/>
        </div>
        <div>
          <label for="inp" className="inp">
            <input type="text" name="rasa" onChange={handleChange} value={input.rasa} placeholder="&nbsp;"/>
            <span className="label">Rasa</span>
            <span className="focus-bg"></span>
          </label><br/>
        </div>
        <div>
          <label for="inp" className="inp">
            <input type="text" name="deskripsi" aria-multiline onChange={handleChange} value={input.deskripsi} placeholder="&nbsp;"/>
            <span className="label">Deskripsi</span>
            <span className="focus-bg"></span>
          </label><br/>
        </div>
        <br/>
        <br/>
        <button className="btn btn-outline-info" style={{marginRight:'2%'}}>Submit</button>
        {
          statusForm === "edit" ?
          <button className="btn btn-outline-danger" onClick={() => {
            setStatusForm("create");
            setInput({
              id: 0,
              gambar: "",
              rasa: "",
              deskripsi: "",
            })
          }}>Add mode</button>
          : null
        }
        
      </form>
    </>
  )
}

export default EditDorayaki