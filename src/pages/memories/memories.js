import React, { useState, useEffect } from 'react';
import { storage } from '../../firebase/config';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const Memories = () => {
  const [image, setImage] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, 'memories/'); // reference to storage folder
  const uploadImage = () => {
    if (image == null) return;
    const imageRef = ref(storage, `memories/${image.name + v4()}`); // reference to image
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, { url, caption: 'My Adventures' }]);
      });
    });
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, { url, caption: 'My Adventures' }]);
        });
      });
    });
  }, []);

  return (
    <div>
      <h1>Your captured memories</h1>
      <input type='file' onChange={(e) => setImage(e.target.files[0])}></input>
      <button onClick={uploadImage}>Upload Image</button>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {imageList.map((item, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            <img
              style={{ width: 200, height: 300, borderRadius: '5px' }}
              src={item.url}
              alt=''
            />
            <br />
            <span>{item.caption}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Memories;
