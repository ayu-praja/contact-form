import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ClassNames from "classnames";
import Contact from "./Contact";
import {
  selectAllContact,
  clearAllContact,
  deleteAllContact,
} from "../../actions/contactAction";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";

const Contacts = () => {
  const dispatch = useDispatch();
  const [selectAll, setSelectAll] = useState(false);
  const [searchContact, setSearchContact] = useState("");
  const contacts = useSelector((state) => state.contact.contacts);
  const [filterContact, setFilterContact] = useState(contacts);
  const [selectedContact, setSelectedContact] = useState("");
  const selctedContcats = useSelector(
    (state) => state.contact.selectedContacts
  );

  useEffect(() => {
    if (selectAll) {
      dispatch(selectAllContact(contacts.map((contact) => contact.id)));
    } else {
      dispatch(clearAllContact());
    }
  }, [selectAll]);

  const handleSearch = (e) => {
    setSearchContact(e.target.value);
    // if (e.target.value != "") {
    //   let fContact = contacts.filter((contact) => {
    //     if (contact.name.match(searchContact))
    //       return contact
    //   });
    //   setFilterContact(fContact);
    // }
    // else {
    //   setFilterContact(contacts);
    // }

  }

  const handleSelectedData = (contact) => {
    setSelectedContact(contact);
  }
  return (
    <div>
      {selctedContcats?.length > 0 ? (
        <button
          className="btn btn-danger mb-3"
          onClick={() => dispatch(deleteAllContact())}
        >
          delete all
        </button>
      ) : null}

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search Contact"
          value={searchContact}
          onChange={(e) => handleSearch(e)}
        />
        <Link to="/contacts/add" className="btn btn-light">
          + Add Contact
        </Link>
      </div>
      <div className="contact-grid">
        <table className="table shadow">
          <thead>
            <tr>
              <th>
                <div className="custom-control custom-checkbox">
                  <input
                    id="selectAll"
                    type="checkbox"
                    className="custom-control-input"
                    value={selectAll}
                    onClick={() => setSelectAll(!selectAll)}
                  />
                  <label
                    htmlFor="selectAll"
                    className="custom-control-label"
                  ></label>
                </div>
              </th>
              <th>Name</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => {
              if(contact.name.match(searchContact))
              return <Contact contact={contact} key={contact.id} selectAll={selectAll} handleSelectedData={() => handleSelectedData(contact)} />
            })}
          </tbody>
        </table>
        
          <div className={ClassNames('card','contact-side')}>
            {selectedContact != "" ?
              <>
                <div className="avatar">
                  <Avatar className="mr-2" name={selectedContact.name} size="45" round={true} />
                  <p>{selectedContact.name}</p>
                </div>
                <p>Full name:<span>{selectedContact.name}</span></p>
                <p>Email:<span>{selectedContact.email}</span></p>
                <p>Phone:<span>{selectedContact.phone}</span></p>
                <p>Company:<span>{selectedContact?.company?.name}</span></p>
                <p>Address:<span>{selectedContact?.address?.street + " " + selectedContact?.address?.suite + " " + selectedContact?.address?.city + " "}</span></p></>
              : <p>Select any contact</p>
            }

          </div>
        

      </div>

    </div>
  );
};

export default Contacts;
