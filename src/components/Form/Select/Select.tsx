export function Select({children, ...props}) {
  return (
    <div>
      <label id="listbox-label" className="sr-only">
        Change published status
      </label>
      <div className="relative">
        <div className="inline-flex divide-x divide-slate-500 rounded-[5px] shadow-sm">
          <div className="inline-flex items-center gap-x-1.5 rounded-l-[5px] bg-slate-300 px-3 py-2 text-slate-700 shadow-sm">
            <svg
              className="-ml-0.5 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clip-rule="evenodd"
              />
            </svg>
            <p className="text-sm font-semibold">Published</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center rounded-l-none rounded-r-[5px] bg-slate-300 p-2 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-gray-50"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label">
            <span className="sr-only">Change published status</span>
            <svg
              className="h-5 w-5 text-slate-700"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/**
      Select popover, show/hide based on select state.

      Entering: ""
        From: ""
        To: ""
      Leaving: "transition ease-in duration-100"
        From: "opacity-100"
        To: "opacity-0"
    **/}
        <ul
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          tabIndex={-1}
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3">
          {/**
        Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

        Highlighted: "bg-indigo-600 text-white", Not Highlighted: "text-gray-900"
      **/}
          {children}
          <li
            className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9"
            id="listbox-option-0"
            role="option">
            <div className="flex items-center">
              {/** Online: "bg-green-400", Not Online: "bg-gray-200" **/}
              <span
                className="inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400"
                aria-hidden="true"></span>
              {/** Selected: "font-semibold", Not Selected: "font-normal" **/}
              <span className="font-normal ml-3 block truncate">
                <span className="sr-only"> is online</span>
              </span>
            </div>

            {/**
          Checkmark, only display for selected option.

          Highlighted: "text-white", Not Highlighted: "text-indigo-600"
        **/}
            <span className="text-slate-600 absolute inset-y-0 right-0 flex items-center pr-4">
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </li>

          {/** More items... **/}
        </ul>
      </div>
    </div>
  );
}
