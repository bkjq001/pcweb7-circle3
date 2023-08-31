import express from "express";
import mysql from "mysql2";

const pool = mysql
    .createPool({
        host:"34.142.174.123",
        user:"root",
        password:"BH|<YXYge&::E$8.",
        database: "pcweb7",
    })
    .promise();

const app = express()
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Gets a Post from the SQL Database that has an id of id
async function getPost(id) {
    const [rows] = await pool.query(
        `SELECT *
            FROM posts
            WHERE id = ?
            `,
            [id]
    );
    return rows[0];
}

// Adds a new post into the SQL Database then returns that post.
async function addPost (caption, image) {
    const [result] = await pool.query(
        `INSERT INTO posts (caption, image) VALUES (?,?)`,
        [caption, image]
    );
    const id = result.insertId;
    return getPost(id);
}

app.get("/", (req, res) => {
    res.json("Hello from backend");
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

app.post("/add", async (req, res) =>{

    const {caption, image} = req.body;
    const post = await addPost(caption, image);
    console.log("Post Added: ",post);
    res.send({ status: "success" }).status(200);
});

