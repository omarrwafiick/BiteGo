import React from 'react'

export default function CustomeButton({name, styles, onClick, disable}) {
  return (
    <div className={`${styles}`}>
      <button
          type="button"
          onClick={onClick}
          disabled={disable}
          className={`text-white mt-3 cursor-pointer bg-primary capitalize w-full shadow-lg hover:shadow-xl hover:bg-[#FE7531] focus:ring-4 focus:ring-[#FE7531] font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-primary  focus:outline-none dark:focus:bg-primary`}
        >
      {name}
      </button>
    </div>
  )
}
