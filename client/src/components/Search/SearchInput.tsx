import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./SearchInput.css"

import { useRecoilState, useRecoilValue } from "recoil"
import { search } from "../../state/atoms"
import { todos_list } from "../../state/atoms"

function SearchInput() {
  const [query, setQuery] = useState("");
   const [text, setText] = useRecoilState(search)
   const go = useNavigate();
   const todos = useRecoilValue(todos_list);
   const [filteredData, setFilteredData] = useState([]);

   const Δtext = (Δ) => {
    setQuery(Δ.target.value);
    let searchWord = Δ.target.value;
    const newFilter = todos.filter((value) => {
        return value.text.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
   };

   let menuRef = useRef();

   useEffect (() => {
    let handler = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setFilteredData([]);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
   });

   const clearText = () => setQuery("")
   const submit = (Δ:React.FormEvent<HTMLInputElement>) => {
      Δ.preventDefault()
      if (text) go(`/search/${text}`)
   }

   const hotkey = (Δ:KeyboardEvent) => {
      const $input = document.querySelector<HTMLInputElement>("#SearchInput")
      switch (Δ.key) {
        case "/":
          if (!(document.activeElement instanceof HTMLInputElement)) {
            Δ.preventDefault()
            $input?.focus()
          }
          break
        case "Escape":
          Δ.preventDefault()
          if (document.activeElement === $input) $input?.blur()
          break
      }
    }
  
    useEffect(() => {
      document.addEventListener("keydown", hotkey)
      return () => document.removeEventListener("keydown", hotkey)
    }, [])
  

   return (
    <>
      <input
        className="SearchInput"
        placeholder='/  to search'
        type='search'
        tabIndex={-1}
        value={query}
        onChange={Δtext}
        onBlur={clearText}
        onSubmit={submit}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            setQuery("")
            setFilteredData([]);
            setText(event.target.value);
            go(`/search/${query}`)
          }
        }}
      />
      {filteredData.length != 0 && (
          <div ref={menuRef} className="dataResult">
            {filteredData.map((value, key) => {
              return <div className="dataItem" key={key}> <p>{value.text}</p></div>
            })}
          </div>
          )}
    </>
    )
}

export default SearchInput