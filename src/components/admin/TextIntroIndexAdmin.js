import React, {useState, useEffect, Fragment} from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../Api/FecthData';
import { checkDataAgeToCleanLocaleStorage } from '../../cleanStorage/CleanStorage';
import Button from 'react-bootstrap/Button';
import Popup from './PopUp';
import { deleteImageFromS3 } from "../../S3/S3";
import { textIntroDestroy } from './adminDestroy';
import { Link } from "react-router-dom";

const TextIntroIndex = () => {

  const urlMain = process.env.REACT_APP_URL_MAIN
  const urlTextIntros = `${urlMain}/api/text_intros`
  const imagePath = process.env.REACT_APP_AWS_S3_URL;

  const navigate = useNavigate();

  const [infos ,setInfos] = useState([]);
  const [nameImages, setNameImages] = useState([]);
  const [show, setShow] = useState(false);
  const [idTextIntro, setIdTextIntro] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {

    if (localStorage.getItem('storageDateHome')) {
      const date = localStorage.getItem('storageDateHome');
      checkDataAgeToCleanLocaleStorage(date);
     }

     const getInfo = async () => {

      console.log('storage index')
      if (localStorage.getItem('info')) {

        const infosStorage = JSON.parse(localStorage.getItem('info'));
        const imagesStorage = JSON.parse(localStorage.getItem('imageStorageIndex'));

        setInfos(infosStorage);
        setNameImages(imagesStorage)

      } else {

        const fetchedData = await fetchData(urlTextIntros);

        setInfos(fetchedData);

        const tmpImageStorage = []

        fetchedData["hydra:member"].forEach(element => {

            const filesName = fetchData(urlMain + element.image);

            filesName.then(data => {

              tmpImageStorage.push(data)

              setNameImages([...tmpImageStorage])
              localStorage.setItem('imageStorageIndex', JSON.stringify(tmpImageStorage))
            })

          })


        localStorage.setItem('info', JSON.stringify(fetchedData));
        if ( !localStorage.getItem('storageDateHome') ) {
          localStorage.setItem('storageDateHome', Date.now());
        }
      }
    }
    if(load) {

      return () => {
        getInfo();
        setLoad(false)
      }

    }


  }, [load, urlTextIntros, urlMain ]);


  // to sort images by id
  const sortedImages = nameImages?.sort((a,b)=> a?.id - b?.id);

  const handleClose = () => setShow(false);

  const handleShow = (id) =>{
    setShow(true);
    setIdTextIntro(id)
  }

  const handleDelete = (id) => {
   textIntroDestroy(id);
   handleClose();
   const toDeleteFromS3 = infos['hydra:member'].filter(member => member.id === id);
   const fileName = fetchData(urlMain + toDeleteFromS3[0].image)
   fileName.then(data => {
    deleteImageFromS3(data.name);
   })

   localStorage.removeItem('info');
   localStorage.removeItem('imageStorageIndex');
   navigate('/')
  }


  return (

    <div className='index-item'>

      <div className='pattaya text-center text-decoration-underline' style={{fontSize: '48px'}}>Intro Index</div>

        {
           show &&
             <Popup
              show={show}
              idBlogPost={idTextIntro}
              handleClose={handleClose}
              handleDelete={handleDelete}
              setShow={setShow}
             />
        }

        <div className="text-end m-5">
            <Link to={'/admin_text_intro_new'}
             className="btn btn-primary"
             style={{backgroundColor: ' #670BFF', border: '1px solid  #670BFF'}}
             >
              Nouveau
             </Link>
        </div>


      {

        infos?.['hydra:member']?.map(({id, title, text} , index )=> {

        return (

              <Fragment key={id}>

                  <div className='m-5 text-center'>
                    <h2 className='pattaya text-black' style={{fontSize: "24px"}}>{title}</h2>
                    {sortedImages[index] !== undefined && <img src={imagePath + sortedImages[index]?.name} alt={sortedImages[index]?.name} className="avatar-super-large m-3" />}
                    <p>{text}</p>
                  </div>

                  <div className="text-center">
                    <Button  variant="danger" onClick={() => handleShow(id)}>Supprimer</Button>
                  </div>

              </Fragment>


          )
        })
      }


    </div>
  )
}

export default TextIntroIndex
