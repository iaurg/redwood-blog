import { MetaTags } from '@redwoodjs/web'

import ArticlesCell from 'src/components/ArticlesCell'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <h1>HomePage</h1>
      <ArticlesCell />
    </>
  )
}

export default HomePage
