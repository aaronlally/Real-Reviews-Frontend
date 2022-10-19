import React from "react";
import ReviewCard from "./ReviewCard"

function Home({ reviewList, user }) {

    // const [reviewList, setReviewList] = useState([])
    

    // useEffect(()=>{
    //     fetch("/reviews")
    //     .then(response => response.json())
    //     .then(data => setReviewList(data))
    //   }, [reviewList.length])

    //   function handleAddReview(newReview) {
    //     setReviewList([...reviewList, newReview])
    // }

    const renderReviews = reviewList.map((review) => {
        return <ReviewCard key={review.id} review={review} user={user}/>
    })


    return (
        <div id="background">
            <center id="ReviewTitleCard">Reviews</center>
            <center>{renderReviews}</center>
        </div>
    )

}

export default Home;