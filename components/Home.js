import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';

function Home() {

const [catList, setCatList] = useState([])
const [competitors, setCompetitors] = useState([])

useEffect(() => {
  fetch('https://catmash-back.vercel.app/cats')
    .then(response => response.json())
    .then(data => {
setCatList(data.cats.sort(() => Math.random() - 0.5))
setCompetitors([catList[0], catList[1]])
    })
}, []);

console.log(competitors)

  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          CatMash
        </h1>
      </main>
    </div>
  );
}

export default Home;
