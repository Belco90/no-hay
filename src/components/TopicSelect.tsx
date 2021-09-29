import type { SelectProps } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { TOPIC_TRANSLATION_MAP, TOPICS } from '~/models'

export const TopicSelect = (props: SelectProps): JSX.Element => {
  return (
    <Select
      placeholder="..."
      variant="flushed"
      width="auto"
      fontSize="4xl"
      fontWeight="bold"
      {...props}
    >
      {TOPICS.map((topic) => (
        <option key={topic} value={topic}>
          {TOPIC_TRANSLATION_MAP[topic]}
        </option>
      ))}
    </Select>
  )
}