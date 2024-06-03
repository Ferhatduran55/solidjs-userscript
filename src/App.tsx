import { Portal } from 'solid-js/web'
import { createSignal } from 'solid-js'

function App() {
  window.solidUserscript = {
    ref: createSignal(null)
  }

  return (
    <Portal mount={document.body} ref={window.solidUserscript.ref} useShadow={true} >
      <p>Hello World</p>
    </Portal>
  )
}

export default App
