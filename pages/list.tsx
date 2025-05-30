import useKeystrokeData from '@/hooks/useKeystrokeData'
import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '@/components/layouts/Navbar'
import Footer from '@/components/layouts/Footer'

function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>
  )
}

function ErrorMessage(props: { message: string }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
      <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
        Error: {props.message}
      </div>
    </div>
  )
}
const ListPage: NextPage = () => {
  const { keystrokeData, isLoading, error } = useKeystrokeData()

  if (isLoading) return <Loader />

  if (error) return <ErrorMessage message={error} />

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <Head>
        <title>Keystroke List</title>
        <meta
          name="description"
          content="Detailed list of keystrokes and their frequencies"
        />
      </Head>

      <Navbar />

      <main className="flex-grow container-app py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          Keystroke Frequency List
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Key
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Frequency
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {keystrokeData.map((item, index) => {
                  const totalKeystrokes = keystrokeData.reduce(
                    (sum, item) => sum + item.frequency,
                    0,
                  )
                  const percentage = (
                    (item.frequency / totalKeystrokes) *
                    100
                  ).toFixed(2)

                  return (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0
                          ? 'bg-white dark:bg-gray-800'
                          : 'bg-gray-50 dark:bg-gray-700'
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {item.key}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {item.frequency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {percentage}%
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ListPage
