import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.png";
import "./BookDetails.css";
import {FaArrowLeft} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



const URL = "https://openlibrary.org/isbn/";
const AuthorURL = "https://openlibrary.org";
const RatingsURL = "https://openlibrary.org";


const BookDetails = () => {
  const {isbn} = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
 
  
  useEffect(() => {
    setLoading(true);
    async function getBookDetails(){
      try{
        const response = await fetch(`${URL}${isbn}.json`);
        const data = await response.json();
        
       
        if(data){
          
          const {description, title, covers, subject_places, subject_times, subjects,authors,works} = data;
         

          //AUTHOR DATA FETCH AFTER BOOK DETAIL ISBN
          const author_response = await fetch(`${AuthorURL}${ authors[0]['key']}.json`);
          const author_data = await author_response.json();

          
          

           //RATINGS DATA FETCH AFTER BOOK DETAIL USING ISBN
          const ratings_response = await fetch(`${RatingsURL}${works[0]['key']}/ratings.json`);
          const ratings_data = await ratings_response.json();

         

          //generate the details for booksß
          const newBook = {
            description: description ? description.value : "No description found",
            title: title,
            cover_img: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : coverImg,
            author_data: author_data ? author_data['name'] : "",
            ratings_data: ratings_data ? parseFloat(ratings_data['summary']['average']).toFixed(2):"Not available"
          };

          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch(error){
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [isbn]);

  if(loading) return <Loading />;

  return (
    <section className='book-details'>
      <div className='container'>
        <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/book")}>
          <FaArrowLeft size = {22} />
          <span className='fs-18 fw-6'>Go Back</span>
        </button>

        <div className='book-details-content grid'>
          <div className='book-details-img'>
            <img src = {book?.cover_img} alt = "cover img" />
          </div>
          <div className='book-details-info'>
            <div className='book-details-item title'>
              <span className='fw-6 fs-24'>{book?.title}</span> <br></br>
              <span className='fw-6 fs-24'>by {book?.author_data}</span>
            </div>
            <div className='book-details-item description'>
              <span>{book?.description}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Ratings: </span>
              <span>{book?.ratings_data}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookDetails