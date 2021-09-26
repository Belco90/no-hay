import type { NextPage } from 'next'
import Head from 'next/head'
import { Heading, Box, Container, VStack } from '@chakra-ui/react'
import { getNews } from '~/api-routes-client'
import { useQuery } from 'react-query'
import { ArticleCard } from '~/components/ArticleCard'

const Home: NextPage = () => {
  const { isLoading, data } = useQuery('news', getNews)

  return (
    <Container
      maxW="container.md"
      centerContent
      minHeight="100vh"
      paddingY="4"
      paddingX="2"
    >
      <Head>
        <title>No hay</title>
        <meta name="description" content="No hay" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main">
        <Heading as="h1" fontSize="6xl" marginBottom="12" textAlign="center">
          Pero si ya no hay homofobia...
        </Heading>

        {isLoading ? (
          'Cargando...'
        ) : (
          <VStack>
            {data?.articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </VStack>
        )}
      </Box>
    </Container>
  )
}

export default Home
