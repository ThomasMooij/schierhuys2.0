import { Link } from "react-router-dom"
import styled from "styled-components"
import useFetch from "../../../functions/useFetch.js"
import SingleReview from "./SingleReview.jsx"
import newRequest from "../../../functions/newRequest.js"
import {  useState,useEffect} from "react"
import ReactPaginate from 'react-paginate';
import './pagination.css'

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    gap: 35px;
`
const Nav = styled.nav`
    display: flex;
    justify-content: space-evenly;
    gap: 25px;
    margin: auto;
    background-color: beige;
    width: 100%;
    min-height: 85px;
`
const Left = styled.span`
  font-family: "Urbanist";
  color: #383333;
  margin: auto;
  font-weight: 700;
  font-size: 19px;
`
const Right = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    gap: 15px;
`
const Body = styled.div`
    display: flex;
    align-items: flex-start;
    margin: auto;
    flex-direction: column;
    padding-left:5px;
    gap: 15px;
`
const BodyNav = styled.nav`
  display: flex;
 gap: 35px;
`
const BodyTitle = styled.h3`
  
`
const BodyFilter = styled.div`
  display: flex;
  gap: 5px;
`
const Select = styled.select`
  
`
const Option = styled.option`
  
`
const ReviewBtn = styled.button`
  cursor: pointer;
  padding: 8px;
  background-color: white;
  border-radius: 5px;
  border: none;
`
const Btn = styled.button`
  cursor: pointer;
  margin-bottom:8px;
  padding: 9px 15px;
  align-self: center;
  border-radius: 15px;
  border: none;
  background-color: white;
  font-weight: 700;
  &:hover{
    transform: translateY(-17px);
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  }
`
const Title = styled.h3`
    
`
const ReviewBox = styled.div`
 background-color: #F9FBFF;
box-shadow: 0px 1px 10px #999;
 width: 660px;
 height: 160px;
 border-radius: 5px;
 display: flex;
 align-items: center;
 gap: 15px;

`
const Input = styled.input`
    padding: 35px;
`
const Text = styled.span`
    
`
const Bottom = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin: auto;
  
`

const SelectDiv = styled.div`
  
`
const BottomBtn = styled.button`
  padding: 8px;
`
function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((review, i) => (
          <ReviewBox>
            <SingleReview key={i} review={review} /> 
          </ReviewBox>
        ))}
    </>
  );
}


const ReviewComponent = () => {

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const [desc , setDesc] = useState("")
  const [star , setStar] = useState(5)
  const  [filter, setFilter] = useState('')

  const {data,loading, error, reFetch} = useFetch(`http://localhost:8080/api/reviews?star=${filter}`)

  const handleClick = async (e) =>{
    e.preventDefault()
    try{
      const res = await newRequest.post(
        "http://localhost:8080/api/reviews", 
        {desc, star}) 
    }catch(err){
      console.log(err)
    }
  }

  const apply = (e) =>{
    setReviews(true)
    setFilter(e.target.value)
  }
  const [itemOffset, setItemOffset] = useState(0);

  let itemsPerPage = 3

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);


  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  const [reviews, setReviews] = useState(false) 

  return (
    <Main>
      <Nav>
        <Left>Guest book</Left> 
        <Right>
          { !currentUser ?   
            <>
            <p style={{fontWeight: "600"}}>Have you stayed in our home? </p>
            <p>Please login with the credentials provided in the thank you email to leave a review </p>
                  <Link to="login"><Btn>Login</Btn></Link> 
            </> 
          : <p><b>leave a review!</b></p>}
        </Right>  
      </Nav>
      <Body>
        <BodyNav>
          <BodyTitle>This is what previous guests thought of our house</BodyTitle>
          <BodyFilter>
            <p>Filter rating:</p>
            <Select name="filter" id="filter" onChange={(e) => apply(e)}>
              <Option value={5} >5</Option>
              <Option value={4} >4</Option>
              <Option value={3} >3</Option>
              <Option value={2} >2</Option>
              <Option value={1} >1</Option>
            </Select>
           {reviews && <ReviewBtn onClick={() => {setFilter(''); setReviews(false)}}>All reviews</ReviewBtn>}
          </BodyFilter>
        </BodyNav>
      { loading ? "loading" : error ? "something went horribly wrong" : 
       <>
       <Items currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< Previous"
          renderOnZeroPageCount={null}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />   
     </>
      }
    </Body>
      
    {currentUser ?      
          <Bottom>
            <Title>Let us know about your experience! </Title>
            <Title>You can leave only one review per visit</Title>
            <Input
              type="text"
              placeholder ="Schrijf uw recensie"
              onChange={(e)=> setDesc(e.target.value)}
              />
            <SelectDiv>
              <Text>Rating:</Text>
              <Select onChange={(e) => setStar(e.target.value)}>
                  <option value={5}>5</option>
                  <option value={4}>4</option>
                  <option value={3}>3</option>
                  <option value={2}>2</option>
                  <option value={1}>1</option>
              </Select>
              <BottomBtn onClick={handleClick}>Verstuur</BottomBtn> 
            </SelectDiv>
          </Bottom>
          : null}   
    </Main>
  )
}

export default ReviewComponent
