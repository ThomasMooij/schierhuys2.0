import React from 'react'
import styled from 'styled-components'
import useFetch from '../../functions/useFetch'
import { format } from "date-fns"
import star from "../../assets/star.jpg"

const Review = styled.main`
    display: flex;
    flex-direction: column;
    align-self: center;
    gap: 15px;
    margin: 8px;
`
const UserInfo = styled.div`
   display: flex ;
   gap: 35px;

  @media (max-width: 1380px){
    gap: 2px;
    flex-direction: column;
  }
`
const User = styled.div`
    
`
const Info = styled.div`
    display: flex;
    gap: 5px;
`
const Name = styled.span`
    
`
const TimeStamp = styled.main`
    
`
const Stars = styled.div`
    display: flex;
    gap: 7px;
    align-items: center;
  
`
const Img = styled.img`
    width: 12px;
`
const Star = styled.span`
    
`
const Desc = styled.p`
    
`
const SingleReview = ({review}) => {

    const {data,loading, error} = useFetch(`http://localhost:8080/api/users/${review.userId}`)
    const date = new Date(review.createdAt)

  return (
  <Review>
    <UserInfo>
      <User>
          <Info><Name><b>{data.guestname || "verwijderd account"}</b></Name><TimeStamp>{format(date, "dd/MM/yyyy")}</TimeStamp></Info>
      </User>
      <Stars>
          {Array(review.star).fill().map((item, i) => (
            
            <Img src={star}></Img>
            
          ))}
          <Star>{review.star}</Star>
      </Stars>
    </UserInfo>

    <Desc>{review.desc}</Desc>
  </Review>
  )
}

export default SingleReview
