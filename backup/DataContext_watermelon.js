import React, { createContext, useState, useEffect } from 'react';
import { Q } from '@nozbe/watermelondb'
import { database } from './model/database'

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [beds, setBeds] = useState([]);

  // Retrieve data from the database
  useEffect(() => {
    const fetchBeds = async () => {
      const bedsCollection = database.get('beds');
      const allBeds = await bedsCollection.query().fetch();
      setBeds(allBeds);
    }

    fetchBeds();
  }, []);

  // Insert a new bed into the database
  const insertBed = async (bed) => {
    const bedsCollection = database.get('beds');
    await database.action(async () => {
      const newBed = await bedsCollection.create(item => {
        item.name = bed.name;
        item.number = bed.number;
        item.width = bed.width;
        item.length = bed.length;
      });
      
      setBeds([newBed, ...beds]);
    });
  };

  // Update a bed in the database
  const updateBed = async (updatedBed) => {
    const bed = beds.find(bed => bed.id === updatedBed.id);
    if (!bed) return;
    
    await database.action(async () => {
      await bed.update(item => {
        item.name = updatedBed.name;
        item.number = updatedBed.number;
        item.width = updatedBed.width;
        item.length = updatedBed.length;
      });
    });

    setBeds(beds.map(bed => bed.id === updatedBed.id ? updatedBed : bed));
  };

  // Delete a bed from the database
  const deleteBed = async (id) => {
    const bed = beds.find(bed => bed.id === id);
    if (!bed) return;
    
    await database.action(async () => {
      await bed.destroyPermanently();
    });

    setBeds(beds.filter(bed => bed.id !== id));
  };

  return (
    <DataContext.Provider value={{ beds, insertBed, updateBed, deleteBed }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext