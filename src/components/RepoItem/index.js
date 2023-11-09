import './index.css'

const RepoItem = props => {
  const {repoObj} = props
  const {
    avatarUrl,
    name,
    description,
    stargazersCount,
    openIssuesCount,
    pushedAt,
  } = repoObj

  return (
    <li className="repo-item">
      <img alt={name} src={avatarUrl} className="avatar" />
      <div className="repo-details-container">
        <h1 className="repo-name">{name}</h1>
        <p className="repo-description">{description}</p>
        <div className="issues-container">
          <p className="stars-issuesCount">{stargazersCount} Stars</p>
          <p className="stars-issuesCount">{openIssuesCount} Issues</p>
          <p className="repo-description">
            Last pushed {pushedAt} by {name}
          </p>
        </div>
      </div>
    </li>
  )
}

export default RepoItem
