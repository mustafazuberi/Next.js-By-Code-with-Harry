import * as fs from 'fs'

export default async function handler(req, res) {
    let data = await fs.promises.readdir('blogdata')
    let myFile;
    let allBlogs = [];
    for (let i = 0; i < data.length; i++) {
        const item = data[i]
        myFile = await fs.promises.readFile((`blogdata/${item}`), 'utf-8')
        allBlogs.push(JSON.parse(myFile))
    }
    res.status(200).json(allBlogs)
}   