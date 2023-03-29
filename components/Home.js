import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import Cats from "./Cats";

function Home() {
  const [catList, setCatList] = useState([]);
  const [competitors, setCompetitors] = useState([]);

  useEffect(() => {
    async function getCats() {
      await fetch("https://catmash-back.vercel.app/cats")
        .then((response) => response.json())
        .then((data) => {
          setCatList(data.cats.sort(() => Math.random() - 0.5).slice(0, 2));
        });
    }
    getCats();
  }, []);


  const cats = catList.map((data, i) => {
    return <Cats key={i} src={data.url} id={data.id}/>;
  });



  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>CatMash</h1>
        <div className={styles.catsContainer}>
          {cats}
        </div>
      </main>
    </div>
  );
}

export default Home;
