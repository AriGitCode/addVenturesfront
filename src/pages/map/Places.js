import * as React from 'react'
import ReactMapGL,{ NavigationControl, Marker, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GoHeartFill } from "react-icons/go";
import { HiMapPin } from "react-icons/hi2";
import {format} from 'timeago.js'
import axios from 'axios';


const Places = (props = {}) => {

  const [places, setPlaces] = React.useState([]);
  const [viewport, setViewport] = React.useState({
    width: 300,
    height: 300,
    longitude: -70.9, //Adding viewport useState,to set the map,current configuration of map view
    latitude: 42.35,
    zoom: 14
  })
  const [currentPlaceId,setCurrentPlaceId] = React.useState(null);
  const [newPlace, setNewPlace] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [wantToGo, setWantToGo] = React.useState(false);
  const [description, setDescription] = React.useState(null);
  const [rating, setRating] = React.useState(1);
  const [edit, setEdit] = React.useState(false);
  const [editedDescription, setEditedDescription] = React.useState(false);
  const [editedTitle, setEditedTitle] = React.useState(false);
  const [editedRating, setEditedRating] = React.useState(false);
  const [updated, forceUpdate] = React.useState(false);

  const deletePin = (id) =>{
    axios.delete(`http://localhost:8081/places/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + props.token
      }
    }).then(data => {
      console.log(data);
      forceUpdate(!updated);
    })
    closeEdit();
  }

  const handleAddPinClick = (e) =>{ 
   console.log(e); 
    const lat = e.lngLat.lat;
    const lng = e.lngLat.lng;

    setNewPlace({
      lat : lat,
      lng : lng
    });
  }
  const handlePinSubmit = (e) =>{ //отправкa формы для добавления нового pin's form submit
      e.preventDefault()
  const newPlace2 = {
    title,
    description,
    rating,
    latitude : newPlace.lat,
    longitude : newPlace.lng,
    wantToGo : wantToGo,
    user: props.userID
  }
  console.log(newPlace2)
  
      axios.post
      ('http://localhost:8081/places', newPlace2, {headers: {'Authorization': 'Bearer ' + props.token}}).then((data)=>{
          forceUpdate(state => !state)
          console.log("data: ", data)
          setNewPlace(null)
      }).catch(error => {
          console.log("error: ", error)
          alert('create place failed. Please try again.');
      })
  }

  const openEdit = () =>{
    setEdit(true);
  }
 const closeEdit = () =>{
    setEdit(false);
 }
  const handleMarkerClicked=(id, lat, lon) =>{//click event on a marker to display information about the place
    setCurrentPlaceId(id);
    setViewport({
      ...viewport,
      latitude: lat,
      longitude: lon
    })
    const placeToEdit = places.find(place => place._id === id);
    if (placeToEdit) {
      setEditedTitle(placeToEdit.title);
      setEditedDescription(placeToEdit.description);
      setEditedRating(placeToEdit.rating);
    }
    console.log(lon);
    console.log(lat);
  }
   
  React.useEffect (() =>{
    const getPlaces = async() => {
        console.log("token : ", localStorage.getItem("token"))
      try{
        const response = await axios.get('http://localhost:8081/places', {headers: {
              'Authorization': 'Bearer ' + props.token
          }
        }
        )
        console.log(response.data);
        setPlaces(response.data.filter(place => place !== null));
      }catch(error){
        console.log(error);
      }
    }
    getPlaces();
  }, [props.token, updated]);

  return (
    <div >
      <ReactMapGL // provides React-specific components and simplifies interaction with the Mapbox GL JS map.
        container ={"map"}
        projection={"globe"}
        initialViewState={{
          longitude: -70.9,
          latitude: 42.35,
          zoom: 0
        }}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        style={{width: '250vw', height: '270vh'}}
        mapStyle = "mapbox://styles/aricode123/clrpufx4e008j01p52mk21ppy"
        onDblClick={handleAddPinClick}
       >

        <NavigationControl /> 
        {
          places.map(place => (
            place &&
            <>
              <Marker  //used to render custom icons/pins at specific locations on the map
              longitude={place.longitude} 
              latitude={place.latitude}
              
              anchor ='center'>
                {place.wantToGo ? 
                <GoHeartFill onClick={()=>handleMarkerClicked(place._id, place.longitude, place.latitude)} className='pin' style={{fontSize: viewport.zoom * 2, color: 'red', cursor: 'pointer'}}/> :
                <HiMapPin className='pin' 
                onClick={()=>handleMarkerClicked(place._id, place.longitude, place.latitude)}
                 style={{fontSize: viewport.zoom * 2, color: place.firstName === props.userID ? 'blue' : 'red', cursor: 'pointer'}}
                 />
                }
              </Marker>
              {place._id === currentPlaceId &&
              (
                edit  ? 
                <Popup
                longitude={place.longitude}
                latitude={place.latitude}
                closeButton={true}
                closeOnClick={false}
                // closeOnMove={true}
                onClose={() => {
                  setCurrentPlaceId(null)
                  setEdit(false)
                  }}
                anchor='left'>

              <div className='popup'>
              <form onSubmit={() => {
                axios.put(`http://localhost:8081/places/${place._id}`, {
                  title: editedTitle,
                  description: editedDescription,
                  rating: editedRating
                }, {
                  headers: {
                    'Authorization': 'Bearer ' + props.token
                  }
                }).then(data => {
                  forceUpdate(state => !state)
                  console.log(data);
                })

                setEdit(false)
              }}>
                <label>Place</label>
                  <input value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}/>

                  <label>Review</label>
                  <textarea value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  />
                  <label>Rating</label>
                  <select value={editedRating} onChange={(e) => setEditedRating(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button className='btnPin' type='submit'>Update</button>
                  </form>
              </div>
                  </Popup>
                   :
              <Popup
                longitude={place.longitude}
                latitude={place.latitude}
                closeButton={true}
                closeOnClick={false}
                // closeOnMove={true}
                onClose={() => setCurrentPlaceId(null)}
                anchor='left'>

                  <div className='popup'>
                  <label>Place</label>
                    <h4 className='place'>{place.title}</h4>
                  <label>Raview</label>
                    <p className='descrip'>{place.description}</p>
                  <label>Rating</label>
                  <div className='hearts'>
                    {Array(place.rating).fill(<GoHeartFill  className='heart'/> )}
                  </div>
                  <label>Information</label>
                  <div className='info'>
                    <span className='firstname'>Created by<b> {place.firstName}</b></span>
                    <span className='date'>{format(place.createdAt)}</span>
                  
                  </div>
                  <div>
                    <button  className='btnPin btnUpdate' onClick={openEdit} type='submit'>Edit Pin</button>
                    <button className='btnDelete' 
                    onClick={
                      ()=>{
                        deletePin(place._id)
                        }
                    } type='submit'>Delete Pin</button>
                  </div>


                  </div>
              </Popup>
             )
            }
            </>

          ))
        }

        {
          newPlace &&    //if we have new place then show popup
            <Popup 
            longitude={newPlace.lng}
            latitude={newPlace.lat}
            closeOnMove={false}
            closeOnClick={false}
            onClose={()=>{setNewPlace(null)}} //submit and close the popup
            anchor ='left'> 

               <div className='popup'>
              <form onSubmit={handlePinSubmit}>
              <label>Want to visit</label>
               <input type="checkbox" onChange={()=>{setWantToGo(!wantToGo)}} checked={wantToGo} />
                <label>Place</label>
                  <input placeholder='Enter a place.'
                  onChange={(e) => setTitle(e.target.value)}/>

                  <label>Review</label>
                  <textarea placeholder='Say something about this place...'
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <label>Rating</label>
                  <select onChange={(e) => setRating(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button className='btnPin' type='submit'>Add Pin</button>
                  </form>
              </div>
            </Popup> 
          
        }

      </ReactMapGL>
    </div>
  )
}

export default Places

