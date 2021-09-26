import {
  Link,
  Flex,
  Heading,
  Text,
  VStack,
  Image,
  useColorModeValue,
} from '@chakra-ui/react'
import { parseISO } from 'date-fns'
import styled from '@emotion/styled'

import type { Article } from '~/models'
import { formatDistanceToNow } from '~/lib/date'

const StyledLink = styled(Link)`
  :hover {
    text-decoration: none;

    .underline-child {
      text-decoration: underline;
    }
  }
`

interface ArticleCardProps {
  article: Article
}

export const ArticleCard = ({ article }: ArticleCardProps): JSX.Element => {
  const altTextColor = useColorModeValue('gray.600', 'gray.400')
  return (
    <StyledLink href={article.link} isExternal width="100%">
      <Flex
        borderWidth="1px"
        borderRadius="md"
        justifyContent="space-between"
        padding="4"
        width="100%"
      >
        <VStack alignItems="start">
          <Text as="span" fontSize="sm" color={altTextColor}>
            {article.clean_url || 'Desconocido'}
          </Text>
          <Heading as="h2" fontSize="lg" className="underline-child">
            {article.title}
          </Heading>
          <Text noOfLines={3}>{article.summary}</Text>
          <Text as="em" fontSize="sm" color={altTextColor}>
            {formatDistanceToNow(parseISO(article.published_date))}
          </Text>
        </VStack>

        <Image
          src={article.media}
          alt=""
          boxSize="120px"
          objectFit="cover"
          marginLeft="8"
          fallbackSrc="https://via.placeholder.com/120"
          borderRadius="md"
        />
      </Flex>
    </StyledLink>
  )
}
