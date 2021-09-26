import { Link, Flex, Heading, Text, VStack, Image } from '@chakra-ui/react'
import { parseISO } from 'date-fns'

import type { Article } from '~/models'
import { formatDistanceToNow } from '~/lib/date'

interface ArticleCardProps {
  article: Article
}

export const ArticleCard = ({ article }: ArticleCardProps): JSX.Element => {
  return (
    <Link href={article.link} isExternal width="100%">
      <Flex
        borderWidth="1px"
        borderRadius="md"
        justifyContent="space-between"
        padding="4"
        width="100%"
      >
        <VStack alignItems="start">
          <Text as="span" fontSize="sm">
            {article.rights ?? 'Desconocido'}
          </Text>
          <Heading as="h2" fontSize="lg">
            {article.title}
          </Heading>
          <Text noOfLines={3}>{article.summary}</Text>
          <Text as="em" fontSize="sm">
            {formatDistanceToNow(parseISO(article.published_date))}
          </Text>
        </VStack>

        <Image
          src={article.media}
          alt=""
          boxSize="120px"
          objectFit="cover"
          marginLeft="8"
          fallbackSrc="https://via.placeholder.com/150"
          borderRadius="md"
        />
      </Flex>
    </Link>
  )
}
