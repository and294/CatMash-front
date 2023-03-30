import React from 'react'
import Image from 'next/image';
import styles from '../styles/Cats.module.css';

export default function Cats(props) {

  const handleVote = (id) => {
    fetch("https://catmash-back.vercel.app/cats/updateVote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    })
    console.log(id)
props.refresher()
  }

  return (
    <div className={styles.catImageContainer} onClick={() => handleVote(props.id)}>
<Image 
    src={props.src}
    alt='Cat photo'
    width="0"
    height="0"
    sizes="100vw"
/>
    </div>
  )
}
