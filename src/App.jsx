import { Content } from "./Content"
import { Header } from "./Header"

function App() {
  
  return (
    <div className="bg-linear-to-b from-[#EBF2FC] to-[#EEF8F9] max-w-[375px] dark:bg-linear-to-b dark:from-[#040918] dark:to-[#091540]
                    lg:max-w-[1440px] mx-auto min-h-screen p-5 lg:px-20 lg:py-10">
     <Header />

      <Content />
    </div>
  )
}

export default App
