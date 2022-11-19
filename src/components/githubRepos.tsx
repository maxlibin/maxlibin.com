import React, {useEffect} from "react"
import {Link} from "gatsby"

const Social = () => {
  const [repos, setRepos] = React.useState([])

  useEffect(() => {
    fetch("https://api.github.com/users/maxlibin/repos")
      .then(response => response.json())
      .then(setRepos)
  }, [])

  return (
    <div className="mt-8">
      <h2 className="text-2xl text-gray-900 dark:text-white mb-4">Github repos</h2>
      <div className="w-full overflow-auto pb-4">
        <div className="flex space-x-4">
          {
            repos.map(({name, html_url, description}) => (
              <div className="border border-gray-500/[.2] rounded p-4 min-w-[380px]" key={name}>
                <Link
                  className="text-indigo-700 font-semibold dark:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-400"
                  to={html_url}
                >
                  {name}
                </Link>
                <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm truncate">{description}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
export default Social;