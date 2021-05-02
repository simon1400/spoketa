import Page from '../layout/Page'


const NotFound = () => {
  return (
    <Page title="404" description="Stranka nenalezena">
      <div className="uk-container">
        <div><h1>404</h1></div>
        <p>Stranka nenalezena</p>
      </div>
    </Page>
  )
}

export default NotFound
