import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import styles from '../styles/Classement.module.css';

export default function Classement() {
  const [catList, setCatList] = useState([]);

  //Récupère la liste des chats et les classes en fonction du nb de vote
  useEffect(() => {
    async function getCats() {
      await fetch("https://catmash-back.vercel.app/cats")
        .then((response) => response.json())
        .then((data) => {
          setCatList(data.cats.sort((a, b) => (a.vote < b.vote) ? 1 : (a.vote > b.vote) ? -1 : 0));
        });
    }
    getCats();
  }, []);

  const cats = catList.map((data, i) => {
    return (
      <div className={styles.cat}>
      <div className={styles.catImageContainer}>
        <Image
          key={i}
          src={data.url}
          id={data.id}
          alt="Cat photo"
          width="0"
          height="0"
          sizes="100vw"
        />
      </div>
        <p>{data.vote} votes</p>
      </div>
    );
  });

  return (
    <div className={styles.main}>
    <Link href='/'><button className={styles.btn}>Retour aux votes</button></Link>
      <h1 className={styles.title}>Classement</h1>
      <div className={styles.listContainer}>
        {cats}
      </div>
      
    </div>
  );
}
