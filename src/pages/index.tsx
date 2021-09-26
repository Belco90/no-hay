import type { ChangeEvent } from 'react'
import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import {
  Heading,
  Box,
  Container,
  VStack,
  HStack,
  Select,
} from '@chakra-ui/react'
import { useQuery } from 'react-query'

import type { MainTopic } from '~/models'
import { getNews } from '~/api-routes-client'
import { ArticleCard } from '~/components/ArticleCard'

type TopicChoice = MainTopic | ''

const Home: NextPage = () => {
  const [topic, setTopic] = useState<TopicChoice>('')
  const { isLoading, data } = useQuery(
    ['news', { topic }],
    () => getNews({ topic: topic as MainTopic }),
    {
      enabled: !!topic,
    }
  )

  const handleTopicChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTopic(event.target.value as TopicChoice)
  }

  const shouldShowResults = !!topic && !isLoading

  return (
    <Container
      maxW="container.md"
      centerContent
      minHeight="100vh"
      paddingY="4"
      paddingX="2"
      justifyContent={!!topic ? 'start' : 'center'}
    >
      <Head>
        <title>No hay</title>
        <meta name="description" content="No hay" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main">
        <HStack width="full" justifyContent="center">
          <Heading as="h1" fontSize="6xl">
            Pero si ya no hay
          </Heading>
          <Select
            placeholder="..."
            variant="flushed"
            size="lg"
            width="auto"
            onChange={handleTopicChange}
          >
            <option value="homophobia">homofobia</option>
            <option value="fascism">fascismo</option>
            <option value="racism">racismo</option>
            <option value="sexism">machismo</option>
          </Select>
        </HStack>

        <Box marginBottom="12" />

        {isLoading && 'Cargando...'}

        {shouldShowResults && (
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
