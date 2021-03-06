import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { theme } from '~/theme'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}
export default MyApp
