import { useParams } from "react-router-dom";
import ViewDetail from "./DetailBook";
import { getAllBook } from "../../service/api";
import { useEffect, useState } from "react";

const BookPage =() =>{
    const [dataBook,setDataBook] = useState([]);
    const [image,setImage] = useState([])
    let params = new URLSearchParams(location.search)
    const id = params?.get('id');
    
    const getBookbyID = async() =>{
        let id1 = `/${id}`;
        let res = await getAllBook(id1);
        let raw = res.data
       
        setTimeout(()=>{
            setDataBook(res.data)
            getImages(raw);
    },0)
    }

    const getImages = (raw)=>{
       let arr=[]
            if(raw.thumbnail){
                arr.push(
                    {
                        original: `http://localhost:8080/images/book/${raw.thumbnail}`,
                        thumbnail: `http://localhost:8080/images/book/${raw.thumbnail}`,
                    },
                )
            }
            if(raw.slider){
                raw.slider.map(item=>{
                    arr.push(
                        {
                            original: `http://localhost:8080/images/book/${item}`,
                            thumbnail: `http://localhost:8080/images/book/${item}`,
                        },
                    )
                })
            }

            setImage(arr)
    }


    useEffect(()=>
    
{
        getBookbyID();
    },[])       
    return (<>   
                <ViewDetail
                dataBook={dataBook}
                image={image}
                />
    </>)
}
export default BookPage;