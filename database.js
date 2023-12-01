import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config()

const pool =mysql.createPool({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
}).promise()

export async function getNotes(){
    const [rows] = await pool.query("SELECT * from notes")
    // const result = await pool.query("SELECT * from notes")
    //const rows = result[0]
    return rows;

}

export async function getNotess(id){
    const [rows] = await pool.query(`SELECT * from notes where id = ?`,[id] )
    return rows[0];
}

export async function createNotes(title,contents){
    const [newNote] = await pool.query(`INSERT INTO notes(title,contents) VALUES (?,?)`,
    [title, contents]
    )
    const id =newNote.insertId
    return getNotess(id)

}

const notes = await getNotes();
console.log(notes)

const note = await getNotess(100);
console.log(note)

const newNote = await(createNotes('Test','Testing code with Jest'))
console.log(newNote)