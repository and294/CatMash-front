import React from 'react'
import Image from 'next/image';

export default function Cats(props) {
  return (
    <div>
<Image 
    src={props.src}
    alt='Cat photo'
/>
    </div>
  )
}
