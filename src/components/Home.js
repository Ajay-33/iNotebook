import Notes from './Notes';

const Home = (props) => {

  return (
    <div>
      <Notes showAlert={props.showAlert} mode={props.mode} />
    </div>
  )
}

export default Home

