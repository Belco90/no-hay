import type { SelectProps } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { TOPIC_TRANSLATION_MAP, TOPICS } from '~/models'

export const TopicSelect = (props: SelectProps): JSX.Element => {
  return (
    <Select
      placeholder="..."
      variant="unstyled"
      size="lg"
      width="auto"
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
