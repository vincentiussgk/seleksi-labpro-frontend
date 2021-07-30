import React, {useState, useEffect} from "react"
import axios from "axios"
import "./table-styles.css"
import swal from 'sweetalert';
import { Dialog, Paper, Select, InputLabel } from '@material-ui/core';


const EditStore = () => {
  
  const DorayakiStockDialog = (props) => {
    const { setIsModalOpen, isModalOpen, data, store } = props;
    const currentStore = store?.filter(store => store.id === data?.[0]?.store_id)?.[0]
    console.log(store)
    console.log(data)
    console.log(currentStore)
    const handleClose = () => {
      setIsModalOpen(false);
    };

    const [dialogInput, setDialogInput] = useState({
      store_id_transferer: currentStore?.id,
      store_id_receiver: 0,
      store_name: "",
      dorayaki_id: 0,
      transferQty: 0,
      rasa: ""
    })

    console.log(dialogInput)

    const [isTransferring, setIsTransferring] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault()
      const {store_id_receiver, store_id_transferer, dorayaki_id, jumlah_stok, transferQty} = dialogInput
      if (isTransferring) {
        axios.put(`http://127.0.0.1:5000/store/transfer_stock`, {
          store_id_receiver, 
          store_id_transferer, 
          dorayaki_id, 
          transferQty
        })
        .then(res => {
            swal("Data successfully created!",{
              button: "Close"
            })
        })
      }
    };

    return(
      <Dialog onClose={handleClose} style={{padding:'15%'}} open={isModalOpen} PaperComponent={(props) => <Paper {...props} style={{padding:'5%', background:'#242424'}}/>}>
          <h3 style={{textAlign:'center', color:'white'}}>Stok Dorayaki {currentStore?.nama}</h3>
          <table style={{maxWidth:'100%', color:'white'}}>
            <thead>
              <tr>
                <th>No</th>
                <th>Gambar</th>
                <th>Rasa</th>
                <th>Jumlah Stok</th>
                <th style={{width:"150px"}}>Action</th>
              </tr>
            </thead>
            <tbody>
                {
                  data?.length > 0 ? data.map((item, index) => {
                    console.log(item)
                    return(                    
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td><img src={`data:image/png;base64,${item.gambar}`} style={{maxWidth: '5rem', maxHeight: '5rem'}}></img></td>
                        <td>{item.rasa}</td>
                        <td>{item.jumlah_stok}</td>
                        <td>
                          <DorayakiAction store_id={item.store_id} dorayaki_id={item.dorayaki_id} />
                        </td>
                      </tr>
                    )
                  })

                  : <tr>
                      <td colspan="5">
                        Toko ini tidak memiliki stok dorayaki apapun.
                      </td>
                    </tr>

                }
            </tbody>
          </table>
          {/* Form */}
          <h3 style={{textAlign:"center", marginTop:"1%", color:'white'}}>{isTransferring ? "Transfer Stock" : "Alter Stock"}</h3>
          <form onSubmit={handleSubmit}>
            { isTransferring ? 
            <>
              <div style={{color:'white'}}>
                <label for="inp" class="inp">
                  <span>Tujuan</span>
                  <span class="focus-bg"></span>
                  <div>{dialogInput.store_name}</div>
                  <Select id="tujuan" placeholder="Select an option"> 
                    {store?.map(store => {
                      return (
                        <option key={store.id} value={store.id} onClick={() => {
                          const { rasa, dorayaki_id,  transferQty, store_id_receiver, store_id_transferer, } = dialogInput
                          setDialogInput({store_id_receiver: store.id, store_name: store.nama, dorayaki_id, transferQty, store_id_receiver, store_id_transferer, rasa})
                        }}>{store.nama}</option>
                      )
                    })}
                  </Select>
                </label><br/>
              </div>
              <div style={{color:'white'}}>
              <label for="inp" class="inp">
                <span>Rasa</span>
                  <span class="focus-bg"></span>
                  <div>{dialogInput.rasa}</div>
                  <Select id="tujuan" value="test"> 
                    {data?.map(dorayaki => {
                      return (
                        <option key={dorayaki.dorayaki_id} value={dorayaki.dorayaki_id} onClick={() => {
                          const { store_name, store_id_receiver, store_id_transferer,  transferQty } = dialogInput
                          setDialogInput({dorayaki_id: dorayaki.dorayaki_id, rasa: dorayaki.rasa, store_name,  transferQty, store_id_receiver, store_id_transferer,})
                        }}>{dorayaki.rasa}</option>
                      )
                    })}
                  </Select>
                </label><br/>
              </div>
              <div>
                <label for="inp" class="inp">
                  <input type="text" onChange={(e) => setDialogInput({...dialogInput, transferQty: e.target.value})} value={dialogInput.transferQty} placeholder="&nbsp;"/>
                  <span class="label">Qty</span>
                  <span class="focus-bg"></span>
                </label><br/>
              </div>
              <br/>
              <br/>            
            </>

            :
            <>
              <div>
                <label for="inp" class="inp">
                  <input type="text" name="nama" onChange={() => setDialogInput({...dialogInput})} value={input.nama} placeholder="&nbsp;"/>
                  <span class="label">Rasa Dorayaki</span>
                  <span class="focus-bg"></span>
                </label><br/>
              </div>
              <div>
                <label for="inp" class="inp">
                  <input type="text" name="jalan" onChange={handleChange} value={input.jalan} placeholder="&nbsp;"/>
                  <span class="label">Jalan</span>
                  <span class="focus-bg"></span>
                </label><br/>
              </div>
              <div>
                <label for="inp" class="inp">
                  <input type="text" name="kecamatan" onChange={handleChange} value={input.kecamatan} placeholder="&nbsp;"/>
                  <span class="label">Kecamatan</span>
                  <span class="focus-bg"></span>
                </label><br/>
              </div>
              <div>
                <label for="inp" class="inp">
                  <input type="text" name="provinsi" onChange={handleChange} value={input.provinsi} placeholder="&nbsp;"/>
                  <span class="label">Provinsi</span>
                  <span class="focus-bg"></span>
                </label><br/>
              </div>
              <br/>
              <br/>
  
            </>
        
            }
            <button className="btn btn-outline-info" style={{marginRight:'2%'}}>Submit</button>
            {
              !isTransferring ?
              <button type="button" className="btn btn-outline-danger" onClick={() => {
                setIsTransferring(true);
                setDialogInput({
                  store_id_transferer: currentStore?.id,
                  store_id_receiver: 0,
                  dorayaki_id: 0,
                  jumlah_stok: 0,
                  transferQty: 0,
                })
              }}>Transfer stock</button>
              : 
              <button type="button" className="btn btn-outline-danger" onClick={() => {
                setIsTransferring(false);
                setDialogInput({
                  store_id_transferer: currentStore?.id,
                  store_id_receiver: 0,
                  dorayaki_id: 0,
                  jumlah_stok: 0,
                  transferQty: 0,
                })
              }}>Edit stock</button>
            }              
          </form>
      </Dialog>
    )
  }

  const [store, setStore] =  useState(null)
  const [input, setInput]  =  useState({
    id: 0,
    nama: "",
    jalan: "",
    kecamatan: "",
    provinsi: ""
  })
  
  const [selectedId, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchedData, setFetchedData] = useState(null)

  useEffect( () => {
    if (store === null){
      axios.get("http://127.0.0.1:5000/store")
      .then(res => {
        let store = res.data.map(el => {
          const { id, nama, jalan, kecamatan, provinsi,  } = el; 
          return {
            id,
            nama,
            jalan,
            kecamatan,
            provinsi
        }})
        setStore(store)
      })
    }
  }, [store])
  
  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "nama":
      {
        setInput({...input, nama: event.target.value});
        break
      }
      case "jalan":
      {
        setInput({...input, jalan: event.target.value});
        break
      }
      case "kecamatan":
      {
        setInput({...input, kecamatan: event.target.value});
          break
      }
      case "provinsi":
      {
        setInput({...input, provinsi: event.target.value});
          break
      }
    default:
      {break;}
    }
  }

  const handleSubmit = (event) =>{
    // menahan submit
    event.preventDefault()

    const { id, nama, jalan, kecamatan, provinsi } = input;

    if (statusForm === "create"){        
      axios.post(`http://127.0.0.1:5000/store`, {
        nama, 
        jalan, 
        kecamatan, 
        provinsi
      })
      .then(res => {
          setStore([...store, {id: res.data.id, nama, jalan, kecamatan, provinsi}])
          swal("Data successfully created!",{
            button: "Close"
          })
      })
    }

    else if(statusForm === "edit"){
      axios.put(`http://127.0.0.1:5000/store`, {
        id, 
        nama, 
        jalan, 
        kecamatan, 
        provinsi
      })
      .then(res => {
          let editedStore = store.find(el => el.id === selectedId)
          editedStore.nama = input.nama
          editedStore.jalan = input.jalan
          editedStore.kecamatan = input.kecamatan
          editedStore.provinsi = input.provinsi
          setStore([...store])
          swal("Data successfully changed!",{
            button:"Close"
          })
        })
        
      }
      setStatusForm("create")
      setSelectedId(0)
      setInput({
        id: 0,
        nama: "",
        jalan: "",
        kecamatan: "",
        provinsi: ""
      })

  }

  const Action = ({itemId}) =>{
    const handleDelete = () => {  
      let filteredStore = store.filter(el => el.id !== itemId)
      console.log(itemId)
  
      axios.delete("http://127.0.0.1:5000/store",{ data: {id: itemId }})
      .then(res => {
        swal("Data successfully deleted!",{
          button:"Close"
        }).catch(()=>swal("Oops!","Unknown error occured.","error"));
      })
            
      setStore([...filteredStore])
      
    }
    
    const handleEdit = () =>{
      let findStore = store.find(x => x.id === itemId)
      setInput(findStore)
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

  const DorayakiAction = ({ store_id, dorayaki_id }) =>{
    const handleDelete = () => {  
      let filteredDorayaki = fetchedData.filter(el => el.dorayaki_id !== dorayaki_id)
  
      axios.delete("http://127.0.0.1:5000/store_items",{ data: {store_id, dorayaki_id }})
      .then(res => {
        swal("Data successfully deleted!",{
          button:"Close"
        }).catch(()=>swal("Oops!","Unknown error occured.","error"));
      })
            
      setFetchedData([...filteredDorayaki])
      
    }
    
    const handleEdit = () =>{
      let findDorayaki = fetchedData.find(el => el.dorayaki_id === dorayaki_id)
      // setInput(findStore)
      // setSelectedId(itemId)
      // setStatusForm("edit")
    }

    return(
      <>
        <button className="btn btn-outline-warning" style={{marginRight:"1%"}} onClick={handleEdit}>Edit</button>
        &nbsp;
        <button className="btn btn-outline-danger" onClick={handleDelete}>Delete</button>
      </>
    )
  }

  const CheckDorayakiStock = ({itemId}) => {

    const fetchData = async () => {
      const results = await axios.get("http://127.0.0.1:5000/store/transfer_stock", {headers: {id: itemId}})
      setIsModalOpen(true);
      setSelectedId(itemId)
      setFetchedData(results.data);
    }

    return (
      <>
        <button className="btn btn-outline-info" style={{marginRight:"1%"}} onClick={fetchData}>Check</button>
      </>
    )
  }

  return(
    <>
      <h3>Daftar Cabang Doraemonangis ドラえもんナンギス目録</h3>
        <DorayakiStockDialog isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} store={store} data={fetchedData} elevation={4}/>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Jalan</th>
            <th>Kecamatan</th>
            <th>Provinsi</th>
            <th>Stok Dorayaki</th>
            <th style={{width:"150px"}}>Action</th>
          </tr>
        </thead>
        <tbody>
            {
              store !== null && store.map((item, index) => {
                console.log(item)
                return(                    
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.nama}</td>
                    <td>{item.jalan}</td>
                    <td>{item.kecamatan}</td>
                    <td>{item.provinsi}</td>
                    <td>
                      <CheckDorayakiStock itemId={item.id}/>
                    </td>
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
      <h3 style={{textAlign:"center", marginTop:"1%"}}>{statusForm === "create" ? "Add" : "Edit"} Store</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label for="inp" class="inp">
            <input type="text" name="nama" onChange={handleChange} value={input.nama} placeholder="&nbsp;"/>
            <span class="label">Nama</span>
            <span class="focus-bg"></span>
          </label><br/>
        </div>
        <div>
          <label for="inp" class="inp">
            <input type="text" name="jalan" onChange={handleChange} value={input.jalan} placeholder="&nbsp;"/>
            <span class="label">Jalan</span>
            <span class="focus-bg"></span>
          </label><br/>
        </div>
        <div>
          <label for="inp" class="inp">
            <input type="text" name="kecamatan" onChange={handleChange} value={input.kecamatan} placeholder="&nbsp;"/>
            <span class="label">Kecamatan</span>
            <span class="focus-bg"></span>
          </label><br/>
        </div>
        <div>
          <label for="inp" class="inp">
            <input type="text" name="provinsi" onChange={handleChange} value={input.provinsi} placeholder="&nbsp;"/>
            <span class="label">Provinsi</span>
            <span class="focus-bg"></span>
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
              nama: "",
              jalan: "",
              kecamatan: "",
              provinsi: ""
            })
          }}>Add mode</button>
          : null
        }
        
      </form>
    </>
  )
}

export default EditStore