import type { NextPage } from 'next'
import Head from 'next/head'
import { Heading, Box } from '@chakra-ui/react'
import { getNews } from '~/api-client'
import { useQuery } from 'react-query'

const Home: NextPage = () => {
  const { isLoading, data } = useQuery('news', getNews)

  console.log(isLoading ? 'Cargando...' : data?.name ?? 'unknown')

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      paddingY="0"
      paddingX="2"
    >
      <Head>
        <title>No hay</title>
        <meta name="description" content="No hay" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main">
        <Heading as="h1" fontSize="6xl">
          Se vienen cositas
        </Heading>
      </Box>
    </Box>
  )
}

export default Home
