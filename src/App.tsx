import Header from './components/Header'
import RSVPForm from './components/RSVPForm'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <RSVPForm />
      </main>
      <footer>
        <p>We can't wait to celebrate with you!</p>
      </footer>
    </div>
  )
}

export default App
