import { useState } from 'react'
import dataJson from '../data.json'

export function Content() {
  const [selected, setSelected] = useState('all');
  const [data, setData] = useState(dataJson);
  
  const categories = {
    all: data,
    active: data.filter((item) => item.isActive === true),
    inactive: data.filter((item) => item.isActive === false)
  }

  const handleCategoryChange = (e) => {
    setSelected(e.target.value)
  }

  const handleActive = (itemName) => {
    setData(prevData => 
      prevData.map(item => 
        item.name === itemName 
          ? { ...item, isActive: !item.isActive }
          : item
      )
    )
  }

  const removeItem = (item) => {
    setData(prev => prev.filter(i => i.name !== item.name))
  }

  return(
    <main>
      <div className="flex flex-col justify-center items-center gap-5 mb-7 lg:flex-row lg:justify-between">
        <h1 className="text-3xl dark:text-neutral-100 font-bold">Extension list</h1>
        <ul className="flex gap-3">
          {['all', 'active', 'inactive'].map((category) => (
            <li
              key={category}
              className={`${selected === category ? 'bg-red-500 dark:bg-red-400' : 'bg-white dark:bg-neutral-700'} rounded-full border border-neutral-200 dark:border-neutral-500 hover:opacity-70 cursor-pointer`}
            >
              <button
                className={`w-full h-full py-2 px-5 font-semibold ${selected === category ? 'text-white dark:text-neutral-800' : 'dark:text-neutral-300'} focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus-ring-red-400 focus:rounded-full`} 
                onClick={handleCategoryChange} 
                value={category}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <section className='container lg:grid lg:grid-cols-3 gap-2 m-auto'>
        {categories[selected].map((item, index) => (
          <div key={index} className='flex flex-col gap-2 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-300 dark:border-neutral-500 p-5 mb-5
                                      '>
            <div className='flex gap-5'>
              <img src={item.logo} alt="logo" className='self-start'/>
              <div className='flex flex-col h-28 gap-1'>
                <h2 className='font-bold text-xl text-neutral-800 dark:text-neutral-200'>{item.name}</h2>
                <p className='text-neutral-500 dark:text-neutral-400 text-md leading-5 tracking-tight' >{item.description}</p>
              </div>
            </div>

            <div className='flex justify-between items-center'>
              <div className='bg-white dark:bg-neutral-800 rounded-full border border-neutral-400 text-neutral-800 hover:bg-red-700 hover:text-white hover:border-transparent cursor-pointer'>
                <button onClick={() => removeItem(item)}
                        className='w-full h-full font-semibold dark:text-neutral-200 px-4 py-2 
                                  focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus-ring-red-400 focus:rounded-full'
                                  >
                                  Remove</button>
              </div>
              {item.isActive ? (
                <div  tabIndex={0}
                      className='bg-red-700 dark:bg-red-400 w-11 h-5 rounded-full px-1 py-3 flex items-center justify-end hover:opacity-70
                                  focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus-ring-red-400 focus:rounded-full'
                     onClick={() => handleActive(item.name)}>
                  <div className='bg-white w-5 h-5 rounded-full'></div>
                </div>
              ) : (
                 <div tabIndex={0}
                      className={`bg-neutral-300 dark:bg-neutral-500 w-11 h-5 rounded-full px-1 py-3 flex items-center hover:opacity-70 cursor-pointer ${item.isActive ? 'justify-end' : 'justify-baseline'}
                                  focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus-ring-red-400 focus:rounded-full`}
                      onClick={() => handleActive(item.name)}>
                  <div className='bg-white w-5 h-5 rounded-full'></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}