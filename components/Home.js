import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import Cats from "./Cats";

function Home() {
  const [catList, setCatList] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [refreshToggle, setRefreshToggle] = useState(false);

  useEffect(() => {
    async function getCats() {
      await fetch("https://catmash-back.vercel.app/cats")
        .then((response) => response.json())
        .then((data) => {
          setCatList(data.cats.sort(() => Math.random() - 0.5).slice(0, 2));
        });
    }
    async function getVotes() {
      await fetch("https://catmash-back.vercel.app/cats/votes")
        .then((response) => response.json())
        .then((data) => {
          setTotalVotes(data.votes[0].vote);
          console.log(data.votes[0].vote);
        });
    }
    getCats();
    getVotes();
  }, [refreshToggle]);

  function refresher() {
    setRefreshToggle(!refreshToggle);
  }

  const cats = catList.map((data, i) => {
    return <Cats key={i} src={data.url} id={data.id} refresher={refresher} />;
  });




  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>CatMash</h1>
        <div className={styles.catsContainer}>
          {cats}
        </div>
        <button>Voir les plus beaux chats<br/>{totalVotes} votes</button>
      </main>
    </div>
  );
}

export default Home;
