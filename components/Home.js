import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Cats from "./Cats";

function Home() {
  const [catList, setCatList] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [refreshToggle, setRefreshToggle] = useState(false);

  //Récupère la liste des chats et en affiche 2 aléatoirement. Se rafraichit à chaque vote
  useEffect(() => {
    async function getCats() {
      await fetch("https://catmash-back.vercel.app/cats")
        .then((response) => response.json())
        .then((data) => {
          setCatList(data.cats.sort(() => Math.random() - 0.5).slice(0, 2));
        });
    }
    getCats();
  }, [refreshToggle]);

  //Récupère le nombre global de votes lors du chargement de la page
  useEffect(() => {
    async function getVotes() {
      await fetch("https://catmash-back.vercel.app/cats/votes")
        .then((response) => response.json())
        .then((data) => {
          setTotalVotes(data.votes[0].vote);
          console.log(data.votes[0].vote);
        });
    }
    getVotes();
  }, []);

  //Permet de rafraichir le useEffect affichant les chats
  function refresher() {
    setRefreshToggle(!refreshToggle);
    setTotalVotes(totalVotes + 1)
  }

  const cats = catList.map((data, i) => {
    return <Cats key={i} src={data.url} id={data.id} refresher={refresher} />;
  });




  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>CatMash</h1>
        <div className={styles.catsContainer}>
          {cats}
        </div>
        <Link href='/classement'><button className={styles.btn}><span className={styles.btnText}>Voir les plus beaux chats</span><br/><span className={styles.btnVote}>{totalVotes} votes</span></button></Link>
      </main>
    </div>
  );
}

export default Home;
