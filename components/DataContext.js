import React, { createContext, useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite'

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [beds, setBeds] = useState([]);

  // Open database if not exists and retrieve data from database
  const db = SQLite.openDatabase('mydatabase.db')

  // Retrieve data from the database
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM beds',null,
        (_, result) => setBeds(result.rows._array.reverse()),
        (_, error) => console.log(error)
      )

    })
    console.log("Retrieve data from the database")
  }, [])

  // Insert a new bed into the database
  const insertBed = (bed) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO beds (name, number, width, length) VALUES (?, ?, ?, ?)',
        [bed.name, bed.number, bed.width, bed.length],
        (_, result) => {
          // Get the ID of the newly inserted bed
          const newBedId = result.insertId;
          // Add the new bed to the existing beds state
          setBeds((prevBeds) => [...prevBeds, { id: newBedId, ...bed }].reverse());
        },
        (_, error) => console.log(error)
      );
    });
  };

  // Update a bed in the database
  const updateBed = (bed) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE beds SET name=?, number=?, width=?, length=? WHERE id=?',
        [bed.name, bed.number, bed.width, bed.length, bed.id],
        () => {
          setBeds((prevBeds) =>
            prevBeds.map((prevBed) => (prevBed.id === bed.id ? bed : prevBed))
          )
        },
        (_, error) => console.log(error)
      );
    });
  };

  // Delete a bed from the database
  const deleteBed = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM beds WHERE id=?', [id], () => {
          setBeds((prevBeds) => prevBeds.filter((bed) => bed.id !== id));
        },
        (_, error) => console.log(error)
      );
    });
  };

  return (
    <DataContext.Provider value={{ beds, insertBed, updateBed, deleteBed }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext