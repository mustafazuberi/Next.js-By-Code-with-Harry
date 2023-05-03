import { useRouter } from "next/router"
import * as fs from 'fs'
import styles from '../../styles/blog.module.css'
import { useState } from "react"

const Slug = (props) => {
    const [blogDetails, setBlogDetails] = useState(props.myBlog)
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>{blogDetails && blogDetails.title}</h1>
                <hr />
                <p>{blogDetails && blogDetails.content}</p>
            </main>
        </div>
    )
}



// export const getServerSideProps = async (context) => {
//     const { slug } = context.query
//     const res = await fetch(`http://localhost:3000/api/getBlog?slug=${slug}`)
//     const blogDetails = await res.json()
//     return {
//         props: { blogDetails }
//     }
// }

export const getStaticPaths = () => {
    return {
        paths: [
            { params: { slug: 'how-to-learn-javascript' } },
            { params: { slug: 'how-to-learn-flask' } },
            { params: { slug: 'how-to-learn-next.js' } }
        ],
        fallback: true
    };
}
export const getStaticProps = async (context) => {
    const { slug } = context.params
    let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`, 'utf-8')
    myBlog = JSON.parse(myBlog)
    return {
        props: { myBlog: myBlog }
    }
}

export default Slug
