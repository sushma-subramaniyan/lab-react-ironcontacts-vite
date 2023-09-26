import { useState } from "react";
import "./App.css";
import contactsJSON from './contacts.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'

function App() {

  const [contacts, setContacts] = useState(contactsJSON.slice(0, 5))

  const addRendomeContact = () => {
    // A comparer used to determine if two entries are equal.
    const isSameId = (a, b) => a.id === b.id;

    // Get items that only occur in the left array,
    // using the compareFunction to determine equality.
    const onlyInLeft = (left, right, compareFunction) =>
      left.filter(leftValue =>
        !right.some(rightValue =>
          compareFunction(leftValue, rightValue)));


    const filtertArr = onlyInLeft(contactsJSON, contacts, isSameId);
    if (filtertArr.length > 0) {
      const rendomNumber = Math.floor(Math.random() * (filtertArr.length - 1))
      const rendomContact = filtertArr[rendomNumber]
      console.log(filtertArr.length -1, rendomNumber)
      setContacts([...contacts, rendomContact])
    }
  }

  const sortByPopularity = () => {
    const sortedArr = [...contacts].sort( (a,b) => {
      return a.popularity < b.popularity ? 1 : -1
    })
    setContacts(sortedArr);
  }

  const sortByName = () => {
    const sortedArr = [...contacts].sort( (a,b) => {
      return a.name > b.name ? 1 : -1
    })
    setContacts(sortedArr);
  }

  const deleteContanct = (idOfContect) => {
    const newArr = [...contacts].filter( (contact) => {
      return (contact.id !== idOfContect)
    })
    console.log(newArr)
    setContacts(newArr);
  }


  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={() => addRendomeContact()
      }>Add Random Contact</button>
            <button onClick={() => sortByPopularity()
      }>Sort by popularity</button>
            <button onClick={() => sortByName()
      }>Sort by name</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(oneContact => {
            return (
              <tr key={oneContact.id}>
                <td><img
                  src={oneContact.pictureUrl}
                  style={{ height: "200px" }} />
                </td>
                <td>{oneContact.name}</td>
                <td>{(Math.round(oneContact.popularity * 100) / 100).toFixed(2)}</td>
                <td>{oneContact.wonOscar && <FontAwesomeIcon icon={faTrophy} />}</td>
                <td>{oneContact.wonEmmy && <FontAwesomeIcon icon={faTrophy} />}</td>
                <td><button onClick={() => deleteContanct(oneContact.id)}>Delete</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;