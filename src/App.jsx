import './App.css'
import Dashboard from './components/dashboard/dashboard'
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import { MantineProvider } from '@mantine/core';
function App() {

  return (
    <MantineProvider>
      <Dashboard/>
    </MantineProvider>
  )
}

export default App
