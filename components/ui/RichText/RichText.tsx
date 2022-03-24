//copied from saleor-react-storefront https://github.com/saleor/react-storefront/blob/main/components/RichText.tsx

import Blocks from 'editorjs-blocks-react-renderer'
import React from 'react'
import s from './RichText.module.css'

export interface RichTextProps {
  jsonStringData?: string
}

const RichText = ({ jsonStringData }: RichTextProps) => {
  if (!jsonStringData) {
    return null
  }

  let data
  try {
    data = JSON.parse(jsonStringData)
  } catch (e) {
    console.error('Rich text data are not valid JSONString.')
    return null
  }
  if (!data.time || !data.version || !data.blocks.length) {
    console.error('Rich text data not in the EditorJS format.')
    return null
  }
  return (
    <article className={s.container}>
      <Blocks data={data} />
    </article>
  )
}

export default RichText
