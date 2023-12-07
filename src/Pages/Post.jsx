import React from 'react'

export default function Post ({post}) {
    console.log(post)
  return (
    <>
        <div style={{border:"1px solid aliceBlue", width:"100%", height:"250px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", backgroundColor:"aliceblue"}}>
            <blockquote style={{fontWeight: "bolder", fontSize:"2rem", marginLeft:"20%", marginTop:"0.6rem"}}>{post.author}</blockquote>
            <p style={{padding: "0", fontFamily:"serif", width:"80%", marginLeft:"5%", textAlign:"center"}}>{post.summary}</p>
        </div>
    </>
    // <div>Post</div>
  )
}

// export default Post