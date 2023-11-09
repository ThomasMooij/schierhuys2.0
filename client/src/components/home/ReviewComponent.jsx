import { Link } from "react-router-dom"
import styled from "styled-components"
import useFetch from "../../functions/useFetch.js"
import SingleReview from "./SingleReview.jsx"
import newRequest from "../../functions/newRequest.js"
import {  useState,useEffect, Suspense, lazy} from "react"
import ReactPaginate from 'react-paginate';
import './pagination.css'

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
`
const Nav = styled.nav`
    display: flex;
    justify-content: space-evenly;
    gap: 25px;
    margin: auto;
    background-color: beige;
    width: 100%;
    max-width: 100%;
    min-height: 85px;
    @media(max-width: 680px ){
    display: none;
    }
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
    max-width: 100%;
    width: 100wh;
    align-items: center;
    margin: auto;
    gap: 15px;
`
const Body = styled.div`
    display: flex;
    align-items: center;
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
const ReviewBox = styled.div`
 background-color: #F9FBFF;
box-shadow: 0px 1px 10px #999;
 width: 660px;
 height: 160px;
 border-radius: 5px;
 display: flex;
 align-items: center;
 gap: 15px;

 @media (max-width: 1380px){
        width: 260px;
      height: 160px;
        }
`
const Input = styled.input`
  margin: 15px;
    padding: 35px;
    width: 550px;
    height:70px;
    @media(max-width: 1280px ){
     width:155px;
     height:15px;
    }
`
const Text = styled.span`
    
`
const Bottom = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin: auto;
@media(max-width: 680px ){
    display: none;
    }
`
const SelectDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 15px;
`
const BottomBtn = styled.button`
  padding: 8px;
  background-color: #6565e7;
  text-decoration: none;
  color: white;
  font-weight: 700;
  border-radius: 5px;
`

const LazyReview = lazy(() => import('./SingleReview'))

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((review, i) => (
          <ReviewBox>
            <Suspense fallback={<p>Loading..</p>} >
              <LazyReview review={review} key={review._id}/>
            </Suspense>
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

  const refetch = () =>{
    reFetch()
  }

  const handleClick = async (e) =>{
    e.preventDefault()
    try{
      await newRequest.post(
        "http://localhost:8080/api/reviews", 
        {desc, star}).then(alert("bedankt !"))
   
    }catch(err){
      console.log(err)
    }
  }
  const apply = (e) =>{
    setReviews(true)
    setFilter(e.target.value)
  }
  const [itemOffset, setItemOffset] = useState(0);

  let itemsPerPage = 2;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };
  const [reviews, setReviews] = useState(false) 

  return (
    <Main>
      <Nav>
        <Left>GastenBoek</Left> 
        <Right>
          { !currentUser ?   
            <>
            <p style={{fontWeight: "600"}}>Heeft u bij ons verbleven? </p>
            <p>Via de email heeft u inlog gegevens ontvangen om een review achter te laten! </p>
                  <Link to="login"><Btn>Login</Btn></Link> 
            </> 
          : <p>Hartelijk bedankt en hopelijk tot snel</p>}    
        </Right>  
      </Nav>
      <Body>
        <BodyNav>
          <BodyTitle>Dit vonden voorgaande gasten ervan</BodyTitle>
          <BodyFilter>
            <p>Filter op rating:</p>
            <Select name="filter" id="filter" onChange={(e) => apply(e)}>
              <Option value={5} >5</Option>
              <Option value={4} >4</Option>
              <Option value={3} >3</Option>
              <Option value={2} >2</Option>
              <Option value={1} >1</Option>
            </Select>
           {reviews && <ReviewBtn onClick={() => {setFilter(''); setReviews(false)}}>Alle reviews</ReviewBtn>}
          </BodyFilter>
        </BodyNav>
      { loading ? "loading" : error ? "something went wrong" : 
       <>
        <Suspense fallback={<p>Loading..</p>} ></Suspense>
       <Items currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="volgende >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< vorige"
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
            <Input
              type="text"
              placeholder ="Schrijf uw recensie"
              onChange={(e)=> setDesc(e.target.value)}
              />
            <SelectDiv>
              <div>
                <Text>Rating:</Text>
                <Select onChange={(e) => setStar(e.target.value)}>
                    <option value={5}>5</option>
                    <option value={4}>4</option>
                    <option value={3}>3</option>
                    <option value={2}>2</option>
                    <option value={1}>1</option>
                </Select>
              </div>
              <BottomBtn onClick={handleClick}>Verstuur</BottomBtn> 
            </SelectDiv>
          </Bottom>
          : null}   
    </Main>
  )
}

export default ReviewComponent
