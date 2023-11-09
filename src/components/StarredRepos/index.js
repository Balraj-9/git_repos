import {Component} from 'react'

import RepoItem from '../RepoItem'

import './index.css'

class StarredRepos extends Component {
  state = {reposList: [], page: 1}

  componentDidMount() {
    window.addEventListener('scroll', this.infiniteScroll)
    this.getReposList()
  }

  getReposList = async () => {
    const {reposList, page} = this.state
    const url = `https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc ${page}`
    const options = {
      headers: {
        Authorization: 'Bearer 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',
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = data.items.map(eachObj => ({
      id: eachObj.id,
      avatarUrl: eachObj.owner.avatar_url,
      name: eachObj.name,
      description: eachObj.description,
      stargazersCount: eachObj.stargazers_count,
      openIssuesCount: eachObj.open_issues_count,
      pushedAt: eachObj.pushed_at,
    }))
    this.setState({reposList: [...reposList, ...updatedData]})
  }

  infiniteScroll = () => {
    const {page} = this.state
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      let newPage = page
      newPage += 1
      this.setState(
        {
          page: newPage,
        },
        this.getReposList,
      )
    }
  }

  render() {
    const {reposList} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Most Starred Repos</h1>
        <ul className="starred-repos-list">
          {reposList.map(eachObj => (
            <RepoItem key={eachObj.id} repoObj={eachObj} />
          ))}
        </ul>
      </div>
    )
  }
}

export default StarredRepos
