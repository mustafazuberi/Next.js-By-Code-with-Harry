import React, { useEffect, useState } from 'react'
import styles from '../styles/blog.module.css'
import Link from 'next/link'
import * as fs from 'fs'


const Blogs = (props) => {
  const [allBlogs, setAllBlogs] = useState(props.allBlogs)
  return (
    <div className={styles.main}>
      <h2>Latest  Blogs</h2>
      {allBlogs && allBlogs.map(item => {
        return <div className={styles.blogItem} key={item.slug}>
          <Link href={`/blogpost/${item.slug}`}>
            <h3>{item.title}</h3>
          </Link>
          <p>{`${item.content.slice(0, 400)}....`}</p>
        </div>
      })}

    </div>
  )
}



export const getStaticProps = async (context) => {
  let data = await fs.promises.readdir("blogdata")
  let myFile;
  let allBlogs = []
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    const myFile = await fs.promises.readFile(('blogdata/' + item), 'utf-8')
    allBlogs.push(JSON.parse(myFile))
  }
  return {
    props: { allBlogs }
  }
}


// export const getServerSideProps = async (context) => {
//   const res = await fetch('http://localhost:3000/api/blogs')
//   const allBlogs = await res.json()
//   return {
//     props: { allBlogs }
//   }
// }



export default Blogs
